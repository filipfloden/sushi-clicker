var amount = 0;
var clickValue = 1;
var workers = 0;
var restaurants = 0;
var factories = 0;
var production = 1;
var clickPrice = 50;
var workerPrice = 160;
var restaurantPrice = 1400;
var factoryPrice = 12000;
var productionPrice = 500;
var auto = 0;

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : null,
    database : 'windows_app'
});

let getData = "SELECT * FROM stats"

connection.query(getData, (error, results, fields) => {
    if (error){
        return console.error(error.message);
    }
    results.forEach(function(data){
        amount += parseInt(data.sushis);
        clickValue += parseInt(data.click);
        workers += parseInt(data.workers);
        restaurants += parseInt(data.restaurants);
        factories += parseInt(data.factories);
        production += parseInt(data.production);
        clickPrice += parseInt(data.clickPrice);
        workerPrice += parseInt(data.workerPrice);
        restaurantPrice += parseInt(data.restaurantPrice);
        factoryPrice += parseInt(data.factoryPrice);
        productionPrice += parseInt(data.productionPrice);

        updateText();
    });
});


var sushi = document.getElementById('sushi');
sushi.addEventListener('click', function(){ 

    sushi.classList.remove('make-bigger');

    void sushi.offsetWidth;

    sushi.classList.add('make-bigger');

    amount += clickValue;
    document.getElementById('clicks').innerHTML = amount.toFixed(0); 
}, false); 

document.getElementsByClassName('btn-shop')[0].addEventListener('click', function(){
    if (amount >= clickPrice) {
        amount -= clickPrice;
        clickPrice *= 1.10;
        clickPrice = clickPrice.toFixed(0);
        clickValue *= 1.20;
        updateText();
    }
});
document.getElementsByClassName('btn-shop')[1].addEventListener('click', function(){ 
    if (amount >= workerPrice) {
        amount -= workerPrice;
        workerPrice *= 1.20;
        workerPrice = workerPrice.toFixed(0);
        workers++;
        updateText();
    }
});
document.getElementsByClassName('btn-shop')[2].addEventListener('click', function(){ 
    if (amount >= restaurantPrice) {
        amount -= restaurantPrice;
        restaurantPrice *= 1.35;
        restaurantPrice = restaurantPrice.toFixed(0);
        restaurants++;;
        updateText();
    }

});
document.getElementsByClassName('btn-shop')[3].addEventListener('click', function(){
    if (amount >= factoryPrice) {
        amount -= factoryPrice;
        factoryPrice *= 1.45;
        factoryPrice = factoryPrice.toFixed(0);
        factories++;
        updateText();
    }
});
document.getElementsByClassName('btn-shop')[4].addEventListener('click', function(){ 
    if (amount >= productionPrice) {
        amount -= productionPrice;
        productionPrice *= 7.48;
        productionPrice = productionPrice.toFixed(0);
        production++;
        updateText();
    }
});

function startAuto() {
    auto = (workers * 1 + restaurants * 10 + factories * 100) * production;
    amount += auto;

    document.getElementById('clicks').innerHTML = amount.toFixed(0);
    //autoSave();
    var t = setTimeout(startAuto, 100);
}

function updateText() {
    document.getElementById('clicks').innerHTML = amount.toFixed(0);
    document.getElementsByClassName('statistics')[0].innerHTML = "Workers: " + workers;
    document.getElementsByClassName('statistics')[1].innerHTML = "Restaurants: " + restaurants;
    document.getElementsByClassName('statistics')[2].innerHTML = "Factories: " + factories;
    document.getElementsByClassName('statistics')[3].innerHTML = "Production: " + production + "x";
    document.getElementsByClassName('btn-shop')[0].innerHTML = "Click Value" + "<br>" + "Price: " + clickPrice;
    document.getElementsByClassName('btn-shop')[1].innerHTML = "Worker" + "<br>" + "Price: " + workerPrice;
    document.getElementsByClassName('btn-shop')[2].innerHTML = "Restaurant" + "<br>" + "Price: " + restaurantPrice;
    document.getElementsByClassName('btn-shop')[3].innerHTML = "Factory" + "<br>" + "Price: " + factoryPrice;
    document.getElementsByClassName('btn-shop')[4].innerHTML = "Production" + "<br>" + "Price: " + productionPrice;
}

document.getElementById('save-btn').addEventListener('click', function() {
    autoSave();
});

function autoSave(){

    let sql = `UPDATE stats
    SET sushis = ?,
    click = ?,
    workers = ?,
    restaurants = ?,
    factories = ?,
    production = ?,
    clickPrice = ?,
    workerPrice = ?,
    restaurantPrice = ?,
    factoryPrice = ?,
    productionPrice = ?
    WHERE id = 1`;
    let data = [amount, clickValue, workers, restaurants, factories, production, clickPrice, workerPrice, restaurantPrice, factoryPrice, productionPrice];


    // execute the UPDATE statement
    connection.query(sql, data, (error, results, fields) => {
        if (error){
            return console.error(error.message);
        }
    });

};

function init() { 
    document.getElementById("close-btn").addEventListener("click", function (e) {
        window.close();
    }); 
}; 

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        init(); 
    }
};