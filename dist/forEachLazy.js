"use strict";
function _forEachLazy(collection, iterator) {
    var defer = new Promise(function (resolve, reject) {
        var resolution = [];
        _forEachCallback(collection, iterator, resolve, reject, resolution, 0);
        return resolution;
    });
    return defer;
}
exports._forEachLazy = _forEachLazy;
function _forEachCallback(collection, iterator, resolve, reject, resolution, index) {
    if (collection[index]) {
        var item = collection[index];
        var itemPromise = iterator(item);
        itemPromise.then(function (resolution) {
            if (resolution === undefined) {
                resolve(resolution);
            }
            else {
                _forEachCallback(collection, iterator, resolve, reject, resolution, ++index);
            }
        }).catch(function (err) {
            reject(err);
        });
    }
    else {
        resolve(resolution);
    }
}
exports._forEachCallback = _forEachCallback;
//# sourceMappingURL=forEachLazy.js.map