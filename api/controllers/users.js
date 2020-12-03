const express = require('express');
const router = express.Router();
const db = require('../models');
const { User } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /users
//    POST   /users
//    GET    /users/:id
//    PUT    /users/:id
//    DELETE /users/:id 

router.get('/', (req, res) => {
    User.findAll()
    .then(users => res.json(users));
});

router.get('/:email', (req, res) => {
    const { email } = req.params;
    User.findOne({where: {email}})
    .then(user => {
        if(!user){
            return res.sendStatus(404);
        }

        res.json(user);
    });
});

router.post('/', (req, res) => {
    const { name, email } = req.body;

    User.create({
        name,
        email
    })
    .then( user => {
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    User.findByPk(id)
    .then(user => {
        if(!user){
            return res.sendStatus(404);
        }
        user.name = name;
        user.email = email;
        user.save()
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(404).json(err);
        });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    User.findByPk(id)
    .then(user => {
        if(!user){
            return res.sendStatus(404);
        }

        user.destroy({where: {id}});
        res.sendStatus(200);
    });
});

module.exports = router;
