const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1}) // descending
        .then(items => res.json(items))
});

// @route   POST api/items
// @desc    Create a item
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name // body-parser allows to do this
    });

    // Save newItem to database
    newItem.save().then(item => res.json(item));
});
// To test it with POSTMAN:
// 1.cange to POST, 2.add Header with Key: Content-Type and Value: application/json
// 3.go to Body -> select 'raw' and 'JSON(application/json) 4.put in JSON file: 
// {"name: "Milk}
// expect a 200 response along with the new item sent back

// @route   DELETE api/items/:id
// @desc    Create a item
// @access  Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;

