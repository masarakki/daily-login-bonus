var request = require("request-promise");
var slack_token_uri = "https://slack.com/api/oauth.access";

var token = function(event, context) {
  request.get({url: slack_token_uri, qs: event}).then(function(body) {
    var data = JSON.parse(body);
    if (data.ok) {
      return context.succeed({access_token: data.access_token});
    }
    return context.fail("cant get token");
  });
};

module.exports = {
  create: token
}
