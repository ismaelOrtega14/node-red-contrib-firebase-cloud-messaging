/**
 * Copyright 2023-2024 Ismael Ortega
 *
 * Licensed under the MIT License,
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://opensource.org/licenses/MIT.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global describe, before, after, afterEach, context, it*/

const helper = require('node-red-node-test-helper')
const FCMNode = require('../nodes/FCMNode')

const flow = [
    {
        id: 'n0',
        type: 'FCM Config',
        name: 'test/configuration',
        keyPath: '/keypath/key.json',
        keyPathType: 'str',
        proxy: '',
        proxyType: 'str',
    },
    { id: 'h1', type: 'helper' },
]

describe('FCMNode Node', function () {
    before(function (done) {
        helper.startServer(done)
    })

    after(function (done) {
        helper.stopServer(done)
    })

    afterEach(function () {
        return helper.unload()
    })

    context('When NODE is loaded', () => {
        it('should be loaded', function (done) {
            const newFlow = [
                {
                    id: 'n1',
                    type: 'FCM Send',
                    name: 'test/fcm',
                    firebaseConfig: 'n0',
                    messageMode: 'token',
                    destination: 'token',
                    destinationType: 'str',
                    title: 'title',
                    titleType: 'str',
                    body: 'body',
                    bodyType: 'str',
                },
                ...flow,
            ]

            helper.load([FCMNode], newFlow, function () {
                try {
                    const n1 = helper.getNode('n1')
                    const n0 = helper.getNode('n0')
                    n1.should.have.property('name', 'test/fcm')
                    n1.should.have.property('type', 'FCM Send')
                    n1.firebaseConfig.should.be.Object()
                    n0.should.have.property('name', 'test/configuration')
                    n0.should.have.property('type', 'FCM Config')
                    done()
                } catch (error) {
                    done(error)
                }
            })
        })

        it('should throw an error without config', function (done) {
            const newFlow = [
                {
                    id: 'n1',
                    type: 'FCM Send',
                    name: 'test/fcm',
                    firebaseConfig: null,
                    messageMode: 'token',
                    destination: 'token',
                    destinationType: 'str',
                    title: 'title',
                    titleType: 'str',
                    body: 'body',
                    bodyType: 'str',
                },
                ...flow,
            ]

            helper.load([FCMNode], newFlow, function () {
                try {
                    const logEvents = helper.log().args.filter(function (evt) {
                        return evt[0].type == 'FCM Send'
                    })

                    logEvents.should.have.length(1)
                    logEvents[0][0].should.have.property(
                        'msg',
                        'No connection configured!'
                    )
                    done()
                } catch (error) {
                    done(error)
                }
            })
        })
    })
})
