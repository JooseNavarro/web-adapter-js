import { Observable } from "rxjs";

export interface StoreInterface {
    dispatch(state: any): void;
    on():  Observable<StateApp>;
    onPromise(): Promise<StateApp>;
}

export interface StateApp {
    stateApp: any;
}
