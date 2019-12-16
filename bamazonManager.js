const mysql =  require("mysql");
const chalk = require("chalk");
const inquirer = require("inquirer");


let stock = 0;



const connection = mysql.createConnection({

    host: "localhost",

    port: 3306,

    user: "root",

    password: "root",

    database: "products_db"


});







const options = [
    {
        type: "list",
        choices: [
            "View Products for sale",
            "View Low Inventory",
            "Add To Inventory",
            "Add new Product"
        ],
        message: "What would you like to do Master?",
        name: "action"
    },
   
];

const item = [
    {
        type: "number",
        name: "choice",
        message: "Between 1 and 10, type in the item ID of the item you want to add to!",
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
        name: "quantity",
        message: "How many new additions in stock? Limit up to 20.",
        validate: function(value) {
            if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 20) {
              return true;
            }
            console.log("\n");
            console.log(chalk.red("INVALID INPUT. ENTER A NUMBER BETWEEN 1 & 20"));
            return inquire();
          }



    }
    
];




const addition = [
    {
        type: "input",
        name: "name",
        message: "Create a product name"

    },
    {
        type: "input",
        name: "department",
        message: "Create the corresponding department name. Example: Computers, Entertainment, DIY, Media"

    },
    {
        type: "number",
        name: "price",
        message: "What is the price of the product?"

    },
    {
        type: "number",
        name: "quant",
        message: "What is the available quantity?"

    }

];''









function inquire(){

    inquirer.prompt(options).then(function (response){

        if (response["action"] === "View Products for sale"){
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

            });





            inquire();
        }
        else if(response["action"] === "View Low Inventory"){ 
            connection.query("SELECT * FROM products_list", function(error, data){
                if (error){
                    console.log(chalk.red(`PRODUCTS could not be fetched from database`));
                    throw error;
                }
                
        
                for (i = 0; i < data.length; i++){

                    if( data[i].stock_quantity < 5){
                        console.log(chalk.green(`Product: ${data[i].product_name}`));
                        console.log(`Item ID: ${data[i].item_id}`);
                        console.log(chalk.whiteBright(`Price: $${data[i].price}`));
                        console.log(chalk.cyan(`Quantity: ${data[i].stock_quantity}`));
                        console.log(chalk.cyan(`----------------------------------`));
                        console.log(`\n`);



                    }
        
        
                }

            });
            


            inquire();
        }
        else if(response["action"] === "Add To Inventory") {
            inquirer.prompt(item).then(function (response){
                let id = response["choice"];
                let quantity = response["quantity"];
                
                connection.query(`SELECT * FROM products_list WHERE item_id = ${id}`, function(error, data){
                

                    connection.query(`UPDATE products_list SET stock_quantity = ${data[0].stock_quantity + quantity} WHERE item_id = ${id}`, function (error, response){
                        console.log(response);
                
                
                    });
    
                    

                });
                
                
                

            });
            










            inquire();
        }
        else if(response["action"] === "Add new Product"){

            inquirer.prompt(addition).then(function (response){
                let name = response["name"];
                let depName = response["department"];
                let price = response["price"];
                let stockQuantity = response["quant"];

                //I know there's something I'm supposed to be doing here
                connection.query(`INSERT INTO products_list (product_name, department_name, price, stock_quantity) VALUES (${name}, ${depName}, ${price}, ${stockQuantity})`, function(error, data){
                    console.log(data);

                });

            });














        }





    });




}
inquire();
