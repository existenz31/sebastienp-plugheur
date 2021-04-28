const express = require('express');
const { PermissionMiddlewareCreator, RecordGetter } = require('forest-express-mongoose');
const { cabinets } = require('../models');

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('cabinets');

// This file contains the logic of every route in Forest Admin for the collection cabinets:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Cabinet
router.post('/cabinets', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a Cabinet
router.put('/cabinets/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a Cabinet
router.delete('/cabinets/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Cabinets
router.get('/cabinets', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a number of Cabinets
router.get('/cabinets/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
  next();
});

// Get a Cabinet
//router.get('/cabinets/:recordId(?!count)', permissionMiddlewareCreator.details(), (request, response, next) => {
router.get('/cabinets/:recordId', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
  if (request.params.recordId === 'count') {
    next(); return;
  }
 next();
//response.status(404).send("error"); return;
  // const recordGetter = new RecordGetter(cabinets);

  // recordGetter.get(request.params.recordId)
  //   .then(async record => {
  //     // record.location = record.location || {};
  //     // record.location.locType = record.location.type;
  //     let cabinet = await cabinets.findById(request.params.recordId);
  //     return recordGetter.serialize(cabinet)
  //   })
  //   .then(recordSerialized => response.send(recordSerialized))
  //   .catch(next);
});

// Export a list of Cabinets
router.get('/cabinets.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Cabinets
router.delete('/cabinets', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

router.post('/actions/cabinets/update-theme', permissionMiddlewareCreator.smartAction(), (req, res, next) => {

  const recordId = req.body.data.attributes.ids[0];
  const attrs = req.body.data.attributes.values;

  return cabinets.findOneAndUpdate({_id: recordId}, {
    theme: {
      logo: attrs['Logo'],
      mainColor: attrs['Main Color'],
      secondaryColor: attrs['Secondary Color']
    }
  })
  .then(() => {
    res.send({ success: 'Theme is updated!' });
  })
  .catch(next);

});


module.exports = router;
