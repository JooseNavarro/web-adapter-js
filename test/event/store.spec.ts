import { EventHandler } from "../../lib/components/event-handler";
import { EVENT_HANDLER_CHILD, EVENT_HANDLER_ROOT } from "../../lib/constants";
import { timeOut } from "../util";
import {first} from "rxjs/operators";

describe('Event Handler', () => {

    const eventRoot = EventHandler.root();
    const eventChild = EventHandler.child();
    const eventCustom = EventHandler.custom('[GLOBAL]');
    const mock = { name: 'Web adapter' };

    it('Type Root',() =>
        expect(eventRoot.conf).toEqual({ listen: EVENT_HANDLER_ROOT, destination: EVENT_HANDLER_CHILD }));

    it('Type Child',() =>
        expect(eventChild.conf).toEqual({ listen: EVENT_HANDLER_CHILD, destination: EVENT_HANDLER_ROOT }));

    it('[Dispatch - Observable] Sending data to child',(done) => {

        eventRoot.dispatch(mock, '[ROOT_CHILD]');

        eventChild.on('[ROOT_CHILD]').subscribe(({ stateApp: { name } }) => {
            expect(name).toEqual(mock.name);
            done();
        })
    });

    it('[Dispatch - Observable] Sending data to child - NO FOUND',(done) => {

        eventRoot.dispatch({  }, '[ROOT_CHILDS]');

        eventChild.on('[NO_FOUND]')
            .subscribe(() => expect(true).toBe(true));
        timeOut(done);
    });

    it('[Dispatch - Callback] Sending data to child',(done) => {

        eventRoot.dispatch(mock, '[CHILD]');

        eventChild.onChanges(({ stateApp: { name } }) => {
            expect(name).toEqual(mock.name);
            done();
        }, '[CHILD]');
    });

    it('[Dispatch - Callback] Sending data to child - NO FOUND',(done) => {

        eventRoot.dispatch(mock);

        eventChild.onChanges(({ stateApp: { name } }) => {
            expect(name).toEqual(mock.name);
            done();
        });

        timeOut(done);
    });

    it('[Dispatch - Observable] sending data to root',(done) => {

        eventChild.dispatch(mock);

        eventRoot.on().subscribe(({ stateApp: { name } }) => {
            expect(name).toEqual(mock.name);
            done();
        })
    });

    it('[Dispatch - Callback] sending data to root - NO FOUND',(done) => {

        eventChild.dispatch(mock);
        eventRoot.onChanges( ({ stateApp: { name } }) => expect(name).toEqual(mock.name), '[ROOT]');

        timeOut(done);
    });

    it('[Dispatch - Callback] sending data to root',(done) => {

        eventChild.dispatch(mock, '[ROOT]');

        eventRoot.onChanges( ({ stateApp: { name } }) => {
            expect(name).toEqual(mock.name);
            done();
        }, '[ROOT]');
    });


    it('[Dispatch - Observable] Custom Event',async (done) => {

        eventCustom.dispatch(mock, '[eventCustom]');

        const { stateApp: { name } }  = await eventCustom.on('[eventCustom]')
            .pipe(first()).toPromise();
        expect(`${name}`).toEqual(mock.name);
        done();

    });

    it('[Dispatch - Observable] Custom - NO FOUND Action',async (done) => {

        eventCustom.dispatch(mock, '[NO_FOUND]');

        const { stateApp: { name } }  = await eventCustom.on()
            .pipe(first()).toPromise();
        expect(`${name}`).toEqual(mock.name);
        timeOut(done);
    });

    it('[Dispatch - Callback -Custom] sending data to root - NO FOUND',(done) => {

        eventCustom.dispatch(mock);
        eventCustom.onChanges( ({ stateApp: { name } }) => expect(name).toEqual(mock.name), '[ROOT]');

        timeOut(done);
    });

    it('[Dispatch - Callback - Custom] sending data to root',(done) => {

        eventCustom.dispatch(mock, '[ROOT]');

        eventCustom.onChanges( ({ stateApp: { name } }) => {
            expect(name).toEqual(mock.name);
            done();
        }, '[ROOT]');
    });


});
