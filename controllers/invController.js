const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  if (data.length === 0) {
    let nav = await utilities.getNav()
    res.render("./inventory/classification", {
      title: "No vehicles found",
      nav,
      grid: "<p class='notice'>Sorry, no matching vehicles could be found.</p>",
    })
    return
  }
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

/* ***************************
 *  Build management  view
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
      title: "Inventory Management",
      nav,
  })
}


/* ***************************
 *  Build addClassification   view
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
      title: "Add New Classification",
      nav,
  })
}

invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body
  try {
      const result = await invModel.addClassification(classification_name)
      req.flash("info", "Classification added successfully.")
      res.redirect("/inv")
  } catch (error) {
      req.flash("error", "Error adding classification.")
      res.redirect("/inv/add-classification")
  }
}


/* ***************************
 *  Build addClassification   view
 * ************************** */

invCont.buildAddInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  let classificationList = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
      title: "Add New Inventory",
      nav,
      classificationList,
      messages: req.flash("info"),
      inv_make: "",
      inv_model: "",
      inv_year: "",
      inv_description: "",
      inv_image: "/path/to/your/default/image.png",
      inv_thumbnail: "/path/to/your/default/thumbnail.png"
  })
}

invCont.addInventory = async function (req, res, next) {
  const { classification_id, inv_make, inv_model, inv_description, inv_price, inv_year, inv_miles, inv_color, inv_image, inv_thumbnail } = req.body
  try {
    const result = await invModel.addInventory(classification_id, inv_make, inv_model, inv_description, inv_price, inv_year, inv_miles, inv_color, inv_image, inv_thumbnail)
    req.flash("info", "Inventory item added successfully.")
    res.redirect("/inv")
  } catch (error) {
    req.flash("error", error.message)
    res.redirect("/inv/add-inventory")
  }
}






invCont.triggerError = function (req, res, next) {
  next(new Error("Intentional Error for Testing"));
};




module.exports = invCont