import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { ROUTES_EVENT } from "../../constants";
import { RoutesInterface } from "./interface";
import { isNullOrUndefined } from "../../utils";
import { atDocument, atWindow } from "../../utils/dom";

export class Routes {

    private statusRoutes: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor() {
        this.main();
    }

    private main(): void {
        atDocument().addEventListener(ROUTES_EVENT, (e: Event) =>
            this.statusRoutes.next(e) );
    }

    public on(): Observable<RoutesInterface> {
        return this.statusRoutes.asObservable().pipe(
            filter((e: CustomEvent) => !isNullOrUndefined(e)),
            map((ele: CustomEvent) => ele.detail)
        );
    }

    public onChanges(fun: (eElement: any) => any) {
        this.on()
            .subscribe( (res: RoutesInterface) => fun(res));
    }

    public emit(route: string, option?: any): void {
        const data = { route, option };
        const { CustomEvent } = atWindow();
        const event = new CustomEvent(ROUTES_EVENT, { detail: data });
        atDocument().dispatchEvent(event);
    }
}
