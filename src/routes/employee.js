const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

//Inserting a new Emp
router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Review"
    });
});

//Creating a new Post
router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


const insertRecord = (req, res) =>{
    const emp = new Employee({
        name : req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        city:req.body.city
    })
    
    emp.save().then(empp=>{
        console.log(empp)
        res.redirect("/employee/list")
    }).catch(err=>{
        if (err.name == 'ValidationError') {
           // handleValidationError(err, req.body);
            res.render("employee/addOrEdit", {
                viewTitle: " Review",
                employee: req.body
            });
        }
        else
            console.log('Error during record insertion : ' + err);
    })
}

const updateRecord = (req, res)=> {
    Employee.findByIdAndUpdate(req.body._id , req.body, { new: true })
        .then(doc=>{
            res.redirect('employee/list');
        })
        .catch(err=>{
            if (err.name == 'ValidationError') {
               // handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Review',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        })
      
}

//List employees in db
router.get('/list', (req, res) => {
    Employee.find().then(result=>{
        res.render("employee/list",{
            list : result
        })
    }).catch(e=>{
        console.log("Error in retriving employees")
    })
});


// function handleValidationError(err, body) {
//     for (field in err.errors) {
//         switch (err.errors[field].path) {
//             case 'fullName':
//                 body['fullNameError'] = err.errors[field].message;
//                 break;
//             // case 'email':
//             //     body['emailError'] = err.errors[field].message;
//             //     break;
//             default:
//                 break;
//         }
//     }
// }

//Update Employees
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id)
        .then(doc=>{
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }).catch(e=>{
            console.log("Could'nt find doc")
        })
});

//Delete Employees
router.get('/delete/:id', (req, res) => {

    Employee.findByIdAndDelete(req.params.id)
        .then(()=> {
            res.redirect('/employee/list')
        }).catch(e=>{
            console.log("Could'nt delete")
        })
 
});

module.exports = router;