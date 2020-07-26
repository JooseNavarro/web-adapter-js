import {Observable} from "rxjs";

export interface PropsInterface {
    on(name: string): Observable<any>;
    find(property: string): { [key: string]: any };
}
