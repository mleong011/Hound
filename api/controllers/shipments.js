const express = require('express');
const router = express.Router();
const db = require('../models');
const { Shipment } = db;

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /users
//    POST   /users
//    GET    /users/:id
//    PUT    /users/:id
//    DELETE /users/:id 

router.get('/', (req, res) => {
    Shipment.findAll()
    .then(shipments => res.json(shipments));
});

router.get('/:orderId', (req, res) => {
    const { orderId } = req.params;
    Shipment.findAll({where: {orderId}})
    .then(shipment => {
        if(!shipment){
            return res.sendStatus(404);
        }

        res.json(shipment);
    });
});

router.post('/', (req, res) => {
    const { orderId, dateordered, deliverydate, status } = req.body;

    Shipment.create({
        orderId,
        dateordered,
        deliverydate,
        status
    })
    .then( shipment => {
        res.status(201).json(shipment);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put('/:orderId', (req, res) => {
    const { orderId } = req.params;
    const { dateordered, deliverydate, status } = req.body;
    Shipment.findOne( {where: {orderId} } )
    .then(shipment => {
        if(!shipment){
            return res.sendStatus(404);
        }
        shipment.orderId = orderId;
        shipment.dateordered = dateordered;
        shipment.deliverydate = deliverydate;
        shipment.status = status;
        shipment.save()
        .then(shipment => {
            res.json(shipment);
        })
        .catch(err => {
            res.status(404).json(err);
        });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Shipment.findByPk(id)
    .then(shipment => {
        if(!shipment){
            return res.sendStatus(404);
        }

        shipment.destroy({ where: { id } });
        res.sendStatus(200);
    });
});

module.exports = router;