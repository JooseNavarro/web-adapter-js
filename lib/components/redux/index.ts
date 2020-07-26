import { BehaviorSubject, Observable } from "rxjs";
import { STORE_GLOBAL, STORE_ROOT } from "../../constants";
import { filter, map } from "rxjs/operators";
import { isNullOrUndefined } from "../../utils";
import { StateApp, StoreInterface } from "./interfece";
import { atDocument } from "../../utils/dom";

class Store implements StoreInterface {

    private store: BehaviorSubject<any> = new BehaviorSubject(null);
    private conf = {  listen: '', destination: ''  };

    constructor( location: any ) {
        this.conf = location;
        this.main();
    }

    private state(): Observable<StateApp> {
        return this.store.asObservable().pipe(
            filter((e: CustomEvent) => !isNullOrUndefined(e)),
            map(({ detail }: CustomEvent) => detail)
        );
    }

    private main(): void {
        atDocument().addEventListener(this.conf.listen,(e: Event) =>
            this.store.next( e ));
    }

    public dispatch( state: any ): void {
        const data = { stateApp: state };
        const event = new CustomEvent(this.conf.destination, { detail: data });
        atDocument().dispatchEvent(event);
    }

    public on(): Observable<StateApp> {
        return this.state();
    }

    public onPromise(): Promise<StateApp> {
        return new Promise<any>( ((resolve, reject) => {
           this.state().subscribe( ()=> resolve(), err => reject(err) )
        }))
    }
}

export const StoreAdapter = {
    root: new Store({ listen: STORE_ROOT, destination: STORE_GLOBAL }),
    child: new Store({ listen: STORE_GLOBAL, destination: STORE_ROOT }),
};

