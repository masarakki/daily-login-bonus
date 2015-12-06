var config = require("./config");
var query = function(access_token) {
  return {
    TableName: config.tableName,
    FilterExpression: "#access_token = :access_token",
    ExpressionAttributeNames: {
      "#access_token": "access_token"
    },
    ExpressionAttributeValues: {
      ":access_token": access_token
    }
  };
};

var index = function(event, context) {
  var access_token = event.access_token;
  config.dynamo.scan(query(access_token), context.done);
};

module.exports = index;
