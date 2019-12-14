const mysql =  require("mysql");
const chalk = require("chalk");


const connection = mysql.createConnection({

    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",

    database: "products_db"


});


connection.connect(function (error){

    if(error){
        console.log(chalk.red(`Connection could not be made`));
        throw error;
        

    }

    console.log(connection);
    console.log(chalk.green(`Connected as ID: ${connection.threadId} `));
    connection.end();


})