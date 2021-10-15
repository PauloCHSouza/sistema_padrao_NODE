global.month = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro")

global.estados = {};
global.cidades = {};

module.exports = function estados(application) {

    var connection = application.config.dbConnection();
    connection.query('select * from fabestados', function(error, result){
        global.estados = result;
    });

    connection.query('select * from fabcidades', function(error, result){
        global.cidades = result;
    });
}