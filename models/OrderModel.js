var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var orderItemSchema = new Schema({
// 	'productId' : {
// 	 	type: Schema.Types.ObjectId,
// 	 	ref: 'product'
// 	},
// 	'quantity' : Number
// });

var OrderSchema = new Schema({
	'date': Date,
	'sum': Number,
	'userId': {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
	// ,
	// 'products': [orderItemSchema]
	// [
	// 	{
	// 		type: Schema.Types.ObjectId,
	// 		ref: 'orderItem'
	// 	}
	// ]
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
