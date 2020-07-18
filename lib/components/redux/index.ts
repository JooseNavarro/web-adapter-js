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

    private initListener() {
        document.addEventListener(this.conf.listen,(e: Event) =>
            this.store.next( e ));
    }

    get getState() {
        return this.store.asObservable().pipe(
            filter((e: CustomEvent) => !isNullOrUndefined(e)),
            map(({detail}: CustomEvent) => detail),
        );
    }

    dispatch( state: any ): void {
        const data = { stateApp: state };
        const event = new CustomEvent(this.conf.destination, { detail: data });
        document.dispatchEvent(event);
    }

    on(): Observable<{ stateApp: any }> {
        return this.getState;
    }

    onPromise(): Promise<any> {
        return new Promise<any>( ((resolve, reject) => {
            this.getState.subscribe( ()=> resolve(), err => reject(err) )
        }))
    }
}

const Global = {
    root: new Store({ listen: STORE_ROOT, destination: STORE_GLOBAL }),
    child: new Store({ listen: STORE_GLOBAL, destination: STORE_ROOT }),
};

export default Global;

