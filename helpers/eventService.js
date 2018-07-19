const Event     = require('../models/event'),
      mongoose  = require('mongoose');

class eventService {

    static create(req, res) {

        const eventBody = req.body;

        //Check if all required fields are specified
        if(!('firstName' in eventBody && 'lastName' in eventBody && 'email' in eventBody && 'date' in eventBody))
            return logError(undefined , res, 'Fields [firstName, lastName, email, date] are required', 422);

        //validate email
        if(!isEmail(eventBody.email))
            return logError(undefined, res, 'Please insert correct email', 403);

        Event.create(eventBody)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(error => {
                logError(error, res, 'Failed saving event');
            });
    }

    static findAll(req, res) {

        Event.find((error, data) => {
            if(error)
                return logError(error, res, 'Cannot fetch events');

            if(!data)
                return notFound(res, 'No events found');

            res.status(200).json(data);


        });

    }

    static findOne(req, res) {

        const id = getID(req.params.id);

        if(!id)
            return logError(undefined, res, 'Provided id is not a valid one', 403);

        Event.findById(id, (error, data) => {

            if(error)
                return logError(error, res, 'Could not find the event with id: ' + id);

            if(!data)
                return notFound(res, `Event with id: ${id} does not exist`);

            res.status(200).json(data);
        });

    }

    static update(req, res) {
        let id = getID(req.params.id);
        const updateBody = req.body;

        if(!id)
            return logError(undefined, res, 'Provided id is not a valid one', 403);

        const options = {
            runValidators: true,
            new: true
        };

        if('email' in updateBody && !isEmail(updateBody.email))
            return logError(undefined, res, 'Please insert correct email', 403);


        Event.findByIdAndUpdate(id, updateBody, options, (error, data) => {
            if(error)
                return logError(error, res, 'Could not update event with id: ' + id);
            if(!data)
                return notFound(res, `Event with id: ${id} does not exist`);

            res.status(200).json(data);
        });
    }

    static remove(req, res) {

        const id = getID(req.params.id);

        if(!id)
            return logError(undefined, res, 'Provided id is not a valid one', 403);

        Event.findByIdAndRemove(id, (error, data) => {
            if(error)
                return logError(error, res, `Could not remove event with id: ${id}`);
            if(!data)
                return notFound(res, `Event with id: ${id} does not exist`);

            res.status(200).json({message: `Event with id: ${data._id} removed`});
        });
    }

}

const logError = (error = 'Error: ', res, msg, status = 500) => {
    console.error(msg, ' ', error);
    res.status(status).json({error: msg});
};

const notFound = (res, msg) => {
    res.status(404).json({message: msg});
};

const isEmail = (email) => {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};

const getID = (id) => {

    try {
        return new mongoose.Types.ObjectId(id);
    } catch(error) {
        return false;
    }

};

module.exports = eventService;