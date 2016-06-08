"use strict";
function _forLazy(callbacks) {
    var defer = new Promise(function (resolve, reject) {
        var resolution = [];
        _forCallback(callbacks, resolve, reject, resolution, 0);
        return resolution;
    });
    return defer;
}
exports._forLazy = _forLazy;
function _forCallback(callbacks, resolve, reject, resolution, index) {
    if (callbacks[index]) {
        var callback = callbacks.shift();
        callback().then(function (resolution) {
            if (resolution === undefined) {
                resolve(resolution);
            }
            else {
                _forCallback(callbacks, resolve, reject, resolution, ++index);
            }
        }).catch(function (err) {
            reject(err);
        });
    }
    else {
        resolve(resolution);
    }
}
exports._forCallback = _forCallback;
//# sourceMappingURL=forLazy.js.map