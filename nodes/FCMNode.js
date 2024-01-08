const firebaseAdmin = require('./lib/firebaseAdmin')
const nodeUtils = require('./lib/nodeUtils')

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
            createMessageInfo(config, msg, node)
                .then((messageInfo) => {
                    node.status({
                        fill: 'yellow',
                        shape: 'dot',
                        text: 'Sending notification',
                    })
                    node.log(
                        `Sending notification: \n${JSON.stringify(messageInfo)}`
                    )

                    const keyPath = node.firebaseConfig.keyPath
                    const proxy = node.firebaseConfig.proxy

                    firebaseAdmin
                        .sendFcmMessage(messageInfo, keyPath, proxy)
                        .then((msgId) => {
                            msg.payload = msgId.name
                            node.status({
                                fill: 'green',
                                shape: 'dot',
                                text: 'Notification sent',
                            })
                            node.send(msg)
                        })
                        .catch((error) => {
                            const errorMessage = typeof error === 'object' ? JSON.stringify(error) : error;

                            node.error(`Error sending notification \n${errorMessage}`)
                            node.status({
                                fill: 'red',
                                shape: 'dot',
                                text: 'Error notifying',
                            })
                        })
                })
                .catch((error) => {
                    node.error(`Error reading message info \n${error}`)
                    node.status({
                        fill: 'red',
                        shape: 'dot',
                        text: 'Error preparing message',
                    })
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
    function createMessageInfo(config, msg, node) {
        return new Promise((resolve, reject) => {
            const messageInfo = {
                type: config.messageMode,
            }

            nodeUtils.evaluateValue(
                RED,
                config.destination,
                config.destinationType,
                node,
                msg,
                (err, result) => {
                    if (err) reject(err)

                    messageInfo['destination'] = result

                    nodeUtils.evaluateValue(
                        RED,
                        config.title,
                        config.titleType,
                        node,
                        msg,
                        (err, result) => {
                            if (err) reject(err)

                            messageInfo['title'] = result

                            nodeUtils.evaluateValue(
                                RED,
                                config.body,
                                config.bodyType,
                                node,
                                msg,
                                (err, result) => {
                                    if (err) reject(err)

                                    messageInfo['body'] = result

                                    resolve(messageInfo)
                                }
                            )
                        }
                    )
                }
            )
        })
    }

    RED.nodes.registerType('FCM Send', FirebaseCloudMessagingNode)
}
