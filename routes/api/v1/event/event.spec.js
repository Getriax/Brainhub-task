const chai     = require('chai'),
    mongoose   = require('mongoose'),
    chaiHttp   = require('chai-http'),
    chaiDate   = require('chai-datetime'),
    should     = chai.should(),
    testId     = new require('mongoose').Types.ObjectId(),
    eventUrl   = '/api/v1/event/';
    app        = require('../../../../server');

chai.use(chaiHttp);
chai.use(chaiDate);

describe('POST event /', function () {

    it('Should return error asking for the empty but required fields', function (done) {

        let sampleEventWithNoField = {
            lastName: 'Test'
        };

        chai.request(app)
            .post(eventUrl)
            .send(sampleEventWithNoField)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.have.property('error').eql('Fields [firstName, lastName, email, date] are required');
                done();
            });
    });

    it('Should ask for the correct email', function (done) {

        let eventWithWrongEmail = {
            firstName: 'Test',
            lastName: 'Test',
            email: 'wrong email',
            date: new Date(2018, 10, 10)
        };

        chai.request(app)
            .post(eventUrl)
            .send(eventWithWrongEmail)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.have.property('error').eql('Please insert correct email');
                done();
            });

    });

    it('Should create the event with the id: ' + testId, function (done) {

        let correctEvent = {
            _id: testId,
            firstName: 'Test',
            lastName: 'Test',
            email: 'example@example.com',
            date: new Date(2018, 10, 10)
        };

        chai.request(app)
            .post(eventUrl)
            .send(correctEvent)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('_id').eql(testId.toString());
                res.body.should.have.property('firstName').eql(correctEvent.firstName);
                res.body.should.have.property('lastName').eql(correctEvent.lastName);
                res.body.should.have.property('email').eql(correctEvent.email);
                res.body.should.have.property('date');
                new Date(res.body.date).should.equalDate(new Date(2018, 10, 10));
                done();
            });

    });


});

describe('GET event /', function () {

    it('Should return all the items in the event collection and contain the one with id ' + testId, function (done) {

        chai.request(app)
            .get(eventUrl)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('length').above(0);
                res.body[res.body.length - 1].should.have.property('_id').eql(testId.toString());
                done();
            });

    });

    it('Should find the object with id ' + testId, function (done) {

        chai.request(app)
            .get(eventUrl + testId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id').eql(testId.toString());
                done();
            });

    });

    it('Should return the error that event with that id is not valid', function (done) {

        const fakeId = '1234';

        chai.request(app)
            .get(eventUrl + fakeId)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('Provided id is not a valid one');
                done();
            });
    });

    it('Should return the message that the event with provided id does not exist', function (done) {

        const wrongId = new mongoose.Types.ObjectId();

        chai.request(app)
            .get(eventUrl + wrongId)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql(`Event with id: ${wrongId} does not exist`);
                done();
            });
    })

});

describe('Update event /', function () {

   it('Should update the event with the id: ' + testId, function (done) {

       const updateEvent = {
           firstName: 'Test2'
       };

       chai.request(app)
           .put(eventUrl + testId)
           .send(updateEvent)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('firstName').eql(updateEvent.firstName);
               res.body.should.have.property('_id').eql(testId.toString());
               done();
           });

   });

   it('Should ask for the correct email', function (done) {

       const updateEventWrongEmail = {
           email: 'Test2'
       };

       chai.request(app)
           .put(eventUrl + testId)
           .send(updateEventWrongEmail)
           .end((err, res) => {
               res.should.have.status(403);
               res.body.should.be.a('object');
               res.body.should.have.property('error').eql('Please insert correct email');
               done();
           });

   });

   it('Should return message that event with given id is not valid', function (done) {

       const fakeId = '1234';

       chai.request(app)
           .put(eventUrl + fakeId)
           .end((err, res) => {
               res.should.have.status(403);
               res.body.should.be.a('object');
               res.body.should.have.property('error').eql('Provided id is not a valid one');
               done();
           });

   });

    it('Should return message that event with given id does not exist', function (done) {

        const wrongId = new mongoose.Types.ObjectId();

        chai.request(app)
            .put(eventUrl + wrongId)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql(`Event with id: ${wrongId} does not exist`);
                done();
            });

    });

});

describe('Delete event /', function () {

    it('Should delete the event with the id: ' + testId, function (done) {
        chai.request(app)
            .delete(eventUrl + testId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql(`Event with id: ${testId} removed`);
                done();
            });
    });

    it('Should return message that event with given id is not valid', function (done) {

        const fakeId = '1234';

        chai.request(app)
            .delete(eventUrl + fakeId)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('Provided id is not a valid one');
                done();
            });

    });

    it('Should return message that event with given id does not exist', function (done) {

        const wrongId = new mongoose.Types.ObjectId();

        chai.request(app)
            .delete(eventUrl + wrongId)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql(`Event with id: ${wrongId} does not exist`);
                done();
            });

    });

});