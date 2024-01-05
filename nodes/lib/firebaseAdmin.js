const { google } = require('googleapis')
const axios = require('axios')
const stringUtils = require('./stringUtils')

const HOST = 'https://fcm.googleapis.com'
const PATH = '/v1/projects/{0}/messages:send'
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging'
const SCOPES = [MESSAGING_SCOPE]

/**
 * Get a valid access token.
 *
 * @param {string} keyPath Path to the key to create jwt
 * @return {string} Jwt created
 */
function getAccessToken(keyPath) {
    return new Promise(function (resolve, reject) {
        const key = require(keyPath)
        const jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            SCOPES,
            null
        )
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err)
                return
            }

            const path = stringUtils.formatText(PATH, key.project_id)

            resolve([tokens.access_token, path])
        })
    })
}

/**
 * Send HTTP request to FCM with given message.
 *
 * @param {object} messageInfo Object with information used to
 *                              make up the body of the request.
 * @param {string} keyPath location of the key to create the
 *                          jwt to call firebase
 * @param {string} proxy Proxy url if needed
 * @return {Promise} A promise that returns the result of the call or a error
 */
function sendFcmMessage(messageInfo, keyPath, proxy) {
    return new Promise(function (resolve, reject) {
        getAccessToken(keyPath)
            .then(function ([accessToken, path]) {
                const options = {
                    baseURL: HOST,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }

                if (proxy) {
                    const extractUrlInfo =
                        // eslint-disable-next-line no-useless-escape
                        /^((https?):\/\/)?(([^\/:]+):([^\/@]+))?@?([^:]+)(:(\d+)?)?(.*)$/

                    const [
                        ,
                        ,
                        protocol = 'http',
                        ,
                        user,
                        password,
                        host,
                        ,
                        port = 80,
                        path = '',
                    ] = extractUrlInfo.exec(proxy)

                    options['proxy'] = {
                        host: host + path,
                        port: port,
                        protocol: protocol,
                    }

                    if (user) {
                        options['proxy']['auth'] = {
                            username: user,
                            password: password,
                        }
                    }
                }

                const axiosInstance = axios.create(options)

                const message = {
                    message: {
                        notification: {
                            title: messageInfo.title,
                            body: messageInfo.body,
                        },
                    },
                }

                message['message'][messageInfo.type] = messageInfo.destination

                axiosInstance
                    .post(path, message)
                    .then((response) => {
                        if (response.status != 200) reject(response.data)

                        resolve(response.data)
                    })
                    .catch((error) => {
                        if (error.response)
                            reject(error.response.data || 'Unkown error')

                        reject(error)
                    })
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.exports = {
    getAccessToken,
    sendFcmMessage,
}
