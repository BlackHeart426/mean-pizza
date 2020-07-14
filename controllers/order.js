const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')
const bcrypt = require('bcryptjs')

// (get) localhost:5000/api/order?offset=2&limit=5
module.exports.getAll = async function(req, res) {
  const query = {
    user: req.user.id
  }

  // Дата старта
  if (req.query.start) {
    query.date = {
      // Больше или равно
      $gte: req.query.start
    }
  }

  if (req.query.end) {
    if (!query.date) {
      query.date = {}
    }

    query.date['$lte'] = req.query.end
  }

  if (req.query.order) {
    query.order = +req.query.order
  }

  try {
    const orders = await Order
      .find(query)
      .sort({date: -1})
      .skip(+req.query.offset)
      .limit(+req.query.limit)

    res.status(200).json(orders)

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = function(req, res) {
  try {

    // const salt = bcrypt.genSaltSync(10)
    let user = '5f058217c394ed38981b855c'
    let orderClient = 1
    if (req.user) {
      const lastOrder = Order
          .findOne({user: req.user.id})
          .sort({date: -1})

      const maxOrder = lastOrder ? lastOrder.order : 0
      orderClient = maxOrder + 1
      user = req.user.id
    }
      const order = new Order({
        list: req.body.list,
        user: user,
        order: orderClient
      }).save()


    res.status(201).json(order)
  } catch (e) {
    errorHandler(res, e)
  }
}
