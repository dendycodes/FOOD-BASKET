const { body, validationResult, check } = require("express-validator");


const OrdersValidation=[
    body('orderName').notEmpty().withMessage('The order cannot be empty.'),
    body('hour').isInt({min:0,max:23}),
    body('minutes').isInt({min:0,max:59})
  ]
  

  const Users=[
    body('email').isEmail().withMessage('The email should be valid.'),
    body('username').notEmpty().withMessage('Username cannot be emtpy'),
    body('Password').isLength({min:5}).withMessage('Password must have more than 5 characters!')
  ]


  module.exports={
      OrdersValidation,
      Users
  }