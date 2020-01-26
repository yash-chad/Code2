const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB', { useNewUrlParser: true })
  .then(()=>{
    console.log('MongoDB Connection Succeeded.')
  }).catch(e=>{
      console.log("DB connection failed")
  })

require('./employee.model');