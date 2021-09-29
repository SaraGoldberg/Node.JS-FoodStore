var OrderitemModel = require('../models/orderItemModel.js');

/**
 * orderItemController.js
 *
 * @description :: Server-side logic for managing orderItems.
 */
module.exports = {

    /**
     * orderItemController.list()
     */
    list: function (req, res) {
        OrderitemModel.find(function (err, orderItems) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting orderItem.',
                    error: err
                });
            }

            return res.json(orderItems);
        });
    },

    /**
     * orderItemController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        OrderitemModel.findOne({_id: id}, function (err, orderItem) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting orderItem.',
                    error: err
                });
            }

            if (!orderItem) {
                return res.status(404).json({
                    message: 'No such orderItem'
                });
            }

            return res.json(orderItem);
        });
    },

    /**
     * orderItemController.create()
     */
    create: function (req, res) {
        var orderItem = new OrderitemModel({
			productId : req.body.productId,
			orderId : req.body.orderId,
			quantity : req.body.quantity
        });

        orderItem.save(function (err, orderItem) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating orderItem',
                    error: err
                });
            }

            return res.status(201).json(orderItem);
        });
    },

    /**
     * orderItemController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        OrderitemModel.findOne({_id: id}, function (err, orderItem) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting orderItem',
                    error: err
                });
            }

            if (!orderItem) {
                return res.status(404).json({
                    message: 'No such orderItem'
                });
            }

            orderItem.productId = req.body.productId ? req.body.productId : orderItem.productId;
			orderItem.orderId = req.body.orderId ? req.body.orderId : orderItem.orderId;
			orderItem.quantity = req.body.quantity ? req.body.quantity : orderItem.quantity;
			
            orderItem.save(function (err, orderItem) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating orderItem.',
                        error: err
                    });
                }

                return res.json(orderItem);
            });
        });
    },

    /**
     * orderItemController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        OrderitemModel.findByIdAndRemove(id, function (err, orderItem) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the orderItem.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
