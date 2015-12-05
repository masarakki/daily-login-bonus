var $ = require("jquery");
var React = require("react");
var ReactDOM = require("react-dom");
var qs = require("query-string");

$(document).ready(function() {
  var query = qs.parse(window.location.search);
  var target = document.getElementById("react");
  var Main = require("./components/main.jsx");
  var Inner;
  var params = {};

  if (query.code) {
    Inner = require("./components/authenticated.jsx");
    params.code = query.code;
  } else {
    Inner = require("./components/login.jsx");
  }
  ReactDOM.render(<Main inner={Inner} params={params} />, target);
});
