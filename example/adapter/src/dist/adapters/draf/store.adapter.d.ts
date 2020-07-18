import { Observable } from "rxjs";
export declare class RegisterStore {
    private store;
    private listStatus;
    private globalEvent;
    private rootEvent;
    initStoreAdapter(): void;
    on(): Observable<{
        stateApp: any;
    }>;
    dispatch(state: any): void;
    remove(): void;
    selector(): void;
}
