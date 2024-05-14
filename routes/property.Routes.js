const express = require('express');

const router = express.Router();

const property = require('../models/properties');


const PropertyController = require('../controller/property.controller');




router.route('/Res')
    .post(PropertyController.addResdential)
    .get(PropertyController.getResdential);

router.route('/Res/:propertyId').delete(PropertyController.deleteResdentiaal);

router.route('/Res/:propertyaddress') // Use ":address" as a parameter
    .get(PropertyController.getSingleResdentialbyaddress);


router.route('/Comm')
    .post(PropertyController.addCommercial)
    .get(PropertyController.getCommercial)


router.route('/Comm/:propertyaddress') // Use ":address" as a parameter
    .get(PropertyController.getSinglecommercialbyaddress);


router.route('/Comm/:propertyId')
    .delete(PropertyController.deleteCommercial);

router.route('/')
    .get(PropertyController.getallproperty);

router.route('/:searchParam?') // '?' makes the parameter optional
    .get(PropertyController.getSingleProperty);


router.route('/:propertyId')
    .patch(PropertyController.updateproperty)
    .get(PropertyController.getSingleProperty);



module.exports = router;