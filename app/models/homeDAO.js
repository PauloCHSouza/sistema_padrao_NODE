function HomeDAO(connection){
    this._connection = connection
}
 
HomeDAO.prototype.getUsuario = function (callback){
    this._connection.query('select * from usuUsuarios where idUsuario = 1', callback)
}

module.exports = function(){
    return HomeDAO;
}
