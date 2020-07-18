import { Observable } from "rxjs";
export declare class OperatorStore {
    private storeGlobal;
    private storeRoot;
    constructor();
    private trackingGlobal;
    private trackingRoot;
    on(): Observable<{
        stateApp: any;
    }>;
    onRoot(): Observable<{
        stateApp: any;
    }>;
    dispatch(state: any): void;
}
