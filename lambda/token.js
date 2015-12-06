var request = require("request");
var slack_token_uri = "https://slack.com/api/oauth.access";

var token = function(event, context) {
  request.get({url: slack_token_uri, qs: event}, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var data = JSON.parse(body);
      if (data.ok) {
        return context.succeed({access_token: data.access_token});
      }
    }
    return context.fail("cant get token");
  });
};

module.exports = {
  create: token
}
