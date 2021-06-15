const router = require('express').Router();
let commentaire = require('../models/Comments.model')
const auth = require('../middleware/auth');
const User= require('../models/usermodel')
const { check, validationResult } = require('express-validator')
const annonce = require('../models/annonce')
///récuperer toutes les annonces de la base de données
router.get('/recuperercommentaires', (req, res) => {
    commentaire.find()
        .then(commentaires => res.json(commentaires))
        .catch(err => res.status(400).json('Error: ' + err));
})
router.route('/addComment/:id').post([auth, [
    check('comment', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
       
        const newComment = new commentaire({
            comment: req.body.comment,
            user: req.user.id
        })
        const post = await annonce.findById(req.params.id);
        post.comments.push(newComment);
        const addComment = await newComment.save();
        const updatepost = await post.save();
        res.json(updatepost);


    } catch (error) {
        console.error(error)
        res.status(500).send('server Error')
    }

})
/////modification d'une annonce
router.route('/modifiercommentaire/:idp/:idc').put([auth, 
    
], async (req, res) => {
 
    try {
        const commentairee = await commentaire.findById(req.params.idc);
        commentairee.coment= req.body.comment;

        const post = await annonce.findById(req.params.idp);
        //console.log(post.comments)
        
        post.comments.filter(x => x._id.toString()===commentairee._id.toString()).forEach(c=> c.comment=req.body.comment);
        
        post.save().then(() => res.json('annonce mise à jour!'))
        .catch(err => res.status(400).json('Error: ' + err));
        commentairee.save().then(() => res.json('annonce mise à jour!'))
        .catch(err => res.status(400).json('Error: ' + err));
        
    } catch (error) {
        console.error(error)
        res.status(500).send('server Error')
    }

})
///supprimer une annonce

router.delete('/deletecommentaire/:idp/:idc', async (req, res) =>  {
   
    await annonce.findById(req.params.idp).then(post => {
        const comms = post.comments;
    
       let index = post.comments.indexOf(x=> x._id.toString===req.params.idc)
        post.comments.splice(index,1);
   
    console.log(post.comments)
        post.save().then(() => res.json('annonce mise à jour!'))
    .catch(err => res.status(400).json('Error: ' + err));
    })
    commentaire.findByIdAndDelete(req.params.idc).then(()=>res.json('commenaire supprimé')).catch(err =>res.status(400).json('Error:'+err))
})


router.get('/recuperercommentaires/:id', (req, res) => {
    commentaire.findById(req.params.id)
        .then(commentaire => res.json(commentaire))
        .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;