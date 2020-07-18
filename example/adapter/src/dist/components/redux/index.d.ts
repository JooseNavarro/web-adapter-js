import { Observable } from "rxjs";
declare class Store {
    private store;
    private conf;
    constructor(location: any);
    private initListener;
    get getState(): Observable<any>;
    dispatch(state: any): void;
    on(): Observable<{
        stateApp: any;
    }>;
    onPromise(): Promise<any>;
}
export declare const config: {
    root: Store;
    child: Store;
};
export {};
