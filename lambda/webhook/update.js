var config = require("./config");

var query = function(token) {
  var now = new Date();
  return {
    TableName: config.tableName,
    Key: {
      token: token
    },
    UpdateExpression: "SET #logined_at = :now",
    ExpressionAttributeNames: {
      "#logined_at": "logined_at"
    },
    ExpressionAttributeValues: {
      ":now": now.getTime()
    },
    ReturnValues: "ALL_NEW"
  };
};

var beginningOfToday = function() {
  var now = new Date();
  // a day is start at 06:00 JST
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() - 19, 0, 0);
};

var isToday = function(logined) {
  var beginning = beginningOfToday();
  return logined.getTime() > beginningOfToday().getTime();
};

var withRecord = function(token, context, callback) {
  config.findByToken(token, function(err, data) {
    if (err) {
      context.done(err, data);
    }
    if (!data.Item) {
      context.fail("Endpoint Not Found");
    }
    callback(err, data);
  });
};

var update = function(event, context) {
  var token = event.token;
  withRecord(token, context, function(err, data) {
    if (data.Item.logined_at && isToday(new Date(data.Item.logined_at))) {
      context.succeed({status: 'conflict'});
    } else {
      config.dynamo.updateItem(query(token), function() {
        context.succeed({status: 'success'});
      });
    }
  });
};

module.exports = update;
