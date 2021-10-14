function usuariosDAO(connection){
    this._connection = connection
}

//DAO Usuários
    usuariosDAO.prototype.getUsuario = function (callback){
        this._connection.query('select u.*, a.titulo as area, c.titulo as cargo from usuUsuarios u inner join usuAreas a on u.idArea = a.idArea inner join usuCargos c on u.idCargo = c.idCargo where u.ativo = 1', callback)
    }
    usuariosDAO.prototype.salvarUsuario = function (usuario, callback){
        this._connection.query("insert into usuusuarios set ? ", usuario, callback);
    }

//DAO Areas
    usuariosDAO.prototype.getAreas = function (callback){
        this._connection.query('SELECT a.*, (SELECT COUNT(c.idCargo) FROM usucargos c WHERE c.ativo AND c.idArea = a.idArea) as nrCargos from usuareas a WHERE a.ativo = 1', callback)
    }
    usuariosDAO.prototype.getArea = function (paran, callback){
        this._connection.query('SELECT * from usuareas a WHERE a.ativo = 1 and a.idArea = ' + paran.idPK, callback)
    }
    usuariosDAO.prototype.salvarArea = function (area, callback){
        this._connection.query("insert into usuareas set ? ", area, callback);
    }
    usuariosDAO.prototype.editarArea = function (area, callback){
        idPK = area.idPK;
        delete area["idPK"]; 
        this._connection.query("update usuareas set ? where ?", [area, { idArea: idPK }], callback); 
    }
    usuariosDAO.prototype.excluirArea = function (paran, callback){ 
        this._connection.query("update usuareas set ? where ?", [{ativo: 0}, { idArea: paran.idPK }], callback);
    }

//DAO Areas
    usuariosDAO.prototype.getCargos = function (callback){
        this._connection.query('SELECT c.*, a.titulo as area, (select count(idUsuario) from usuUsuarios where idCargo = c.idCargo and ativo = 1) as nrUsuarios from usucargos c inner join usuareas a on a.idArea = c.idArea WHERE c.ativo = 1', callback)
    }
    usuariosDAO.prototype.getCargo = function (paran, callback){
        this._connection.query('SELECT * from usucargos c WHERE c.ativo = 1 and c.idCargo = ' + paran.idPK, callback)
    }
    usuariosDAO.prototype.getCargoByArea = function (paran, callback){
        this._connection.query('SELECT * from usucargos c WHERE c.ativo = 1 and c.idArea = ' + paran.idPK, callback)
    }
    usuariosDAO.prototype.salvarCargo = function (cargo, callback){
        this._connection.query("insert into usucargos set ? ", cargo, callback);
    }
    usuariosDAO.prototype.editarCargo= function (cargo, callback){
        idPK = cargo.idPK;
        delete cargo["idPK"];
        this._connection.query("update usucargos set ? where ?", [cargo, { idCargo: idPK }], callback); 
    }
    usuariosDAO.prototype.excluirCargo = function (paran, callback){ 
        this._connection.query("update usucargos set ? where ?", [{ativo: 0}, { idCargo: paran.idPK }], callback);
    }

module.exports = function(){
    return usuariosDAO;
}
