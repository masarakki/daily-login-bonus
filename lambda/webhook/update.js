var config = require("./config");
var mtu = require("../mtu");
var request = require("request-promise");
var _ = require("underscore");

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

var post = function(params, webhook, illust) {
  var name = params.name;
  var message = params.message;
  var url = "http://seiga.nicovideo.jp/seiga/" + illust;
  var text = _.compact([message, url]).join(" ");

  return request({
    url: "https://slack.com/api/chat.postMessage",
    method: "POST",
    form: {
      token: webhook.access_token,
      channel: webhook.channel_id,
      text: text,
      username: name,
      unfurl_links: true,
      unfurl_media: true
    }
  });
};

var update = function(event, context) {
  var token = event.token;
  withRecord(token, context, function(err, data) {
    webhook = data.Item;
    if (webhook.logined_at && isToday(new Date(webhook.logined_at))) {
      context.succeed({status: 'conflict'});
    } else {
      mtu().then(function(illust) {
        return post(event, webhook, illust);
      }).then(function() {
        config.dynamo.updateItem(query(token), function() {
          context.succeed({status: 'success'});
        });
      });
    }
  });
};


module.exports = update;
