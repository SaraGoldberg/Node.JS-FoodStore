const OrderModel = require('../models/OrderModel.js');
var UserModel = require('../models/UserModel.js');

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {

    /**
     * UserController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            }

            return res.json(Users);
        });
    },

    /**
     * UserController.show()
     */
    show: function (req, res) {
        var email = req.params.email;
        var password = req.params.password;

        UserModel.findOne({ email: email, password: password }, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            }

            if (!User) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }

            return res.json(User);
        });
    },

    /**
     * UserController.create()
     */
    create: function (req, res) {
        var User = new UserModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });

        User.save(function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating User',
                    error: err
                });
            }

            return res.status(201).json(User);
        });
    },

    /**
     * UserController.update()
     */
    update: function (req, res) {
        // try {
        //     console.log(req.body);
        //     let user = new UserModel(req.body);
        //     user._id = req.params.id;
        //     let changedUser = await UserModel.findOneAndUpdate(user._id, user, { useFindAndModify: false });
        //     res.send(changedUser);
        // }
        // catch (err) {
        //     res.send(err);
        // }
        var id = req.params.id;

        UserModel.findOne({ _id: id }, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting User',
                    error: err
                });
            }

            if (!User) {
                return res.status(404).json({
                    message: 'No such User'
                });
            }

            User.firstName = req.body.firstName ? req.body.firstName : User.firstName;
            User.lastName = req.body.lastName ? req.body.lastName : User.lastName;
            User.email = req.body.email ? req.body.email : User.email;
            User.password = req.body.password ? req.body.password : User.password;

            User.save(function (err, User) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating User.',
                        error: err
                    });
                }

                return res.json(User);
            });
        });
    },

    /**
     * UserController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, User) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the User.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    async getUserOrders(req, res) {
        try {
            let data = await UserModel.findById(req.params.id).populate({ path: 'userOrders', select: 'orderSum' })//.exec();
            res.send(data);
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    },
    async getSameLengthUser(req, res) {
        try {
            let result = [];
            let user = await UserModel.find();
            user.forEach(element => {
                if (element.firstName.length === element.lastName.length)
                    result.push(element);
            });
            res.send(result);
        }
        catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
};
