var counter = document.getElementById("counter")

for (var i = 59; i >= 0; i--) 
{
	setTimeout(
		function(j) { 
			return function() {
				counter.innerHTML = j;
			};
		}) (i),

		1000 * (60-i) );
};