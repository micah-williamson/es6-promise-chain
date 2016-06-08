export function _forEachLazy<T>(collection: Array<T>,
                            iterator: (item: T) => Promise<any>): Promise<any[]> {

  let defer: Promise<Promise<any>[]> = new Promise((resolve, reject) => {
    let resolution: Promise<any>[] = [];

    _forEachCallback<T>(collection, iterator, resolve, reject, resolution, 0);

    return resolution;
  });

  return defer;
}

export function _forEachCallback<T>(collection: Array<T>,
                                    iterator: (item: T) => Promise<any>,
                                    resolve: (value?: {} | Thenable<T>) => void,
                                    reject: (value?: {} | Thenable<T>) => void,
                                    resolution: any[],
                                    index: number) {
  if(collection[index]) {
    let item = collection[index];
    let itemPromise = iterator(item);

    itemPromise.then((resolution: any) => {
      if(resolution === undefined) {
        resolve(resolution);
      } else {
        _forEachCallback(collection, iterator, resolve, reject, resolution, ++index); 
      }
    }).catch((err: any) => {
      reject(err);
    });
  } else {
    resolve(resolution);
  }
}
