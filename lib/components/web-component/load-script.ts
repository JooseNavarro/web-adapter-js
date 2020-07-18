import {CreateScript} from "./create-script";
import {BasicElement, ElementDescription, StatusElement} from "../../interfaces";
import {BehaviorSubject, Observable} from "rxjs";


export class LoadScripts {


    public allScripts: Array<BasicElement> = [];
    private statusScripts: BehaviorSubject<any> = new BehaviorSubject(null);

    public getStatusStatusScripts(): Observable<StatusElement> {
        return this.statusScripts.asObservable();
    }

    public import(microComponent: Array<ElementDescription> = []) {
        microComponent.forEach((element: ElementDescription) => this.buildScript(element));
    }

    private buildScript(element: ElementDescription) {
        const script = new CreateScript();
        script.build(element).then((data: StatusElement) => {
            this.allScripts.push({ name: data.name, element: data.element });
        }).catch( e => this.statusScripts.next(e));
    }

    public deleteAllScript(): void {
        this.allScripts.forEach(( { element } : BasicElement)=>  element.remove());
    }

    public removeOneScript(name: string): void {
        this.allScripts.filter( (component: BasicElement, index: number) =>  component.name === name)
            .forEach( ( { element } : BasicElement)=>  element.remove());
    }

    public render(): void {

    }

}
