// Needed Resources 
const express = require("express")
const router = new express.Router() 

const accController = require("../controllers/accountController")
const Util = require("../utilities")

// Route to handle "My Account" link click
router.get("/login", accController.buildLogin)

//route to handle "registration" link when clicked
router.get("/register", accController.buildRegistration)

//route to handle post 
router.post('/register', Util.handleErrors(accController.registerAccount))

// Error handler middleware
router.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

module.exports = router
