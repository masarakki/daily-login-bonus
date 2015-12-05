var doc = require("dynamodb-doc");
var dynamo = doc.DynamoDB();
var tableName = "login_bonuses";

var getQuery = function(token) {
  return {
    TableName: tableName,
    Key: {
      token: token
    }
  };
};


var findByToken = function(token, callback) {
  dynamo.getItem({
    TableName: tableName,
    Key: {
      token: token
    }
  }, callback);
};


module.exports = {
  tableName: "login_bonuses",
  findByToken: findByToken,
  dynamo: dynamo
}
