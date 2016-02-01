var counter = document.getElementById("counter")
var i = 59;

function loop () {

	if (i >= 0) {
		counter.innerHTML = i;
		i--;
		setTimeout(loop, 1000);
	}
};

loop();
