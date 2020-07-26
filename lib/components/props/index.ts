import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { WindowAdapter, WindowInterface } from "../../utils/window";
import { PropsInterface } from "./interface";
import { atWindow } from "../../utils/dom";
import { isNullOrUndefined } from "../../utils";

export class Props implements PropsInterface {

    public windowAdapter = new WindowAdapter();

    public on(name: string): Observable<any> {
        return this.windowAdapter.getProperty().pipe(
            map(({ props }: WindowInterface) => props[name])
        );
    }

    public find(property: string): { [key: string]: any } {
        const { webAdapter } = atWindow();
        return !isNullOrUndefined(webAdapter) ? webAdapter['props'][property] : { };
    }
}
