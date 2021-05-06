import { Observable } from "rxjs";

export interface EventFlow {
    emit(): void;
    on(): Observable<any>;
    onPromise(): Promise<any>;
}
