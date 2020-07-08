const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getByCategoryId = async function(req, res) {
  try {
    const positions = await Position.find({
      category: req.params.categoryId,
      user: req.user.id
    })
    res.status(200).json(positions)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {
  try {
    const position = await new Position({
      name: req.body.name,
      subtitle: req.body.subtitle,
      description: req.body.description,
      sale: req.body.sale,
      cost: req.body.cost,
      category: req.body.category,
      user: req.user.id,
      imageSrc: req.file ? req.file.path : ''
    }).save()
    res.status(201).json(position)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function(req, res) {
  try {
    await Position.remove({_id: req.params.id})
    res.status(200).json({
      message: 'Позиция была удалена.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function(req, res) {
  console.log(req.file.path)
  const updated = {
    name: req.body.name,
    description: req.body.description,
    subtitle: req.body.subtitle,
    sale: req.body.sale,
    cost: req.body.cost,
  }

  if (req.file) {
    updated.imageSrc = req.file.path
  }
  try {
    const position = await Position.findOneAndUpdate(
      {_id: req.params.id},
      {$set: updated},
      {new: true}
    )
    res.status(200).json(position)
  } catch (e) {
    errorHandler(res, e)
  }
}
