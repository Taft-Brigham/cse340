// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);


// Route to get vehicle details
router.get("/detail/:invId", invController.getVehicleDetail);


// route to handle the management view 
router.get("/", utilities.handleErrors(invController.buildManagement))


// routes to handle the addClassification view and form submission.
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification))
router.post("/add-classification", utilities.handleErrors(invController.addClassification))


// routes to handle the addinventory view and form submission.
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory))
router.post("/add-inventory", utilities.handleErrors(invController.addInventory))


// intentional error  for testing purposes
router.get("/error", invController.triggerError);

module.exports = router;