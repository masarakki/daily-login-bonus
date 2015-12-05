var config = require("./config");

var createQuery = function(params) {
  console.log(params);
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
    refresh_token: event.refresh_token,
    channel: event.channel,
    token: token
  };
  config.dynamo.putItem(createQuery(params), function(err, data) {
    if(err) {
      context.done(err, data);
    } else {
      context.done(err, {token: token});
    }
  });
};

module.exports = create;
