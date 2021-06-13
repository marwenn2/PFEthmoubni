const router = require('express').Router();
let annonce = require('../models/annonce')
const auth = require('../middleware/auth');
const User= require('../models/usermodel')
const { check, validationResult } = require('express-validator')
///récuperer toutes les annonces de la base de données
router.get('/recupererannonce', (req, res) => {
    annonce.find()
        .then(annonces => res.json(annonces))
        .catch(err => res.status(400).json('Error: ' + err));
})




router.route('/').post([auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
       
        const newPost = new annonce({
            title: req.body.title,
            text: req.body.text,
            name: user.username,
            avatar: user.avatar,
            user: req.user.id
        })


        const post = await newPost.save();
        res.json(post);


    } catch (error) {
        console.error(error)
        res.status(500).send('server Error')
    }

})
router.route('/update/:id').put([auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await annonce.findById(req.params.id);
        const user1 = await User.findById(post.user);
       
if(user1.email==user.email)
{
    console.log("azeazeazeazeazeaze")
    post.title=req.body.title;
    post.text=req.body.text;
    post.name=req.body.name;
    post.save().then(() => res.json('annonce mise à jour!'))
    .catch(err => res.status(400).json('Error: ' + err));
}

    } catch (error) {
        console.error(error)
        res.status(500).send('server Error')
    }

})
/////modification d'une annonce
router.put('/modifierannonce/:id', (req, res) => {
    annonce.findById(req.params.id)
        .then(ann => {
            ann.title = req.body.title;
            ann.text = req.body.text;
            ann.name = req.body.name;
           
            ann.save()
                .then(() => res.json('annonce mise à jour!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

///supprimer une annonce
router.delete('/deleteannonce/:id', (req, res) => {
    annonce.findByIdAndDelete(req.params.id)
        .then(() => res.json('annonce supprimée.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/recupererannonce/:id', (req, res) => {
    annonce.findById(req.params.id)
        .then(annonces => res.json(annonces))
        .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;