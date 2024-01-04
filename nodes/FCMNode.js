const firebaseAdmin = require('./lib/firebaseAdmin');
const nodeUtils = require('./lib/nodeUtils');

// --------------- CONFIG NODE STARTS ---------------

module.exports = function(RED) {
  function FirebaseConfig(config) {
    RED.nodes.createNode(this, config);

    const node = this;

    node.name = config.name;
    nodeUtils.evaluateValue(RED,
        config.keyPath,
        config.keyPathType,
        node,
        null,
        (err, result) => {
          if (err) {
            // Something went wrong accessing context
            node.error(err);
          } else {
            node.keyPath = result;
            node.debug(`Configured keypath: ${node.keyPath}`);
          }
        });

    if (config.proxy) {
      nodeUtils.evaluateValue(RED,
        config.proxy,
        config.proxyType,
        node,
        null,
        (err, result) => {
          if (err) {
            // Something went wrong accessing context
            node.error(err);
          } else {
            node.proxy = result;
            node.debug(`Configured proxy: ${node.proxy}`);
          }
        });
    }
  }

  RED.nodes.registerType('FCMConfig', FirebaseConfig);

  // --------------- CONFIG NODE ENDS ---------------
  // --------------- MAIN NODE STARTS ---------------

  function FirebaseCloudMessagingNode(config) {
    RED.nodes.createNode(this, config);

    // Retrieve the config node
    this.firebaseConfig = RED.nodes.getNode(config.firebaseConfig);

    const node = this;
    node.on('input', function(msg) {
      createMessageInfo(config, msg, node).then((messageInfo) => {
        node.status(
            {
              fill: 'yellow',
              shape: 'dot',
              text: 'Sending notification',
            });
        node.log(`Sending notification: \n${JSON.stringify(messageInfo)}`);

        firebaseAdmin.sendFcmMessage(messageInfo, node.firebaseConfig.keyPath, node.firebaseConfig.proxy)
            .then((msgId) => {
              msg.payload = msgId.name;
              node.status(
                  {
                    fill: 'green',
                    shape: 'dot',
                    text: 'Notification sent',
                  });
              node.send(msg);
            }).catch((error) => {
              node.error(`Error sending notification \n${error}`);
              node.status({fill: 'red', shape: 'dot', text: 'Error notifying'});
            });
      }).catch((error) => {
        node.error(`Error reading message info \n${error}`);
        node.status(
            {
              fill: 'red',
              shape: 'dot',
              text: 'Error preparing message',
            });
      });
    });
  }

  function createMessageInfo(config, msg, node) {
    return new Promise((resolve, reject) => {
      const messageInfo = {
        type: config.messageMode,
      };

      nodeUtils.evaluateValue(RED,
          config.destination,
          config.destinationType,
          node,
          msg,
          (err, result) => {
            if (err) reject(err);

            messageInfo['destination'] = result;

            nodeUtils.evaluateValue(RED,
                config.title,
                config.titleType,
                node,
                msg,
                (err, result) => {
                  if (err) reject(err);

                  messageInfo['title'] = result;

                  nodeUtils.evaluateValue(RED,
                      config.body,
                      config.bodyType,
                      node,
                      msg,
                      (err, result) => {
                        if (err) reject(err);

                        messageInfo['body'] = result;

                        resolve(messageInfo);
                      });
                });
          });
    });
  }

  RED.nodes.registerType('FCM', FirebaseCloudMessagingNode);
};
