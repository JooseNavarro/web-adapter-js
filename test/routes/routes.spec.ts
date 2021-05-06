import {Routes} from "../../lib/components/routes";
import { first } from "rxjs/operators";

describe('Routes', () => {

    const routes = new Routes();

    it('[Dispatch - Observable] Sending router', async (done) => {

        routes.emit('/login', {});

        const { route } = await routes.on().pipe(first())
            .toPromise();
        expect(route).toEqual('/login');
        done();
    });

    it('[Dispatch - Observable] Sending router options', async (done) => {

        routes.emit('/check', {name: 'dodo', status: true});

        const {route, option: {name, status}}  = await routes.on().pipe(first())
            .toPromise();
        expect(`${route}?name=${name}&status=${status}`).toEqual(`/check?name=dodo&status=true`);
        done();

    });

    it('[Dispatch - Callback] Sending router', (done) => {

        routes.emit('/user', {});

        routes.onChanges(({route}) => {
            if (route === '/user') {
                expect(route).toEqual('/user');
                done();
            }
        });
    });

    it('[Dispatch - Callback] Sending router options', (done) => {

        routes.emit('/status', {name: 'dodo', status: true});

        routes.onChanges(({route, option: {name, status}}) => {
            expect(`${route}?name=${name}&status=${status}`).toEqual(`/status?name=dodo&status=true`);
            done();
        });
    });


});
