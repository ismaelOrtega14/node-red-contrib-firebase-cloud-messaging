/**
 * Helps in Node-Red evaluation of values
 *
 * @param {Object} RED Object with node-red functions
 * @param {String} value Data to evaluate depending of the type
 * @param {String} type Type of the evaluation
 * @param {Object} node Node object with node-red information
 * @param {Object} msg Message received if exists
 * @param {Function} callback Function to call when finish
 */
function evaluateValue(RED, value, type, node, msg, callback) {
  node.debug(`Evaluate value ${value} of type ${type}`);

  if (type == 'str' || type == undefined) callback(null, value);

  if (type == 'jsonata') {
    const jsonataExpression = RED.util.prepareJSONataExpression(value, node);
    node.debug('JSONata expresion created');
    RED.util.evaluateJSONataExpression(jsonataExpression, msg, callback);
  }

  if (type == 'msg' || type == 'flow' || type == 'global') {
    RED.util.evaluateNodeProperty(value, type, node, msg, callback);
  }
}

module.exports = {
  evaluateValue,
};
