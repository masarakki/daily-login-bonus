var React = require("react");
var slack = require("../slack.js");

var Login = class Login extends React.Component {
  handleClick() {
    window.location.href = slack.code.getUri();
  }
  render() {
    return <button onClick={this.handleClick}>Login with Slack</button>;
  }
};

module.exports = Login;
