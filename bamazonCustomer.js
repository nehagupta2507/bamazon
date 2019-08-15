//require("dot-env");
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "pwd",
   //password: process.env.DATABASE_PASSWORD,
    database: "bamazon_DB"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});
start = () => {
    connection.query("SELECT * FROM Products", function(err, result) {
		if (err) throw err;
        console.log('===================================Welcome to Bamazon======================================================== ');
        var table = new Table({
            head: ["Item ID", "Product Name","Price","Quantity"],
            style: {
                head: ['green'],
                compact: false,
                colAligns: ['center'],
            } 
        });
        for(var i = 0; i < result.length; i++){
            table.push(
                [result[i].id, result[i].item_name, result[i].price, result[i].qty]
            );
        }
        console.log(table.toString());
        setTimeout(question,500);
    });
}
question = () =>{
    inquirer
        .prompt([
        {
            name: "prod_id",
            type:"input",
            message: "Please enter the id of the product you would like to buy!",
            validate: function(value) {
                if (isNaN(value) === false){
                    return true;
                }
                return false;
            }
        },
        {
            name: "prod_qty",
            type: "input",
            message: "How many units of the product they would like to buy?",
            validate: function(value){
                if(isNaN(value) === false){
                    return true;
                }
                return false;
            }
        }
    ])
    .then(function(answer) {
        connection.query("SELECT * FROM products WHERE ?", {id: (answer.prod_id)}, function(err, res) {
            if (err) throw err;
            let id = parseInt(answer.prod_id);
            let qty = parseInt(answer.prod_qty);
            if(res[0] == undefined){
                console.log("Sorry, no items found for the above search id: " + answer.prod_id);
                reorder();
                //connection.end();
            }
            else{
                if((qty > res[0].qty) || (qty === 0)){
                    console.log("Sorry ! Insufficient quantity. Please select another quantity.");
                    reorder();
                    }
                else {
                    console.log("Your order is being processed!");
                    let price = parseFloat(res[0].price);
                    let totalCost = (price * qty).toFixed(2);
                    console.log("Your total cost is: $" + totalCost);
                    //updating the stock
                    connection.query('UPDATE Products SET qty = qty - ? WHERE id = ?', [qty, id], function(err, results){
                    if (err) throw err;
                    reorder();
                    });
                }
            }
        })
    })
}
	
reorder = () => {
        inquirer.prompt([{
          type: "confirm",
          name: "shop",
          message: "Would you like to purchase another item?"
        }]).then(function(answer){
          if(answer.shop){
            start();
          } 
          else{
            console.log("Thank you for shopping with us! Have a nice day!");
            connection.end();
          }
        });
}
