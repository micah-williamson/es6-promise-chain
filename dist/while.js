"use strict";
function _while(condition, callback) {
    var defer = new Promise(function (resolve, reject) {
        var promises = [];
        _whileCallback(condition, callback, resolve, reject, promises);
        return promises;
    });
    return defer;
}
exports._while = _while;
function _whileCallback(condition, callback, resolve, reject, resolutions) {
    if (condition()) {
        callback().then(function (resolution) {
            resolutions.push(resolution);
            _whileCallback(condition, callback, resolve, reject, resolutions);
        }).catch(function (err) {
            reject(err);
        });
    }
    else {
        resolve(resolutions);
    }
}
exports._whileCallback = _whileCallback;
//# sourceMappingURL=while.js.map