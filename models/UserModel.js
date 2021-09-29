var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	'firstName': String,
	'lastName': String,
	'email': String,
	'password': String,
	lastEntranceDate: Date
}, { timestamps: true })

UserSchema.virtual('userOrders', {
	ref: 'Order',
	localField: '_id',
	foreignField: 'userId',
});

UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', UserSchema);