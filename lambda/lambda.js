var routes = require("./routes");

exports.handler = function(event, context) {
  var controller = event.controller;
  var action = event.action;

  console.log(routes[controller][action]);
  if(routes[controller][action]) {
    routes[controller][action](event.params, context);
  } else {
    context.fail("routes not found");
  }
}
