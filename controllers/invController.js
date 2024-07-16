const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Get vehicle detail view
 * ************************** */
invCont.getVehicleDetail = async function (req, res, next) {
  const invId = req.params.invId;
  const data = await invModel.getVehicleById(invId);
  let nav = await utilities.getNav();
  const vehicleDetailHTML = utilities.buildVehicleDetail(data);
  res.render("./inventory/detail", {
    title: `${data.inv_make} ${data.inv_model}`,
    nav,
    vehicleDetailHTML,
  });
};

invCont.triggerError = function (req, res, next) {
  next(new Error("Intentional Error for Testing"));
};

module.exports = invCont