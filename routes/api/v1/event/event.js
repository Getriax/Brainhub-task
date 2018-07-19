const eventService = require('../../../../helpers/eventService');

class eventRouter {

    constructor(router) {

        router.get(
            '/',
            eventService.findAll.bind(this)
            );

        router.get(
            '/:id',
            eventService.findOne.bind(this)
            );

        router.post(
            '/',
            eventService.create.bind(this)
        );

        router.put(
            '/:id',
            eventService.update.bind(this)
        );

        router.delete(
            '/:id',
            eventService.remove.bind(this)
        )

    }
}

module.exports = eventRouter;