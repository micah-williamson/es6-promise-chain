"use strict";
function _forEach(collection, iterator) {
    var defer = new Promise(function (resolve, reject) {
        var promises = [];
        _forEachCallback(collection, iterator, resolve, reject, promises);
        return promises;
    });
    return defer;
}
exports._forEach = _forEach;
function _forEachCallback(collection, iterator, resolve, reject, resolutions) {
    if (collection.length) {
        var item = collection.shift();
        var itemPromise = iterator(item);
        itemPromise.then(function (resolution) {
            resolutions.push(resolution);
            _forEachCallback(collection, iterator, resolve, reject, resolutions);
        }).catch(function (err) {
            reject(err);
        });
    }
    else {
        resolve(resolutions);
    }
}
exports._forEachCallback = _forEachCallback;
//# sourceMappingURL=forEach.js.map