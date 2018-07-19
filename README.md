## Brainhub recruitment task

Server files are available in this directory, react app is in ./app directory.
___

**[Available on heroku](https://elegant-croissant-38627.herokuapp.com/)**

___
**To run locally**

	$ git clone https://github.com/Getriax/Brainhub-task.git
	$ npm install
	$ npm start

**To test server**
	
	$ npm run test:node

**To test react app**

	$ npm run test:app
---
In **.env** file you can specify your own database url (mongoDB)

## API
> **base url**: /api/v1/
___
To create an event
**POST** 
> /api/v1/event

### Fields:
* firstName - *String* - **required**
* lastName - *String* - **required**
* email - *String* - **required & validated**
* date - *String|Date* - **required**

### Returns:

	{
		firstName: 'inserted first name'
		lastName: 'inserted last name'
		email: 'inserted email'
		date: 'inserted date'
	}
