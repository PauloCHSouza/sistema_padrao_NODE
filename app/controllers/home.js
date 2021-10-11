module.exports.index = function(application, req, res){

    var connection = application.config.dbConnection();
    var noticiasModel = new application.app.models.homeDAO(connection);

    noticiasModel.getUsuario(function(error, result){
        res.render("home/index", {
            tituloPagina: "Dashboard",
            tituloIcone: "th",
            calendar: false,
            calendarjsPDF: false,
            permissoes: req.session.cookie,
            usuario: result,
        });
    });

}