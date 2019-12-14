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
    afterConnection();


})


function afterConnection(){
    connection.query("SELECT * FROM products_list", function(error, data){
        if (error){
            console.log(chalk.red(`PRODUCTS could not be fetched from database`));
            throw error;
        }
        //TODO: Use data to flesh out the product description. Works like an API
        console.log(data);
        connection.end();



    });



}