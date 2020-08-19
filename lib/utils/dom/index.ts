const minDom: (Document | any)  = {
    addEventListener: (x: string, y: () => any) => null,
    dispatchEvent: (event: Event) =>  null,
    createElement: (tagName: string, options?: ElementCreationOptions) =>  ({
        id: '',
    }),
    getElementsByTagName: (tag: string) => null,
    getElementById: (tag: string) => null,
    createDocumentFragment: () => ({
        appendChild: (item: any) => ({ })
    }),
    body: {
        appendChild: (item: any) => ({ })
    }
};

export function atWindow(): Window | any  {
    return typeof window !== 'undefined' ? (<Window>window) : { };
}

export function atDocument(): Document  {
    return typeof document !== 'undefined' ? (<Document>document) : minDom;
}
