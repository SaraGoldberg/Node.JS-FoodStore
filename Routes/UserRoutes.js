var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController.js');

/*
 * GET
 */
router.get('/', UserController.list);

/*
 * GET
 */
router.get('/length',UserController.getSameLengthUser);

/*
 * GET
 */
router.get('/:email/:password', UserController.show);

/*
 * GET
 */
router.get('/:id',UserController.getUserOrders);




/*
 * POST
 */
router.post('/', UserController.create);

/*
 * PUT
 */
router.put('/:id', UserController.update);

/*
 * DELETE
 */
router.delete('/:id', UserController.remove);

module.exports = router;
