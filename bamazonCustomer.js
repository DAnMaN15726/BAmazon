const mysql =  require("mysql");
const chalk = require("chalk");
const inquirer = require("inquirer");


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
        

        for (i = 0; i < data.length; i++){
            console.log(chalk.green(`Product: ${data[i].product_name}`));
            console.log(`Item ID: ${data[i].item_id}`);
            console.log(chalk.whiteBright(`Price: $${data[i].price}`));
            console.log(chalk.cyan(`Quantity: ${data[i].stock_quantity}`));
            console.log(chalk.cyan(`----------------------------------`));
            console.log(`\n`);



        }
        




        // connection.end();
        inquire();


    });



}



const ubuyNaow = [
    {
        type: "number",
        name: "choice",
        message: "Choose which item you would like to buy! (Enter a Number!)",
        validate: function(value) {
            if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10) {
              return true;
            }
            console.log("\n");
            console.log(chalk.red("INVALID INPUT. ENTER A NUMBER BETWEEN 1 & 10"));
            return inquire();
          }

    },
    {

        type: "number",
        name: "quant",
        message: "How many do you want to buy?",
        validate: function(value) {
            if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 20) {
              return true;
            }
            console.log("\n");
            console.log(chalk.red("INVALID INPUT. ENTER A NUMBER BETWEEN 1 & 20"));
            return inquire();
          }



    }
    
]
// const haowMany = [
//     {

//         type: "number",
//         name: "quant",
//         message: "How many do you want to buy?"



//     }
// ]


function inquire(){
    inquirer.prompt(ubuyNaow).then(function (response){
        
        let quantityBuy = response["quant"];
        let id = response["choice"];



        connection.query(`SELECT item_id, price, stock_quantity FROM products_list WHERE item_id = ${response["choice"]} `, function (error, response){
            console.log(response);
            
            
            
            if( quantityBuy === 0 || response[0].stock_quantity < quantityBuy){
                console.log(chalk.red(`There aren't any of this product left in stock!`));
                inquire();

            }
            else{
                console.log(chalk.green(`We have enough in stock!`));



                update(quantityBuy,response[0].stock_quantity - quantityBuy, id, quantityBuy * response[0].price);
            }




        });

    });

    
    

}


function update(amountBuy, value, itemId, price){
    console.log(chalk.green(`${amountBuy} quantities of Item ID: ${itemId}, coming to a grand total of $${price} `));
    

    connection.query(`UPDATE products_list SET stock_quantity = ${value} WHERE item_id = ${itemId}`, function (error, response){
        // console.log(response);


    });











}