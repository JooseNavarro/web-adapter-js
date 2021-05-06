
class AdapterServices {

    public textContent(src: string, config?: {}): Promise<any> {
       return fetch(src, config);
    }
}

export default AdapterServices;
