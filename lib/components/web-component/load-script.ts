import { BehaviorSubject, Observable } from "rxjs";
import { LoadScript } from "./interface";
import { BasicElement, ElementDescription, StatusElement } from "../../interfaces/global-element";
import { CreateScript } from "./create-script";

export class LoadScripts implements LoadScript {

    public allScripts: Array<BasicElement> = [];
    private statusScripts: BehaviorSubject<any> = new BehaviorSubject(null);

    private buildScript(element: ElementDescription) {
        const script = new CreateScript();
        script.build(element).then((data: StatusElement) => {
            this.allScripts.push({ name: data.name, element: data.element });
        }).catch( e => this.statusScripts.next(e));
    }

    public getStatusStatusScripts(): Observable<StatusElement> {
        return this.statusScripts.asObservable();
    }

    public import(microComponent: Array<ElementDescription> = []): void {
        microComponent.forEach((element: ElementDescription) => this.buildScript(element));
    }

    public deleteAllScript(): void {
        this.allScripts.forEach(( { element } : BasicElement)=>  element.remove());
    }

    public removeOneScript(name: string): void {
        this.allScripts.filter( (component: BasicElement, index: number) =>  component.name === name)
            .forEach( ( { element } : BasicElement)=>  element.remove());
    }

}
