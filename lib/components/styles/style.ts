import { BehaviorSubject, Observable } from "rxjs";
import { Styles } from "./interface";
import { BasicElement, ElementDescription, StatusElement } from "../../interfaces/global-element";
import { CreateStyleHelper } from "../../helpers/create-style.helper";

export class Style implements Styles {

    public allStyles: Array<BasicElement> = [];
    private statusStyles: BehaviorSubject<any> = new BehaviorSubject(null);

    public getStatusStyles(): Observable<StatusElement> {
        return this.statusStyles.asObservable();
    }

    private createLink(name: string, src: string): void {
        const style = new CreateStyleHelper();
        style.createLink(name, src).then( ( status : StatusElement) => {
            this.statusStyles.next(status);
            this.allStyles.push(({name: status.name, element: status.element}));
        }).catch((e)=> this.statusStyles.next(e))
    }

    private createSource(name: string, src: string): void {
        const style = new CreateStyleHelper();
        style.sourceServices(src).then( ( res : any) => {
            style.build( name, res.data ).then((status: StatusElement) => {
                this.statusStyles.next(status);
                this.allStyles.push({name: status.name, element: status.element});
            }).catch( e => this.statusStyles.next(e));
        })
    }

    public loadCdn(styles: Array<ElementDescription> = []): void {
        styles.forEach(({ name, src }) => this.createLink(name, src));
    }

    public loadSource(styles: Array<ElementDescription> = []): void {
        styles.forEach(({ name, src }) => this.createSource(name, src));
    }

    public removeOneStyle(name: string): void {
        this.allStyles.filter( (component: BasicElement) =>  component.name === name)
            .forEach( ( { element } : BasicElement)=>  element.remove());
    }

    public allRemoveStyles(): void {
        this.allStyles.forEach(( { element } : BasicElement)=> element.remove());
    }
}
