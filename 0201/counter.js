var counter = document.getElementById("counter")

for (var i = 59; i >= 0; i--) 
{
	setTimeout(function() { console.innerHTML = i; },
		1000 * (60-i) );
}