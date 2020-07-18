import { Observable } from "rxjs";
import { RoutesInterface } from "./interface.adapter";
export declare class RoutesAdapter {
    private statusRoutes;
    constructor();
    private initRoutes;
    on(): Observable<RoutesInterface>;
    onPromise(): Promise<RoutesInterface>;
    emit(route: string, option: any): void;
}
