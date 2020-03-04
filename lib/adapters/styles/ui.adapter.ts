import { BehaviorSubject, Observable } from "rxjs";
import { AxiosResponse } from "axios";
import { BasicElement, ElementDescription, StatusElement } from "../../interfaces";
import { CreateStyle } from "./create-style";

export class UiAdapter {

    public allStyles: Array<BasicElement> = [];
    private statusStyles: BehaviorSubject<any> = new BehaviorSubject(null);

    public getStatusStyles(): Observable<StatusElement> {
        return this.statusStyles.asObservable();
    }

    public create(name: string, src: string): void {
        const style = new CreateStyle();
        style.sourceServices(src).then( ( res : AxiosResponse) => {
            style.build( name, res.data ).then((status: StatusElement) => {
                this.statusStyles.next(status);
                this.allStyles.push({name: status.name, element: status.element});
            }).catch( e => this.statusStyles.next(e));
        })
    }

    public createLink(name: string, src: string): void {
        const style = new CreateStyle();
        style.createLink(name, src).then( ( status : StatusElement) => {
            this.statusStyles.next(status);
            this.allStyles.push(({name: status.name, element: status.element}));
        }).catch((e)=> this.statusStyles.next(e))
    }

    public loadCdn(styles: Array<ElementDescription> = []) {
        styles.forEach(({ name, src }) => this.createLink(name, src));
    }

    public loadStyles(styles: Array<ElementDescription> = []) {
        styles.forEach(({ name, src }) => this.create(name, src));
    }

    public removeOneStyle(name: string): void {
        this.allStyles.filter( (component: BasicElement, index: number) =>  component.name === name)
            .forEach( ( { element } : BasicElement)=>  element.remove());
    }

    public allRemoveStyles(): void {
        this.allStyles.forEach(( { element } : BasicElement)=> element.remove());
    }
}
