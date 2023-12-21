/**
 * Custom node code that pushes notifications to firebase
 * @param {*} config Object that contains all configuration formed by node-red
 */
function PushFirebaseNode(config) {
  RED.nodes.createNode(this, config);
  // node-specific code goes here
}

RED.nodes.registerType('pushFirebase', PushFirebaseNode);
