var express = require('express');
var consign = require("consign");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
const session = require('express-session');

global.appLoggedFDTASP = false;
global.usuario = "Paulo";
global.BootstrapModal = true;
global.varTitleApp = "Sistema padrão";
global.calendar = false;
global.bootColorpicker = false;
global.validacao = false;
global.typeahead = false;
global.editable = false;
global.editor = false;
global.chart = false;
global.confirmaAspMsg = false;
global.alertaAspMsg = false;
global.alertaRetornaAspMsg = false;

var app = express();
app.set("view engine", "ejs");
app.set("views", "./app/views")

app.use(express.static("./app/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

app.use(session({
    secret: 'keyboard cat', 
    saveUninitialized: false, 
    resave: false, 
    cookie: { 
        permModUsu: true,
        teste: false
    }
}));

consign()
    .include("app/routes")
    .then("config/dbConnection.js")
    .then("app/models")
    .then("app/controllers")
    .into(app);

//Permissões

module.exports = app;