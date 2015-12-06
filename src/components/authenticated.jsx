var React = require("react");
var request = require("request-promise");
var $ = require("jquery");
var slack = require("../slack");
var Channels = require("./channels.jsx");
var Webhooks = require("./webhooks.jsx");
var config = require("../config");

var Usage = class Usage extends React.Component {
  render() {
    var json = JSON.stringify({"message": "today's bonus!", "name": "dailyloginbonus"});
    var url = "{your_webhook_url}";
    var styles = {
      textAlign: "left"
    };
    return <div>
      <h2>Usage</h2>
      <div style={styles}>
      <code>PUT {url}</code>
      <br />
      <code>
      {json}
    </code>
      </div>
      </div>;
  }
}

class Authenticated extends React.Component {
  constructor() {
    super();
    this.state = {
      access_token: null,
      channels: []
    };
  }

  getChildContext() {
    return { main: this };
  }
  componentDidMount() {
    this.getAccessToken();
  }

  getAccessToken() {
    $.ajax({
      url: config.api + "/slack/token",
      dataType: "json",
      data: {
        code: this.props.code,
        redirect_uri: slack.options.redirectUri
      }
    }).done( (res) => {
      this.setState({access_token: res.access_token});
      this.getChannelList();
      this.getWebhookList();
    });
  }

  getChannelList() {
    $.ajax({
      url: config.api + "/slack/channels",
      data: {
        access_token: this.state.access_token,
        ex: 1
      }
    }).done( (res) => {
      if (res.ok) {
        this.setState({channels: res.channels});
      }
    });
  }

  getWebhookList() {
    $.ajax({
      url: config.api + "/webhooks",
      data: {
        access_token: this.state.access_token
      }
    }).done((res) => {
      this.setState({webhooks: res.Items});
    });
  }

  createWebhook(channel_id, channel_name) {
    request({
      url: config.api + "/webhooks",
      method: "POST",
      body: JSON.stringify({
        access_token: this.state.access_token,
        channel_id: channel_id,
        channel_name: channel_name
      })
    }).then((res) => {
      this.getWebhookList();
    });
  }

  removeWebhook(token) {
    request({
      url: config.api + "/webhooks/" + token,
      method: "DELETE"
    }).then((res) => {
      this.getWebhookList();
    });
  }

  render() {
    return <div>
      <Webhooks webhooks={this.state.webhooks} />
      <Channels channels={this.state.channels} />
      <Usage />
      </div>;
  }
}

Authenticated.childContextTypes = {
  main: React.PropTypes.object
};


module.exports = Authenticated;
