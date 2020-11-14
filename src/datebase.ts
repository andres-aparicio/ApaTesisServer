const mariadb = require('mariadb');

export default mariadb.createPool({
    host: 'localhost', 
    port: '3307',
    user:'root', 
    password: '1234',
    database: 'db_conciliacion',
    connectionLimit: 5
});

