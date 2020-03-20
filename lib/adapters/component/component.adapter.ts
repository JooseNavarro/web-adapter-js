import { BasicElement, ElementDescription, StatusElement } from "../../interfaces";
import { BehaviorSubject, Observable } from "rxjs";
import { CreateScript } from "./create-script";

export class ComponentAdapter {

    public allComponent: Array<BasicElement> = [];
    private statusComponent: BehaviorSubject<any> = new BehaviorSubject(null);

    public getStatusComponent(): Observable<StatusElement> {
        return this.statusComponent.asObservable();
    }

    public loadComponents(microComponent: Array<ElementDescription> = []) {
        microComponent.forEach(({ name, src }) => this.createScript(name, src));
    }

    public allRemoveComponent(): void {
        this.allComponent.forEach(( { element } : BasicElement)=>  element.remove());
    }

    public removeOneComponent(name: string): void {
        this.allComponent.filter( (component: BasicElement, index: number) =>  component.name === name)
            .forEach( ( { element } : BasicElement)=>  element.remove());
    }

    public createScript( name: string, src: string): void {
        const script = new CreateScript();
        script.build( name, src ).then((data: StatusElement) => {
            this.statusComponent.next(data);
            this.allComponent.push({name: data.name, element: data.element});
        }).catch( e => this.statusComponent.next(e));
    }
}
