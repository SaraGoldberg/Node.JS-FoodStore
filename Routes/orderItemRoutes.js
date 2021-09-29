var express = require('express');
var router = express.Router();
var orderItemController = require('../controllers/orderItemController.js');

/*
 * GET
 */
router.get('/', orderItemController.list);

/*
 * GET
 */
router.get('/:id', orderItemController.show);

/*
 * POST
 */
router.post('/', orderItemController.create);

/*
 * PUT
 */
router.put('/:id', orderItemController.update);

/*
 * DELETE
 */
router.delete('/:id', orderItemController.remove);

module.exports = router;
