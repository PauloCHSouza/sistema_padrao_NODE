module.exports.index = function(application, req, res){

    var connection = application.config.dbConnection();
    var homeModel = new application.app.models.homeDAO(connection);

    homeModel.getUsuario(function(error, result){
        res.render("home/index", {
            tituloPagina: "Dashboard",
            tituloIcone: "th",
            calendarjsPDF: false,
            varModulo: "fab",
            permissoes: req.session.cookie,
            usuario: result,
        });
    });

}