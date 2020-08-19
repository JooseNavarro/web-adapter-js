import { Observable } from "rxjs";

export interface EventHandlerInterface {
    dispatch(action: string, payload: any): void;
    on(action: string):  Observable<StateApp>;
    onChanges(action: string, fun: () => any): () => StateApp;
}

export interface StateApp {
    stateApp: any;
}
