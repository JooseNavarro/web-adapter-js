import { ROUTES_EVENT } from "../../constants";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

interface RoutesInterface {
    route: string;
    option: any;
}

export class RoutesAdapter {

    private statusComponent: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor() {
        this.listen();
    }

    public on(): Observable<RoutesInterface> {
        return this.statusComponent.asObservable().pipe(
            filter( (e: CustomEvent) => e !== null),
            map( (ele: CustomEvent) => ele.detail),
        );
    }

    private listen(): void {
        document.addEventListener(
            ROUTES_EVENT,
            (e: Event) => this.statusComponent.next(e)
        );
    }

    public emit(route: string, option: any): void {
        const data = {
            detail: { route, option  }
        };
        const event = new CustomEvent(ROUTES_EVENT, data);
        document.dispatchEvent(event);
    }

}


