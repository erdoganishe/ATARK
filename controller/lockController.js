const Lock = require('../model/Lock');
const User = require('../model/User');

const getAllLocks = async (req, res) => {
    const lock = await Lock.find();
    if (!lock) return res.sendStatus(204).json({ 'message': 'No locks at all!' });
    res.json(lock)
}

const getUserLocks = async (req, res) => {
     if(!req?.user) return res.status(400).json({ 'message': 'Username required' });
    const user = await User.findOne({"username": req.user});
    const uId = user.id;

     locks = await Lock.find({uId: uId}).exec();

    if(!locks) return res.status(204).json({ "message": `No locks with user ${req.user}.` });

    res.send(locks);
    //res.json({});
}

const createNewLock = async (req, res) => {
    console.log(req.body);
    if(!req?.body?.uId) return res.sendStatus(400).json({ 'message': 'UId are required!' });
    if(!req?.body?.name) return res.sendStatus(400).json({ 'message': 'Name are required!' });
    if(!req?.body?.adress) return res.sendStatus(400).json({ 'message': 'Adress are required!' });

    try { 
        const result = await Lock.create({
            uId: req.body.uId,
            adress: req.body.adress,
            name: req.body.name
        });

        res.status(201).json(result);

    } catch (err) {
        console.log(err);
    }
}

const updateLock = async (req, res) => {
    console.log(req.body);
    if(!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID is required!' });
    }

    const lock = await Lock.findById(req.body.id).exec();
    if(!lock) res.status(204).json({ "message": `No lock with ID ${req.body.id}.` });

    if(req.body?.name) lock.name = req.body.name;
    if(req.body?.adress) lock.adress = req.body.adress;
    if(req.body?.isAbleToChange) lock.isAbleToChange = req.body.isAbleToChange;

    const result = await lock.save();
    console.log(result);
    res.json(result);

}

const getLockbyId = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({ 'message': 'Lock ID required' });

    const lock = await Lock.findById(req.params.id);
    if(!lock) return res.status(204).json({ "message": `No lock with ID ${req.params.id}.` });

    res.json(lock._doc);
}

const getLockByUId = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({ 'message': 'Lock ID required' });

    const lock = await Lock.find({"uId": req.params.id});
    if(!lock) return res.status(204).json({ "message": `No lock with uId ${req.params.id}.` });

    res.json(lock);
}

const deleteLock = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'User ID required' });

    await Lock.deleteMany({_id: req.params.id});

    getAllLocks(req, res);
}

module.exports = {
    getAllLocks,
    getUserLocks,
    createNewLock,
    updateLock,
    getLockbyId,
    getLockByUId,
    deleteLock
}