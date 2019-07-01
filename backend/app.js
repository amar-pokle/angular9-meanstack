let express = require('express');
path = require('path');
mongoose= require('mongoose');
cors = require('cors');
bodyParser = require('body-parser');
dataBaseConfig = require('./database/db');

//Connection to Mongodb
mongoose.Promise  = global.Promise;
mongoose.connect(dataBaseConfig.db, {
    useNewUrlParser : true
}).then(() => {
    console.log('Database Connected Successfully');
}, 
err => {
    console.log('Database is not Connected' + err);
})

//Setup Express Port
const StudentRoute = require('../backend/routes/student.routes');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use (cors);
app.use(express.static(path.join(__dirname, 'dist/angular8-meanstack')));
app.use('/', express.static(path.join(__dirname, 'dist/angular8-meanstack')));
app.use('/api',StudentRoute)


//Create Port
const port = process.env.PORT || 4000;
const server = app.listen(port,() =>{
    console.log('Connected to port' + port)
})


// 404 Error
app.use((req,res,next) => {
    next(createError(404))
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });