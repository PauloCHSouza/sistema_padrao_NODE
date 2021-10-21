//Controllers dos usuários
    module.exports.index = function(application, req, res){

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);

        
        if (!req.session.cookie.permModUsu){
            res.redirect("/");
        }

        icons = 2
        if (global.varPermissoes){
            icons += 1;
        }
        if (req.session.cookie.permUsuAdmin){
            icons += 2;
        }

        usuariosModel.getUsuarios(function(error, result){
            res.render("usu/usuarios/index", {
                tituloPagina: "Usuários",
                tituloIcone: "user",
                calendarjsPDF: false,
                varModulo: "usu",
                permissoes: req.session.cookie,
                usuarios: result,
                cols: 6,
                icons: icons
            });
        });
    }
    module.exports.index.usuarios_salvar = function(application, req, res){

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);
        
        if (!req.session.cookie.permModUsu){
            res.redirect("/");
        }

        res.render("usu/usuarios/formulario", {
            tituloPagina: "Usuários",
            subTitulo: "Incluindo usuário",
            tituloIcone: "user",
            calendarjsPDF: false,
            varModulo: "usu",
            campo: "foto",
            pasta: "usu",
            subPasta: "fotos",
            preview: "",
            permissoes: req.session.cookie
        });
    }
    module.exports.index.usuario_salvarScript = function(application, req, res){
        var usuario = req.body;

        req.assert("nome", "Nome é obrigatório").notEmpty();
        req.assert("idArea", "Área é obrigatório").notEmpty();
        req.assert("idCargo", "Cargo é obrigatório").notEmpty();
        req.assert("login", "Login é obrigatório").notEmpty();
        req.assert("senha", "Senha é obrigatório").notEmpty();
        req.assert("email", "E-mail é obrigatório").notEmpty();

        var erros = req.validationErrors();
        if(erros){
            res.render("formulario", {validacao: erros, usuario: usuario});
            return;
        }

        if (!(req.files === null)){
            const file = req.files.foto;
            const path = "./uploads/" + file.name;
            usuario['foto'] = file.name
            
            file.mv(path, (err) => {
                if (err) {
                erros["file"] = "Erro no upload do arquivo";
                }
                path: path
            });
        }

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);

        usuariosModel.salvarUsuario(usuario, function (error, result) {
            console.log(error);
            res.redirect("/usu/usuarios/index");
        });
    }
    module.exports.index.usuario_editar = function(application, req, res){

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);
        
        if (!req.session.cookie.permModUsu){
            res.redirect("/");
        }

        var paran = req.query
        usuariosModel.getUsuario(paran, function(error, result){
            res.render("usu/usuarios/formularioEditar", {
                tituloPagina: "Usuários",
                subTitulo: "Incluindo usuário",
                tituloIcone: "user",
                calendarjsPDF: false,
                varModulo: "usu",
                campo: "foto",
                pasta: "usu",
                subPasta: "fotos",
                preview: "",
                permissoes: req.session.cookie,
                usuario: result
            });
        });
    }
    module.exports.index.usuario_editarScript = function(application, req, res){
        var usuario = req.body;

        req.assert("nome", "Nome é obrigatório").notEmpty();
        req.assert("idArea", "Área é obrigatório").notEmpty();
        req.assert("idCargo", "Cargo é obrigatório").notEmpty();
        req.assert("login", "Login é obrigatório").notEmpty();
        req.assert("senha", "Senha é obrigatório").notEmpty();
        req.assert("email", "E-mail é obrigatório").notEmpty();

        var erros = req.validationErrors();
        if(erros){
            res.render("formulario", {validacao: erros, usuario: usuario});
            return;
        }

        if (!(req.files === null)){
            console.log("Nova foto")
            const file = req.files.foto;
            const path = "./uploads/" + file.name;
            usuario['foto'] = file.name
            
            file.mv(path, (err) => {
                if (err) {
                erros["file"] = "Erro no upload do arquivo";
                }
                path: path
            });
        }

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);

        usuariosModel.editarUsuario(usuario, function (error, result) {
            res.redirect("/usu/usuarios/index");
        });
    }
    module.exports.index.usuario_excluirScript = function(application, req, res){
        var paran = req.query;

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);

        usuariosModel.excluirUsuario(paran, function (error, result) {
            res.redirect("/usu/usuarios/index");
        });
    }



//Controllers de Areas
    module.exports.areas = function(application, req, res){

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);
        
        if (!req.session.cookie.permModUsu){
            res.redirect("/");
        }

        usuariosModel.getAreas(function(error, result){
            res.render("usu/areas/index", {
                tituloPagina: "Áreas dos usuários",
                tituloIcone: "list",
                calendarjsPDF: false,
                varModulo: "usu",
                permissoes: req.session.cookie,
                areas: result,
                cols: 4,
                icons: 2
            });
        });
    }
    module.exports.areas.areas_salvar = function(application, req, res){

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);
        
        if (!req.session.cookie.permModUsu){
            res.redirect("/");
        }
        res.render("usu/areas/formulario", {
            tituloPagina: "Áreas dos usuários",
            subTitulo: "Incluindo área",
            tituloIcone: "list",
            calendarjsPDF: false,
            varModulo: "usu",
            permissoes: req.session.cookie,
            cols: 4,
            icons: 2
        });
    }
    module.exports.areas.area_salvarScript = function(application, req, res){
        var area = req.body;
        req.assert("titulo", "Titulo é obrigatório").notEmpty();

        var erros = req.validationErrors();
        if(erros){
            res.render("formulario", {validacao: erros, area: area});
            return;
        }

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);

        usuariosModel.salvarArea(area, function (error, result) {
            res.redirect("/usu/areas/index");
        });
    }
    module.exports.areas.areas_editar = function(application, req, res){

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);
        
        if (!req.session.cookie.permModUsu){
            res.redirect("/");
        }
        var paran = req.query
        usuariosModel.getArea(paran, function(error, result){
            res.render("usu/areas/formularioEditar", {
                tituloPagina: "Áreas dos usuários",
                subTitulo: "Incluindo área",
                tituloIcone: "list",
                calendarjsPDF: false,
                varModulo: "usu",
                permissoes: req.session.cookie,
                area: result,
                cols: 4,
                icons: 2
            });
        });
    }
    module.exports.areas.area_editarScript = function(application, req, res){
        var area = req.body;
        req.assert("titulo", "Titulo é obrigatório").notEmpty();

        var erros = req.validationErrors();
        if(erros){
            res.render("formulario", {validacao: erros, area: area});
            return;
        }

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);

        usuariosModel.editarArea(area, function (error, result) {
            res.redirect("/usu/areas/index");
        });
    }
    module.exports.areas.area_excluirScript = function(application, req, res){
        var paran = req.query;

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);

        usuariosModel.excluirArea(paran, function (error, result) {
            res.redirect("/usu/areas/index");
        });
    }



//Controllers dos cargos
    module.exports.cargos = function(application, req, res){

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);
        
        if (!req.session.cookie.permModUsu){
            res.redirect("/");
        }

        usuariosModel.getCargos(function(error, result){
            res.render("usu/cargos/index", {
                tituloPagina: "Cargos dos usuários",
                tituloIcone: "list",
                calendarjsPDF: false,
                varModulo: "usu",
                permissoes: req.session.cookie,
                cargos: result,
                cols: 4,
                icons: 2
            });
        });
    }
    module.exports.cargos.cargo_salvar = function(application, req, res){

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);
        
        if (!req.session.cookie.permModUsu){
            res.redirect("/");
        }

        usuariosModel.getAreas(function(error, result){
            res.render("usu/cargos/formulario", {
                tituloPagina: "Cargos dos usuários",
                subTitulo: "Incluindo cargo",
                tituloIcone: "list",
                calendarjsPDF: false,
                varModulo: "usu",
                permissoes: req.session.cookie,
                areas: result,
                cols: 4,
                icons: 2
            });
        });
    }
    module.exports.cargos.cargo_salvarScript = function(application, req, res){
        var cargo = req.body;
        req.assert("idArea", "Area é obrigatória").isNumeric().notEmpty();
        req.assert("titulo", "Titulo é obrigatório").notEmpty();

        var erros = req.validationErrors();
        if(erros){
            res.render("formulario", {validacao: erros, cargo: cargo});
            return;
        }

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);

        usuariosModel.salvarCargo(cargo, function (error, result) {
            res.redirect("/usu/cargos/index");
        });
    }
    module.exports.cargos.cargo_editar = function(application, req, res){

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);
        
        if (!req.session.cookie.permModUsu){
            res.redirect("/");
        }
        var paran = req.query
        usuariosModel.getCargo(paran, function(error, result){
            usuariosModel.getAreas(function(error, areasResult){
                res.render("usu/cargos/formularioEditar", {
                    tituloPagina: "Áreas dos usuários",
                    subTitulo: "Incluindo área",
                    tituloIcone: "list",
                    calendarjsPDF: false,
                    varModulo: "usu",
                    permissoes: req.session.cookie,
                    cargo: result,
                    areas: areasResult,
                    cols: 4,
                    icons: 2
                });
            });
        });
    }
    module.exports.cargos.cargo_editarScript = function(application, req, res){
        var cargo = req.body;
        req.assert("idArea", "Area é obrigatória").isNumeric().notEmpty();
        req.assert("titulo", "Titulo é obrigatório").notEmpty();

        var erros = req.validationErrors();
        if(erros){
            res.render("formulario", {validacao: erros, cargo: cargo});
            return;
        }

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);

        usuariosModel.editarCargo(cargo, function (error, result) {
            res.redirect("/usu/cargos/index");
        });
    }
    module.exports.cargos.cargo_excluirScript = function(application, req, res){
        var paran = req.query;

        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);

        usuariosModel.excluirCargo(paran, function (error, result) {
            res.redirect("/usu/cargos/index");
        });
    }