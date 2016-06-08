"use strict";
function _forEach(collection, iterator) {
    var defer = new Promise(function (resolve, reject) {
        var promises = [];
        _forEachCallback(collection, iterator, resolve, reject, promises, 0);
        return promises;
    });
    return defer;
}
exports._forEach = _forEach;
function _forEachCallback(collection, iterator, resolve, reject, resolutions, index) {
    if (collection[index]) {
        var item = collection[index];
        var itemPromise = iterator(item);
        itemPromise.then(function (resolution) {
            resolutions.push(resolution);
            _forEachCallback(collection, iterator, resolve, reject, resolutions, ++index);
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