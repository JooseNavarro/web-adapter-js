import { BehaviorSubject, Observable } from "rxjs";
import { EVENT_HANDLER_CHILD, EVENT_HANDLER_ROOT } from "../../constants";
import { filter, map } from "rxjs/operators";
import { isNullOrUndefined } from "../../utils";
import { StateApp, EventHandlerInterface } from "./interfece";
import { atDocument, atWindow } from "../../utils/dom";


class EventHandlerAdapter implements EventHandlerInterface {

    private store: BehaviorSubject<any> = new BehaviorSubject(null);
    public conf = {  listen: '', destination: ''  };

    constructor( location: any ) {
        this.conf = location;
        this.main();
    }

    private state(): Observable<{ stateApp: any, action: any }> {
        return this.store.asObservable().pipe(
            filter((e: CustomEvent) => !isNullOrUndefined(e)),
            map(({ detail }: CustomEvent) => detail)
        );
    }

    private main(): void {
        atDocument().addEventListener(
            this.conf.listen,(e: Event) => this.store.next( e ));
    }

    public dispatch( state: any, action = '' ): void {
        const data = { stateApp: { ...state }, action };
        const { CustomEvent } = atWindow();
        const event = new CustomEvent(this.conf.destination, { detail: data });
        atDocument().dispatchEvent(event);
    }

    public on(currentAction: string = ''): Observable<StateApp> {
        return this.state().pipe(
            filter(({ action }) => !currentAction || currentAction === action ),
            map(({ stateApp }) => ({ ...stateApp })),
        );
    }

    // @ts-ignore
    public onChanges(fun: (eElement: any) => any, currentAction = '') {
        this.state()
            .subscribe( ({ action, stateApp }) =>
                !currentAction || currentAction === action ? fun({ ...stateApp }) : null)
    }

}

export const EventHandler = {
    root: ()=> new EventHandlerAdapter({ listen: EVENT_HANDLER_ROOT, destination: EVENT_HANDLER_CHILD }),
    child: ()=> new EventHandlerAdapter({ listen: EVENT_HANDLER_CHILD, destination: EVENT_HANDLER_ROOT }),
    custom: (tag: string)=> new EventHandlerAdapter({ listen: tag, destination: tag }),
};

