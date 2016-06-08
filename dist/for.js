"use strict";
function _for(callbacks) {
    var defer = new Promise(function (resolve, reject) {
        var promises = [];
        _forCallback(callbacks, resolve, reject, promises, 0);
        return promises;
    });
    return defer;
}
exports._for = _for;
function _forCallback(callbacks, resolve, reject, resolutions, index) {
    if (callbacks[index]) {
        var callback = callbacks.shift();
        callback().then(function (resolution) {
            resolutions.push(resolution);
            _forCallback(callbacks, resolve, reject, resolutions, ++index);
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