export function _for(callbacks: Array<() => Promise<any>>): Promise<any[]> {

  let defer: Promise<Promise<any>[]> = new Promise((resolve, reject) => {
    let promises: Promise<any>[] = [];

    _forCallback(callbacks, resolve, reject, promises);

    return promises;
  });

  return defer;
}

export function _forCallback<T>(callbacks: Array<() => Promise<any>>,
                                resolve: (value?: {} | Thenable<T>) => void,
                                reject: (value?: {} | Thenable<T>) => void,
                                resolutions: any[]) {
  if(callbacks.length) {
    let callback = callbacks.shift();

    callback().then((resolution: any) => {
      resolutions.push(resolution);
      _forCallback(callbacks, resolve, reject, resolutions);
    }).catch((err: any) => {
      reject(err);
    });
  } else {
    resolve(resolutions);
  }
}
