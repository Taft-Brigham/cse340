// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accController = require("../controllers/accountController")
const Util = require("../utilities")
const regValidate = require('../utilities/account-validation')

// Route to handle "My Account" link click
router.get("/login", accController.buildLogin)

//route to handle "registration" link when clicked
router.get("/register", accController.buildRegistration)

// Deliver the account management view
router.get("/", Util.handleErrors(accController.accountManagement));

//route to handle post 
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData, 
    Util.handleErrors(accController.registerAccount)
  )

// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  Util.handleErrors(accController.accountLogin)
)

// Error handler middleware
router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

module.exports = router
