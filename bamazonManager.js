const mysql =  require("mysql");
const chalk = require("chalk");
const inquirer = require("inquirer");



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


function inquire(){

    inquirer.prompt(options).then(function (response){

        if (response["action"] === "View Products for sale"){




            




        }
        else if(response["action"] === "View Low Inventory"){




        }
        else if(response["action"] === "Add To Inventory") {





        }
        else if(response["action"] === "Add new Product"){



        }





    });




}
inquire();
