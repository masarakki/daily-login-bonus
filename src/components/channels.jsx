var React = require("react");
var request = require("request");
var _ = require("underscore");

class Channels extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    var channel_id = this.refs.channel.value;
    var channel_name = _.find(this.props.channels, (channel) => {
      return channel.id == channel_id;
    }).name;
    this.context.main.createWebhook(channel_id, channel_name);
  }
  render() {
    if (this.props.channels.length == 0) {
      return <div>
        <h2>Create new Webhook</h2>
        <div>Loading...</div>
        </div>;
    }
    var channels = _.map(this.props.channels, (channel) => {
      return <option key={channel.id} value={channel.id}>#{channel.name}</option>;
    });

    return <div>
      <h2>Create new Webhook</h2>
      <form onSubmit={this.handleSubmit}>
      <select ref="channel">
      {channels}
    </select>
      <input type="submit" value="create" />
      </form>
      </div>;
  }
}

Channels.contextTypes = {
  main: React.PropTypes.object
};

module.exports = Channels;
