import Axios, { AxiosResponse } from 'axios';

export class AdapterServices {

    public textContent(src: string, config?: {}): Promise<AxiosResponse> {
       return Axios.get(src, config);
    }
}
