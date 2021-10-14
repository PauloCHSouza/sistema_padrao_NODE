module.exports = function(application) {
    //Rotas dos usuários
    application.get("/usu/usuarios/index", function(req, res) {
        application.app.controllers.usuarios.index(application, req, res);
    });
    application.get("/usu/usuarios/formulario", function(req, res) {
        application.app.controllers.usuarios.index.usuarios_salvar(application, req, res);
    });   
    application.post("/usu/usuarios/salvar", function(req, res) {
        application.app.controllers.usuarios.index.usuario_salvarScript(application, req, res);
    }); 
    application.get("/usu/usuarios/formularioEditar", function(req, res) {
        application.app.controllers.usuarios.index.usuario_editar(application, req, res);
    });  
    application.post("/usu/usuarios/editar", function(req, res) {
        application.app.controllers.usuarios.index.usuario_editarScript(application, req, res);
    });
    application.get("/usu/usuarios/excluir", function(req, res) {
        application.app.controllers.usuarios.index.usuario_excluirScript(application, req, res);
    });

    //Rotas de Areas
    application.get("/usu/areas/index", function(req, res) {
        application.app.controllers.usuarios.areas(application, req, res);
    });
    application.get("/usu/areas/formulario", function(req, res) {
        application.app.controllers.usuarios.areas.areas_salvar(application, req, res);
    });   
    application.post("/usu/areas/salvar", function(req, res) {
        application.app.controllers.usuarios.areas.area_salvarScript(application, req, res);
    }); 
    application.get("/usu/areas/formularioEditar", function(req, res) {
        application.app.controllers.usuarios.areas.areas_editar(application, req, res);
    });  
    application.post("/usu/areas/editar", function(req, res) {
        application.app.controllers.usuarios.areas.area_editarScript(application, req, res);
    });
    application.get("/usu/areas/excluir", function(req, res) {
        application.app.controllers.usuarios.areas.area_excluirScript(application, req, res);
    });

    //Rotas de Cargos
    application.get("/usu/cargos/index", function(req, res) {
        application.app.controllers.usuarios.cargos(application, req, res);
    });
    application.get("/usu/cargos/formulario", function(req, res) {
        application.app.controllers.usuarios.cargos.cargo_salvar(application, req, res);
    });    
    application.post("/usu/cargos/salvar", function(req, res) {
        application.app.controllers.usuarios.cargos.cargo_salvarScript(application, req, res);
    });  
    application.get("/usu/cargos/formularioEditar", function(req, res) {
        application.app.controllers.usuarios.cargos.cargo_editar(application, req, res);
    });
    application.post("/usu/cargos/editar", function(req, res) {
        application.app.controllers.usuarios.cargos.cargo_editarScript(application, req, res);
    });
    application.get("/usu/cargos/excluir", function(req, res) {
        application.app.controllers.usuarios.cargos.cargo_excluirScript(application, req, res);
    });
}