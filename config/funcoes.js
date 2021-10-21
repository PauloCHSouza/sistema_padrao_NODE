global.month = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro")

global.estados = {};
global.cidades = {};
global.areas = {};
global.cargos = {};

module.exports = function listas(application) {
    var connection = application.config.dbConnection();
    connection.query('select * from fabestados', function(error, result){
        global.estados = result;
    });

    connection.query('select * from fabcidades', function(error, result){
        global.cidades = result;
    });

    connection.query('select * from usuAreas where ativo = 1', function(error, result){
        global.areas = result;
    });

    connection.query('select * from usuCargos where ativo = 1', function(error, result){
        global.cargos = result;
    });
}