"use strict";
function _for(callbacks) {
    var defer = new Promise(function (resolve, reject) {
        var promises = [];
        _forCallback(callbacks, resolve, reject, promises);
        return promises;
    });
    return defer;
}
exports._for = _for;
function _forCallback(callbacks, resolve, reject, resolutions) {
    if (callbacks.length) {
        var callback = callbacks.shift();
        callback().then(function (resolution) {
            resolutions.push(resolution);
            _forCallback(callbacks, resolve, reject, resolutions);
        }).catch(function (err) {
            reject(err);
        });
    }
    else {
        resolve(resolutions);
    }
}
exports._forCallback = _forCallback;
//# sourceMappingURL=for.js.map