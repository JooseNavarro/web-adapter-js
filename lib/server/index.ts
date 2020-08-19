import Axios, { AxiosResponse } from "axios";

export class ServerSideRender {

    public getStaticSite(src: string, config?: {}): Promise<AxiosResponse> {
        return Axios.get(src, config);
    }
}
