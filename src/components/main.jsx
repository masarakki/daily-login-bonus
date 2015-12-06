var React = require("react");

class Main extends React.Component {
  render() {
    var boxStyles = {
      color: "#303030",
      textAlign: "center",
      margin: "40px 200px auto",
      padding: "10px",
      height: "80%",
      backgroundColor: "#e0e0e0"
    };
    var titleStyles = {
      fontSize: "64px"
    };
    var View = this.props.inner;
    return <div style={boxStyles}>
      <h1 style={titleStyles}>Daily Login Bonus</h1>
      <View {...this.props.params} />
      </div>;
  }
}

module.exports = Main;
