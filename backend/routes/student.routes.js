const express = require('express');
const app = express();
const StudentRoute = express.Router();

//Student model 
let Student = require('../model/Student');

//Add student
StudentRoute.route('/add-student').post((req,res,next) => {
    Student.crete(req.body,(err,data)  => {
        if(err) {
            return next(err)
        } else {
            res.json(data)
        }
    })
});

//Get all studnt here
StudentRoute.route('/').get((req, res) => {
    Student.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  


//Get Single student Here
StudentRoute.route('/read-student/:id').get((req, res)  =>{
    Student.findById(req.params.id,(err,data)  =>{
        if(err) {
            return next(err)
        } else {
            res.json(data)
        }
    })
});

//Update Students
StudentRoute.route('/update-student/:id').put((req,res,next)  =>{
    Student.findByIdAndUpdate(req.params.id, {
        $set: req.body
    },(err,data) => {
        if(err) {
            return next(err);
            console.log(err)
        } else {
            res.json(data)
            console.log('Students added successfully')
        }
    })
})

//Delete Students By Id
StudentRoute.route('/delete-student/:id').delete((req,res,next)  =>{
    Student.findByIdAndRemove(req.params.id, (err,data) =>{
        if(err){
            return next(err);
        } else {
            res.status(200).json({
                msg:data
            })
            
        }
    })
})


module.exports = StudentRoute;