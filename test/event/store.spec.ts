import { EventHandler } from "../../lib/components/event-handler/";
import { EVENT_HANDLER_CHILD, EVENT_HANDLER_ROOT } from "../../lib/constants";
import { timeOut } from "../util";

describe('Event Handler', () => {

    const eventRoot = EventHandler.root();
    const eventChild = EventHandler.child();
    const eventCustom = EventHandler.custom('[CUSTOM_EVENT]');
    const mock = { name: 'Web adapter' };

    it('Type Root',() =>
        expect(eventRoot.conf).toEqual({ listen: EVENT_HANDLER_ROOT, destination: EVENT_HANDLER_CHILD }));

    it('Type Child',() =>
        expect(eventChild.conf).toEqual({ listen: EVENT_HANDLER_CHILD, destination: EVENT_HANDLER_ROOT }));

    it('[Dispatch - Observable] Sending data to child',(done) => {

        eventCustom.dispatch(mock, '[KEY]');

        eventCustom.onChanges(({ name })=> {
            expect(name).toEqual(mock.name);
            done();
        }, '[KEY]')

    });

    it('[Dispatch - Callback] Sending data to child',(done) => {

        eventRoot.dispatch(mock, '[CHILD]');

        eventChild.onChanges(({ name }) => {
            expect(name).toEqual(mock.name);
            done();
        }, '[CHILD]');
    });

    it('[Dispatch - Callback] Sending data to child - NO FOUND',(done) => {

        eventRoot.dispatch(mock);

        eventChild.onChanges(({ name }) => {
            expect(name).toEqual(mock.name);
            done();
        });

        timeOut(done);
    });


    it('[Dispatch - Callback] sending data to root - NO FOUND',(done) => {

        eventChild.dispatch(mock);
        eventRoot.onChanges( ({ name }) => expect(name).toEqual(mock.name), '[ROOT]');

        timeOut(done);
    });

    it('[Dispatch - Callback] sending data to root',(done) => {

        eventChild.dispatch(mock, '[ROOT]');

        eventRoot.onChanges( ({ name }) => {
            expect(name).toEqual(mock.name);
            done();
        }, '[ROOT]');
    });

    it('[Dispatch - Callback -Custom] sending data to root - NO FOUND',(done) => {

        eventCustom.dispatch(mock);
        eventCustom.onChanges( ({ name }) => expect(name).toEqual(mock.name), '[ROOT]');

        timeOut(done);
    });

    it('[Dispatch - Callback - Custom] sending data to root',(done) => {

        eventCustom.dispatch(mock, '[ROOT]');

        eventCustom.onChanges( ({ name }) => {
            expect(name).toEqual(mock.name);
            done();
        }, '[ROOT]');
    });


});
