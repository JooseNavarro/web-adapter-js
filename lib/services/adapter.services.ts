import Axios, { AxiosResponse } from 'axios';

class AdapterServices {

    public textContent(src: string, config?: {}): Promise<AxiosResponse> {
       return Axios.get(src, config);
    }
}

export default AdapterServices;
