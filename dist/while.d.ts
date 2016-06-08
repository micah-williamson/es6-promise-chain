export declare function _while(condition: () => boolean, callback: () => Promise<any>): Promise<any[]>;
export declare function _whileCallback<T>(condition: () => boolean, callback: () => Promise<any>, resolve: (value?: {} | Thenable<T>) => void, reject: (value?: {} | Thenable<T>) => void, resolutions: any[]): void;
