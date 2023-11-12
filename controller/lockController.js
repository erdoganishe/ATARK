const Lock = require('../model/Lock');
const User = require('../model/User');

const getAllLocks = async (req, res) => {
    const lock = await Lock.find();
    if (!lock) return res.sendStatus(204).json({ 'message': 'No locks at all!' });
    res.json(lock)
}

const getUserLocks = async (req, res) => {
    if(!req?.user) return res.status(400).json({ 'message': 'User ID required' });
    const user = await User.findById(!req?.user);
    const uId = user.id;

    const locks = await Lock.find({uId: uId}).exec();

    if(!locks) return res.status(204).json({ "message": `No locks with user ${req.user}.` });

    res.send(locks);
}

const createNewLock = async (req, res) => {
    if(!req?.body?.uId) return res.sendStatus(400).json({ 'message': 'UId are required!' });
    if(!req?.body?.name) return res.sendStatus(400).json({ 'message': 'Name are required!' });
    if(!req?.body?.adress) return res.sendStatus(400).json({ 'message': 'Adress are required!' });
    if(!req?.body?.pKey) return res.sendStatus(400).json({ 'message': 'Produkt key are required!' });

    try { 
        const result = await Lock.create({
            uId: req.body.uId,
            productKey: req.body.pKey,
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

    const lock = await Lock.findById(req.bpdy.id).exec();
    if(!lock) res.status(204).json({ "message": `No lock with ID ${req.body.id}.` });

    if(req.body?.name) lock.name = req.body.name;
    if(req.body?.adress) lock.adress = req.body.adress;

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

module.exports = {
    getAllLocks,
    getUserLock,
    createNewLock,
    updateLock,
    getLockbyId
}