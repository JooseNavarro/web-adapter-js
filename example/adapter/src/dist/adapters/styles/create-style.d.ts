import { AxiosResponse } from "axios";
import { StatusElement } from "../../interfaces";
export declare class CreateStyle {
    build(name: string, code: string): Promise<StatusElement>;
    createLink(name: string, href: string): Promise<StatusElement>;
    private appendChild;
    sourceServices(src: string): Promise<AxiosResponse>;
}
