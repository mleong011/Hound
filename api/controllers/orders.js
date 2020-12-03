const express = require('express');
const router = express.Router();
const db = require('../models');
const { Order } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /Orders
//    POST   /Orders
//    GET    /Orders/:id
//    PUT    /Orders/:id
//    DELETE /Orders/:id 

router.get('/', (req, res) => {
    Order.findAll()
    .then(orders => res.json(orders));
});

router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    Order.findAll({where: {userId}})
    .then(order => {
        if(!order){
            return res.sendStatus(404);
        }

        res.json(order);
    });
});

router.post('/', (req, res) => {
    const { userId, trackingnumber, provider } = req.body;

    Order.create({
        userId,
        trackingnumber,
        provider
    })
    .then( order => {
        res.status(201).json(order);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { userId, provider, trackingnumber } = req.body;
    Order.findByPk(id)
    .then(order => {
        if(!order){
            return res.sendStatus(404);
        }
        order.userId = userId;
        order.provider = provider;
        order.trackingnumber = trackingnumber;
        order.save()
        .then(order => {
            res.json(order);
        })
        .catch(err => {
            res.status(404).json(err);
        });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Order.findByPk(id)
    .then(order => {
        if(!order){
            return res.sendStatus(404);
        }

        order.destroy({ where: { id } });
        res.sendStatus(200);
    });
});

module.exports = router;