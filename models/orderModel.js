const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  totalAmount: Number,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  purchasedOn: {
    type: Date,
    default: Date.now(),
  },
});

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
