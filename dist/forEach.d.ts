export declare function _forEach<T>(collection: Array<T>, iterator: (item: T) => Promise<any>): Promise<any[]>;
export declare function _forEachCallback<T>(collection: Array<T>, iterator: (item: T) => Promise<any>, resolve: (value?: {} | Thenable<T>) => void, reject: (value?: {} | Thenable<T>) => void, resolutions: any[]): void;
