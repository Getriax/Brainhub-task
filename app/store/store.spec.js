import configStore from './configureStore';
import chai from 'chai';
import * as eventAction from  '../actions/eventActions';

chai.should();

describe('Store tests', function () {
   it('Should dispatch a create event action, and add that event to the state', function (done) {
        const store = configStore();
        const event = {
            firstName: 'name'
        };

        const action = eventAction.createEventSuccess(event);
        store.dispatch(action);

        const actual = store.getState().events[0];
        actual.should.eql(event);
        done();
   });
});