export function _forEach<T>(collection: Array<T>,
                            iterator: (item: T) => Promise<any>): Promise<any[]> {

  let defer: Promise<Promise<any>[]> = new Promise((resolve, reject) => {
    let promises: Promise<any>[] = [];

    _forEachCallback<T>(collection, iterator, resolve, reject, promises);

    return promises;
  });

  return defer;
}

export function _forEachCallback<T>(collection: Array<T>,
                                    iterator: (item: T) => Promise<any>,
                                    resolve: (value?: {} | Thenable<T>) => void,
                                    reject: (value?: {} | Thenable<T>) => void,
                                    resolutions: any[]) {
  if(collection.length) {
    let item = collection.shift();
    let itemPromise = iterator(item);

    itemPromise.then((resolution: any) => {
      resolutions.push(resolution);
      _forEachCallback(collection, iterator, resolve, reject, resolutions);
    }).catch((err: any) => {
      reject(err);
    });
  } else {
    resolve(resolutions);
  }
}
