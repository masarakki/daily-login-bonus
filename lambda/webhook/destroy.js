var config = require("./config");
var query = function(token) {
  return {
    TableName: config.tableName,
    Key: {
      token: token
    }
  };
};

var destroy = function(event, context) {
  var token = event.token;
  config.dynamo.deleteItem(query(token), context.done);
};

module.exports = destroy;
