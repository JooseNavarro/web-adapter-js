import { ROUTES_EVENT } from "../../constants";
import { RoutesInterface } from "./interface";
import { atDocument, atWindow } from "../../utils/dom";

export class Routes {

    private behaviorSubject: any;

    constructor() {
        this.main();
    }

    private main(): void {
        atDocument().addEventListener(ROUTES_EVENT,
            ({ detail }: Event | any) => this.behaviorSubject = (fn: any)=> fn(detail));
    }

    public onChanges(fn: (eElement: any) => any) {
        this.behaviorSubject( (res: RoutesInterface) => fn(res));
    }

    public emit(route: string, option?: any): void {
        const data = { route, option };
        const { CustomEvent } = atWindow();
        const event = new CustomEvent(ROUTES_EVENT, { detail: data });
        atDocument().dispatchEvent(event);
    }
}
