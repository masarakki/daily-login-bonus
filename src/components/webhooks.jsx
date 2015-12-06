var React = require("react");
var _ = require("underscore");
var config = require("../config");

class Webhook extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("remove?")) {
      this.context.main.removeWebhook(this.props.token);
    }
  }
  render() {
    var url = config.api + "/webhooks/" + this.props.token;
    return <tr>
      <th>#{this.props.channel_name}</th>
      <td>{url}</td>
      <td><button onClick={this.handleClick}>remove</button></td>
      </tr>;
  }
}
class Webhooks extends React.Component {
  render() {
    var webhooks = _.map(this.props.webhooks, (webhook) => {
      return <Webhook key={webhook.token} {...webhook} />;
    });
    var styles = {
      textAlign: "left"
    };
    return <div>
      <h2>Webhooks</h2>
      <table style={styles}>
      <thead>
      <tr>
      <th>Channel</th>
      <th>Webhook Url</th>
      <th></th>
      </tr>
      </thead>
      <tbody>
      {webhooks}
    </tbody>
    </table>
      </div>;
  }
}

Webhook.contextTypes = {
  main: React.PropTypes.object
};


module.exports = Webhooks;
