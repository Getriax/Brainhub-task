import chai from 'chai';
import {shallow, mount} from 'enzyme';
import React from 'react';
import { EventsPage } from './EventsPage.jsx';
import jsdomGlobal from 'jsdom-global';

jsdomGlobal();
const should = chai.should();

describe('Events page', function () {

    it('Should have a event with default values', function (done) {
        const wrapper = shallow(<EventsPage/>);
        let {firstName, lastName, email, date} = wrapper.state().event;
        wrapper.state().errors.should.not.be.null;
        firstName.should.eql('');
        lastName.should.eql('');
        email.should.eql('');
        let currentDate = new Date(Date.now());
        date.getDate().should.eql(currentDate.getDate());
        date.getMonth().should.eql(currentDate.getMonth());
        date.getFullYear().should.eql(currentDate.getFullYear());
        done();
    });

    it('Should add errors to the state when event with incorrect data is being saved', function (done) {
        const wrapper = mount(<EventsPage/>);
        let answer = wrapper.instance().eventFormIsValid();
        answer.should.be.false;
        let { firstName, lastName, email, date }  = wrapper.state().errors;
        firstName.should.eql('is required');
        lastName.should.eql('is required');
        email.should.eql('incorrect email');
        date.should.eql('should be in the future');
        done();
    });

    it('Should not have errors when correct data is being saved', function (done) {
        const wrapper = mount(<EventsPage/>);
        let event = {
            firstName: 'letters',
            lastName: 'letters',
            email: 'example@example.com',
            date: new Date(Date.now() + 100000)
        };
        wrapper.setState({
            event
        });
        let answer = wrapper.instance().eventFormIsValid();
        answer.should.be.true;
        wrapper.state().errors.should.eql({});
        done();
    });

});

describe('Events form', function () {
   it('Should fire a save event function on click and return errors', function (done) {
       const wrapper = mount(<EventsPage/>);
       let saveButton = wrapper.find('.submit').first();
       saveButton.prop('icon').should.eql('check-circle');
       saveButton.simulate('click');

       wrapper.state().errors.firstName.should.eql('is required');
       done();
   });

   it('Should reset errors and fields on click', function (done) {
       const wrapper = mount(<EventsPage/>);
       let resetButton = wrapper.find('.ban').first();
       resetButton.prop('icon').should.eql('ban');

       let event = Object.assign({}, wrapper.state().event);
       let errors = Object.assign({}, wrapper.state().errors);

       event.firstName.should.eql('');
       errors.should.eql({});

       event.firstName = 'Some value';
       errors.firstName = 'Error';

       wrapper.setState({
           event,
           errors
       });

       wrapper.state().event.firstName.should.eql('Some value');
       wrapper.state().errors.firstName.should.eql('Error');

       resetButton.simulate('click');

       wrapper.state().event.firstName.should.eql('');
       wrapper.state().errors.should.eql({});

       done();
   });
});