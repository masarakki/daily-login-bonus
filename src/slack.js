var Oauth2 = require("client-oauth2");

var slack = new Oauth2({
  clientId: '2268602738.15727569827',
  authorizationUri: "https://slack.com/oauth/authorize",
  accessTokenUri: "https://slack.com/api/oauth.access",
  redirectUri: window.location.toString(),
  scopes: ["channels:read", "chat:write:bot"]
});

module.exports = slack;
