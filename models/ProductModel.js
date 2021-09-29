var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	'name': String,
	'categoryId': {
		type: Schema.Types.ObjectId,
		ref: 'category'
	},
	'price': Number,
	'desc': String,
	'image': String
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
