var sendResponse = function(res, statusCode, data, type) {
  res.statusCode = statusCode;
  res.set('Content-Type', type);
  res.send(JSON.stringify(data));
};

var collectData = function(req, cb) {
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', function() {
    cb(data);
  });
};

module.exports.sendResponse = sendResponse;
module.exports.collectData = collectData;