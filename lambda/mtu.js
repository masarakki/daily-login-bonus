var request = require("request-promise");
var _ = require("underscore");

var mtu = function() {
  return new Promise((resolve, reject) => {
    request({
      url: "http://api.search.nicovideo.jp/api",
      method: "POST",
      body: JSON.stringify({
        query: "デイリーパンツ",
        service: ["illust"],
        search: ["tag"],
        join: ["cmsid", "userid"],
        filters: [{field: "ss_adult", type: "equal", "value": "all"}],
        size: 100,
        from: 0
      })
    }).then((res) => {
      var lines = _.map(res.split("\n"), (line) => {
        if (line != "") {
          return JSON.parse(line);
        }
        return false;
      });
      var data = _.find(lines, (line) => {
        return line.type == "hits";
      }).values;
      var illust = _.map(data, (illust) => {
        return illust.cmsid;
      });
      resolve(_.max(illust, () => {
        return Math.random();
      }));
    });
  });
};
module.exports = mtu;
