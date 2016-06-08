export function _forEach<T>(collection: Array<T>,
                            iterator: (item: T) => Promise<any>): Promise<any[]> {

  let defer: Promise<Promise<any>[]> = new Promise((resolve, reject) => {
    let promises: Promise<any>[] = [];

    _forEachCallback<T>(collection, iterator, resolve, reject, promises, 0);

    return promises;
  });

  return defer;
}

export function _forEachCallback<T>(collection: Array<T>,
                                    iterator: (item: T) => Promise<any>,
                                    resolve: (value?: {} | Thenable<T>) => void,
                                    reject: (value?: {} | Thenable<T>) => void,
                                    resolutions: any[],
                                    index: number) {
  if(collection[index]) {
    let item = collection[index];
    let itemPromise = iterator(item);

    itemPromise.then((resolution: any) => {
      resolutions.push(resolution);
      _forEachCallback(collection, iterator, resolve, reject, resolutions, ++index);
    }).catch((err: any) => {
      reject(err);
    });
  } else {
    resolve(resolutions);
  }
}
