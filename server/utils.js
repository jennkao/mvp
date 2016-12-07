var sendResponse = function(res, statusCode, data, type) {
  res.statusCode = statusCode;
  res.set('Content-Type', type);
  res.send(JSON.stringify(data));
};
module.exports.sendResponse = sendResponse;
