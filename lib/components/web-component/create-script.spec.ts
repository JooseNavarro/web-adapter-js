import { CreateScript } from "./create-script";

describe('Create component', () => {

    test('new component', async () => {
        const script =  await new CreateScript().build({ name: 'component', src: 'localhost:8080' });
        expect(script).toEqual({});
    }, 4000);

});

