function TableModel (w, h) {
	if (w = "" || w < 1) 
		this.width = 1;
	else 
		this.width = w;

	if(h = "" || h < 1)
		this.height = 1;
	else
		this.height = h;

	this.cells = new Array(this.height);

	for (var i = this.cells.length - 1; i >= 0; i--) {
		this.cells[i] = new Array(this.width);
		for (var j = this.cells[i].length - 1; j >= 0; j--) {
			this.cells[i][j] = new Cell();
		}
	}
}

