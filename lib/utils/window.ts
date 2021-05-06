import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { isNullOrUndefined } from "./index";
import { atWindow } from "./dom";

export interface WindowInterface {
    webComponents: Array<HTMLElement>;
    props: { [key: string]: any };
}

export class WindowAdapter {

    private statusWindow: BehaviorSubject<any> = new BehaviorSubject(null);

    private setWebAdapter(data: WindowInterface): void {
        atWindow()['webAdapter'] = data;
        this.statusWindow.next(data);
    }

    public getProperty(): Observable<any> {
        return this.statusWindow.asObservable().pipe(
            map(() =>  atWindow()['webAdapter'] ),
            filter((e) => !isNullOrUndefined(e))
        );
    }

    public setProps(key: string, value: any): void {
        const main: WindowInterface =  atWindow()['webAdapter'];
        const currentProps = { ...main, props: {...main.props, [ key ]: value} };
        this.setWebAdapter(currentProps);
    }

    public setWebComponent(webComponent: HTMLElement): void {
        const main: WindowInterface =  atWindow()['webAdapter'];
        const currentComponent = { ...main, webComponents: [...main.webComponents, webComponent] };
        this.setWebAdapter(currentComponent);
    }
}
