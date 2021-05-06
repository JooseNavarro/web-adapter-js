export const timeOut = (done: any) => {
    setTimeout(() => {
        expect(true).toBe(true);
        done();
    }, 500)
};
