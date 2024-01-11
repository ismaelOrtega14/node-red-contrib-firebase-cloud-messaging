const firebaseAdmin = require('./lib/firebaseAdmin')
const nodeUtils = require('./lib/nodeUtils')
const { deepMerge } = require('./lib/utils')
const {parseToFinalMessageInfo} = require('./lib/parseMessageInfoConfig')

// --------------- CONFIG NODE STARTS ---------------

module.exports = function (RED) {
    function FirebaseConfig(config) {
        RED.nodes.createNode(this, config)

        const node = this

        node.name = config.name
        nodeUtils.evaluateValue(
            RED,
            config.keyPath,
            config.keyPathType,
            node,
            null,
            (err, result) => {
                if (err) {
                    // Something went wrong accessing context
                    node.error(err)
                } else {
                    node.keyPath = result
                    node.debug(`Configured keypath: ${node.keyPath}`)
                }
            }
        )

        if (config.proxy) {
            nodeUtils.evaluateValue(
                RED,
                config.proxy,
                config.proxyType,
                node,
                null,
                (err, result) => {
                    if (err) {
                        // Something went wrong accessing context
                        node.error(err)
                    } else {
                        node.proxy = result
                        node.debug(`Configured proxy: ${node.proxy}`)
                    }
                }
            )
        }
    }

    RED.nodes.registerType('FCM Config', FirebaseConfig)

    // --------------- CONFIG NODE ENDS ---------------
    // --------------- MAIN NODE STARTS ---------------

    function FirebaseCloudMessagingNode(config) {
        RED.nodes.createNode(this, config)

        const node = this

        // Retrieve the config node
        node.firebaseConfig = RED.nodes.getNode(config.firebaseConfig)

        if (!node.firebaseConfig) {
            node.error(`No connection configured!`)
            node.status({
                fill: 'red',
                shape: 'dot',
                text: 'Error preparing message',
            })
        }

        node.on('input', function (msg) {
            let message = {}

            let sendMessagePromise

            node.status({
                fill: 'yellow',
                shape: 'dot',
                text: 'Sending notification',
            })

            const keyPath = node.firebaseConfig.keyPath
            const proxy = node.firebaseConfig.proxy

            if (Object.prototype.hasOwnProperty.call(msg, 'firebaseMessage')) {
                message = msg.firebaseMessage
                sendMessagePromise = firebaseAdmin.sendFcmMessage(
                    message,
                    keyPath,
                    proxy
                )
            } else {
                sendMessagePromise = new Promise((resolve, reject) => {
                    evalMessageInfo(config, msg, node)
                        .then((messageInfo) => {
                            message = parseToMessageInfo(messageInfo, config)
                            firebaseAdmin
                                .sendFcmMessage(message, keyPath, proxy)
                                .then((response) => resolve(response))
                                .catch((error) => reject(error))
                        })
                        .catch((error) => reject(error))
                })
            }

            sendMessagePromise
                .then((response) => {
                    msg.payload = response
                    node.status({
                        fill: 'green',
                        shape: 'dot',
                        text: 'Notification sent',
                    })
                    node.send([msg, null])
                })
                .catch((error) => {
                    const errorMessage =
                        typeof error === 'string'
                            ? error
                            : JSON.stringify(error)

                    msg.error = error
                    node.error(
                        `Error sending notification \n\t-${errorMessage}`
                    )
                    node.status({
                        fill: 'red',
                        shape: 'dot',
                        text: 'Error notifying',
                    })

                    node.send([null, msg])
                })
        })
    }

    /**
     * With the custom node and configuration this function
     * creates de message body to send to firebase
     *
     * @param {object} config Node configuration object given by node-red
     * @param {object} msg message received by the custom node
     * @param {object} node custom node information object
     * @return {object} message to send to firebase
     */
    async function evalMessageInfo(config, msg, node) {
        const resultsArray = await Promise.all(
            Object.entries(config)
                .filter(([key]) => key.endsWith('Type'))
                .map(([typeKey, typeVal]) => {
                    return new Promise((resolve, reject) => {
                        let type = typeVal
                        let propertyKey = typeKey.replace('Type', '')
                        let propertyValue = config[propertyKey]

                        nodeUtils.evaluateValue(
                            RED,
                            propertyValue,
                            type,
                            node,
                            msg,
                            (err, result) => {
                                if (err) reject(err)
                                let resultObject = {}
                                resultObject[propertyKey] = result
                                resolve(resultObject)
                            }
                        )
                    })
                })
        )

        const messageInfo = resultsArray.reduce((accumulator, currentValue) => {
            return { ...accumulator, ...currentValue }
        }, {})

        return messageInfo
    }

    /**
     * Parses a messaje info to the final message for firebase
     * @param {object} messageToParse The messageInfo to parse
     * @param {object} config Node-red config object
     * @returns The final message to send to Firebase
     */
    function parseToMessageInfo(messageToParse, config) {
        let messageInfo = {}
        Object.entries(messageToParse).forEach(([propertyKey, propertyVal]) => {
            if (
                !Object.prototype.hasOwnProperty.call(
                    parseToFinalMessageInfo,
                    propertyKey
                )
            ) {
                let result = {}
                result[propertyKey] = propertyVal
                deepMerge(messageInfo, result)
            } else {
                let parsed = parseToFinalMessageInfo[propertyKey](propertyVal, config)
                deepMerge(messageInfo, parsed)
            }
        })

        return messageInfo
    }

    RED.nodes.registerType('FCM Send', FirebaseCloudMessagingNode)
}
