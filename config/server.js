var express = require('express');
var consign = require("consign");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
const session = require('express-session');

global.appLoggedFDTASP = false;
global.usuario = "Paulo";
global.BootstrapModal = true;
global.varTitleApp = "Sistema padrão";
global.calendar = true;
global.bootColorpicker = true;
global.validacao = true;
global.typeahead = false;
global.editable = true;
global.editor = false;
global.chart = true;
global.confirmaAspMsg = true;
global.alertaAspMsg = true;
global.alertaRetornaAspMsg = false;
global.varLog = true;
global.varPermissoes = true;

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
        permUsuAdmin: true,
        permUsuList: true,
        permUsuPerm: true
    }
}));

consign()
    .include("app/routes")
    .then("config/dbConnection.js")
    .then("app/models")
    .then("app/controllers")
    .into(app);

module.exports = app;