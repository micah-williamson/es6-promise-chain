export function _while(condition: () => boolean, callback: () => Promise<any>): Promise<any[]> {

  let defer: Promise<Promise<any>[]> = new Promise((resolve, reject) => {
    let promises: Promise<any>[] = [];

    _whileCallback(condition, callback, resolve, reject, promises);

    return promises;
  });

  return defer;
}

export function _whileCallback<T>(condition: () => boolean,
                                  callback: () => Promise<any>,
                                  resolve: (value?: {} | Thenable<T>) => void,
                                  reject: (value?: {} | Thenable<T>) => void,
                                  resolutions: any[]) {
  if(condition()) {
    callback().then((resolution: any) => {
      resolutions.push(resolution);
      _whileCallback(condition, callback, resolve, reject, resolutions);
    }).catch((err: any) => {
      reject(err);
    });
  } else {
    resolve(resolutions);
  }
}
