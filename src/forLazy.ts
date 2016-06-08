export function _forLazy(callbacks: Array<() => Promise<any>>): Promise<any[]> {

  let defer: Promise<Promise<any>[]> = new Promise((resolve, reject) => {
    let resolution: Promise<any>[] = [];

    _forCallback(callbacks, resolve, reject, resolution, 0);

    return resolution;
  });

  return defer;
}

export function _forCallback<T>(callbacks: Array<() => Promise<any>>,
                                resolve: (value?: {} | Thenable<T>) => void,
                                reject: (value?: {} | Thenable<T>) => void,
                                resolution: any,
                                index: number) {
  if(callbacks[index]) {
    let callback = callbacks.shift();

    callback().then((resolution: any) => {
      if(resolution === undefined) {
        resolve(resolution);
      } else {
        _forCallback(callbacks, resolve, reject, resolution, ++index); 
      }
    }).catch((err: any) => {
      reject(err);
    });
  } else {
    resolve(resolution);
  }
}
