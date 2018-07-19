import chai from 'chai';
import {shallow, mount} from 'enzyme';
import React from 'react';
import {App} from './App.jsx';
import jsdomGlobal from 'jsdom-global';

jsdomGlobal();
const should = chai.should();

describe('App component tests', function () {

    it('Should have a loading component', function (done) {
        const wrapper = shallow(<App loading={true}/>);
        wrapper.find('Loading').length.should.eql(1);
        done();
    });

    it('Should not have a loading component', function (done) {
        const wrapper = shallow(<App loading={false}/>);
        wrapper.find('Loading').length.should.eql(0);
        done();
    })

});
