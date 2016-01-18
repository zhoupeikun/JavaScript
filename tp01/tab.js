//console.log("Hello, World");


function init(e) {
if(document.readyState != "complete" )
	return;
//console.log(document.getElementById("demo"));

var table = document.getElementById("demo");
//table.addEventListener("click", function loggue() {table.style.background = "red"} );

var old_cell = null;

table.addEventListener("click",
 function (e) {
	var cell = e.target; 
	if (old_cell)	
		old_cell.style.backgroundColor = "";

	cell.style.backgroundColor = "red";
	old_cell = cell;	
	
	});
};

document.addEventListener("readystatechange", init);





