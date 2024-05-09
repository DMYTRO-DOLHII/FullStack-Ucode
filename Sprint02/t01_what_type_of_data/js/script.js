// Create variables for different data types and assign values
var number = 10;
var bigInt = 100n;
var string = "Hello";
var boolean = true;
var _null = null;
var undefined;
var object = {};
var symbol = Symbol();
var _function = function () { };

// Display variable names and their data types
alert(
	"number is " + typeof number + "\n" +
	"bigInt is " + typeof bigInt + "\n" +
	"string is " + typeof string + "\n" +
	"boolean is " + typeof boolean + "\n" +
	"null is " + typeof _null + "\n" +
	"undefined is " + typeof undefined + "\n" +
	"object is " + typeof object + "\n" +
	"symbol is " + typeof symbol + "\n" +
	"function is " + typeof _function
);
