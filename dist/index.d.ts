declare var _default: {
    for: (callbacks: (() => Promise<any>)[]) => Promise<any[]>;
    forLazy: (callbacks: (() => Promise<any>)[]) => Promise<any[]>;
    forEach: <T>(collection: T[], iterator: (item: T) => Promise<any>) => Promise<any[]>;
    forEachLazy: <T>(collection: T[], iterator: (item: T) => Promise<any>) => Promise<any[]>;
    while: (condition: () => boolean, callback: () => Promise<any>) => Promise<any[]>;
};
export = _default;
