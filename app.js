var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');



var indexRouter = require('./routes/index'); // Recovering the index route (home)
var CountryRoutes = require('./routes/CountryRoutes');  // Recovering country roads
var BusinessUnitRoutes = require('./routes/BusinessUnitRoutes');  // Recovering Business Units roads
var FilialeRoutes = require('./routes/FilialeRoutes');  // Recovering Filiales roads
var BranchesRoutes = require('./routes/BranchesRoutes');  // Recovering Branch roads
var BranchFilialeRoutes = require('./routes/BranchFilialeRoutes');  // Recovering Branch roads

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Swagger get module
const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');
const YAML = require('yamljs');
const openApiDocumentation = YAML.load('./api/swagger/swagger.yaml');

app.use('/', indexRouter);  // Injection of index routes for display
app.use('/api/countries', CountryRoutes); // Injection of country routes to generate the API
app.use('/api/business-units', BusinessUnitRoutes); // Injection of Business Unit routes to generate the API
app.use('/api/filiales', FilialeRoutes); // Injection of Filiales routes to generate the API
app.use('/api/branch', BranchesRoutes); // Injection of Branch routes to generate the API
app.use('/api/branch-filiale', BranchFilialeRoutes); // Injection of Branch && Filiale routes to generate the API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
