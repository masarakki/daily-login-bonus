var request = require("request-promise");
var Promise = require("bluebird");
var _ = require("underscore");

var mtu = function() {
  return new Promise(function(resolve, reject) {
    request({
      url: "http://api.search.nicovideo.jp/api/v2/illust/contents/search",
      method: "GET",
      qs: {
        q: "デイリーパンツ",
        targets: "tagsExact",
        fields: "contentId",
        _sort: "-viewCounter",
        _limit: 100,
        _context: "Daily Login Bonus"
      },
      headers: {
        "User-Agent": "DailyLoginBonus by masarakki"
      }
    }).then(function(res) {
      var json = JSON.parse(res);
      var images = _.map(json.data, function(image) {
        return image.contentId;
      });
      resolve(_.max(images, function() {
        return Math.random();
      }));
    });
  });
};

module.exports = mtu;
