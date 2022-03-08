const { Router } = require('express');
const ListItem = require('../../models/listThing')
const router = Router();

router.get('/', async (req, res) => {
    try {
        const thingListItems = await ListItem.find();
        if(!thingListItems) throw new Error('Nothing to show');
        const sortedThings = thingListItems.sort((a,b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        })
        res.status(200).json(sortedThings);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})
router.get('/singleThing/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const thingListItems = await ListItem.findById(id, req.body);
        if(!thingListItems) throw new Error('Nothing to show');
        
        res.status(200).json(thingListItems);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})
router.post('/', async (req, res) => {
    const newListItem = new ListItem(req.body);
    try {
        const taskListItem = await newListItem.save() 
        if(!taskListItem) throw new Error('Something went wrong!');
        res.status(200).json(taskListItem);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await ListItem.findByIdAndUpdate(id, req.body);
        if(!response) throw Error('Something went wrong');
        const updated = { ...response._doc, ...req.body };
        res.status(200).json(updated);
        console.log(updated);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.put('/flag/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await ListItem.findByIdAndUpdate(id, req.body);
        if(!response) throw Error('Something went wrong');
        const updated = { ...response._doc, ...req.body };
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const removedItem = await ListItem.findByIdAndDelete(id)
        if(!removedItem) throw Error('Something went wrong!')
        res.status(200).json(removedItem);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;
