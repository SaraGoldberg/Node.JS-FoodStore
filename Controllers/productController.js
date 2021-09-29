var ProductModel = require('../models/ProductModel.js');

/**
 * ProductController.js
 *
 * @description :: Server-side logic for managing Products.
 */
module.exports = {

    async getProductByCategory(req, res) {
        const cId = req.params.CategoryId;
        let products = await ProductModel.find({ categoryId: cId})
        
        res.send(products);
      },

    /**
     * ProductController.list()
     */
    list: function (req, res) {
        ProductModel.find(function (err, Products) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }

            return res.json(Products);
        });
    },

    /**
     * ProductController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        ProductModel.findOne({ _id: id }, function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product.',
                    error: err
                });
            }

            if (!Product) {
                return res.status(404).json({
                    message: 'No such Product'
                });
            }

            return res.json(Product);
        });
    },

    /**
     * ProductController.create()
     */
    create: function (req, res) {
        var Product = new ProductModel({
            name: req.body.name,
            categoryId: req.body.categoryId,
            price: req.body.price,
            desc: req.body.desc,
            image: req.body.image
        });

        Product.save(function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Product',
                    error: err
                });
            }

            return res.status(201).json(Product);
        });
    },

    /**
     * ProductController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ProductModel.findOne({ _id: id }, function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Product',
                    error: err
                });
            }

            if (!Product) {
                return res.status(404).json({
                    message: 'No such Product'
                });
            }

            Product.name = req.body.name ? req.body.name : Product.name;
            Product.categoryId = req.body.categoryId ? req.body.categoryId : Product.categoryId;
            Product.price = req.body.price ? req.body.price : Product.price;
            Product.desc = req.body.desc ? req.body.desc : Product.desc;
            Product.image = req.body.image ? req.body.image : Product.image;

            Product.save(function (err, Product) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Product.',
                        error: err
                    });
                }

                return res.json(Product);
            });
        });
    },

    /**
     * ProductController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ProductModel.findByIdAndRemove(id, function (err, Product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Product.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
