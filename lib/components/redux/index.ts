import { BehaviorSubject, Observable } from "rxjs";
import { STORE_GLOBAL, STORE_ROOT } from "../../constants";
import { filter, map } from "rxjs/operators";
import { isNullOrUndefined } from "../../utils";

class Store {

    private store: BehaviorSubject<any> = new BehaviorSubject(null);
    private conf = {  listen: '', destination: ''  };

    constructor( location: any ) {
        this.conf = location;
        this.initListener();
    }

    private get getState() {
        return this.store.asObservable().pipe(
            filter((e: CustomEvent) => !isNullOrUndefined(e)),
            map(({detail}: CustomEvent) => detail)
        );
    }

    private initListener() {
        document.addEventListener(this.conf.listen,(e: Event) =>
            this.store.next( e ));
    }

    public dispatch( state: any ): void {
        const data = { stateApp: state };
        const event = new CustomEvent(this.conf.destination, { detail: data });
        document.dispatchEvent(event);
    }

    public on(): Observable<{ stateApp: any }> {
        return this.getState;
    }

    public onPromise(): Promise<any> {
        return new Promise<any>( ((resolve, reject) => {
           this.getState.subscribe( ()=> resolve(), err => reject(err) )
        }))
    }
}


export const StoreAdapter = {
    root: new Store({ listen: STORE_ROOT, destination: STORE_GLOBAL }),
    child: new Store({ listen: STORE_GLOBAL, destination: STORE_ROOT }),
};

