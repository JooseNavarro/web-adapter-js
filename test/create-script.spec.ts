import { CreateScript } from "../lib/components/web-component/create-script";

describe('Create component', () => {

    test('new component', async () => {
        const { status, element } =  await new CreateScript().build({ name: 'component', src: '' });
        expect(status).toEqual(true);

    }, 4000);

});
