import { EVENT_HANDLER_CHILD, EVENT_HANDLER_ROOT } from "../../constants";
import { EventHandlerInterface } from "./interfece";
import { atDocument, atWindow } from "../../utils/dom";


class EventHandlerAdapter implements EventHandlerInterface {

    public conf = {  listen: '', destination: ''  };
    private behaviorSubject: any;

    constructor( location: any ) {
        this.conf = location;
        this.main();
    }

    private main(): void {
        atDocument().addEventListener(this.conf.listen,
            ({ detail }: Event | any) => this.behaviorSubject = (fn: any)=> fn(detail));
    }

    public dispatch( state: any, action = '' ): void {
        const data = { stateApp: { ...state }, action };
        const { CustomEvent } = atWindow();
        const event = new CustomEvent(this.conf.destination, { detail: data });
        atDocument().dispatchEvent(event);
    }

    // @ts-ignore
    public onChanges(fn: (eElement: any) => any, currentAction = '') {
        this.behaviorSubject( ({ action, stateApp }: any) => 
            !currentAction || currentAction === action ? fn({ ...stateApp }) : null);
    }

}

export const EventHandler = {
    root: ()=> new EventHandlerAdapter({ listen: EVENT_HANDLER_ROOT, destination: EVENT_HANDLER_CHILD }),
    child: ()=> new EventHandlerAdapter({ listen: EVENT_HANDLER_CHILD, destination: EVENT_HANDLER_ROOT }),
    custom: (tag: string)=> new EventHandlerAdapter({ listen: tag, destination: tag }),
};

