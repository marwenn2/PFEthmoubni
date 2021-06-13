const router = require('express').Router();
let commentaire = require('../models/Comments.model')

///récuperer toutes les annonces de la base de données
router.get('/recuperercommentaires', (req, res) => {
    commentaire.find()
        .then(commentaires => res.json(commentaires))
        .catch(err => res.status(400).json('Error: ' + err));
})
router.post('/Ajoutcommentaire', (req, res) => {
    
    const title= req.body.title;
    const text = req.body.text;
    const name= req.body.name;
    const commentairee = new commentaire ({
            title,text,name

    });
    commentairee.save()
    .then(() => res.json(commentairee))
    .catch(err => res.status(400).json('Error:' + err));
    
    
    
})
/////modification d'une annonce
router.put('/modifiercommentaire/:id', (req, res) => {
    commentaire.findById(req.params.id)
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
router.delete('/deletecommentaire/:id', (req, res) => {
    commentaire.findByIdAndDelete(req.params.id)
        .then(() => res.json('annonce supprimée.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/recuperercommentaires/:id', (req, res) => {
    commentaire.findById(req.params.id)
        .then(commentaire => res.json(commentaire))
        .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;