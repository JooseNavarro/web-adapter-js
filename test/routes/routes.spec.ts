import {Routes} from "../../lib/components/routes";

describe('Routes', () => {

    const routes = new Routes();

    it('[Dispatch - Callback] Sending router',  (done) => {

        routes.emit('/user', {});

        routes.onChanges(({route}) => {
            expect(route).toEqual('/user');
            done();
        });
    });

    it('[Dispatch - Callback] Sending router options', (done) => {

        routes.emit('/status', { name: 'dodo', status: true} );

        routes.onChanges(({route, option: { name, status }}) => {
            expect(`${route}?name=${name}&status=${status}`).toEqual(`/status?name=dodo&status=true`);
            done();
        });
    });

});
