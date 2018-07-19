const mongoose  = require('mongoose'),
      Schema    = mongoose.Schema;

//Email regex validator
const emailValidator = (email) =>
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);


const EventSchema = new Schema({
   firstName: {type: String, required: true},
   lastName: {type: String, required: true},
   email: {
       type: String,
       required: true,
       validate: {
           validator: emailValidator,
           message: "Please insert the correct email"
       }
   },
   date: { type: Date, required: true }
});

module.exports = mongoose.model('event', EventSchema);