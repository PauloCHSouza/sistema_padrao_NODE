function geraisDAO(connection){
    this._connection = connection
}

geraisDAO.prototype.getEstados = function (callback){
    this._connection.query('select * from fabestados', callback)
}

module.exports = function(){
    return geraisDAO;
}
