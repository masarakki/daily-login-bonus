var config = require("./config");

var createQuery = function(params) {
  return {
    TableName: config.tableName,
    Item: params,
    ReturnValues: "NONE"
  };
};

var create = function(event, context) {
  var token = Math.random().toString(36).slice(-15);
  var params = {
    access_token: event.access_token,
    channel_id: event.channel_id,
    channel_name: event.channel_name,
    token: token
  };
  config.dynamo.putItem(createQuery(params), function(err, data) {
    if(err) {
      return context.done(err, data);
    } else {
      return context.done(err, {token: token});
    }
  });
};

module.exports = create;
