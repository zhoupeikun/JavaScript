function Cell (v) {
	//this.value = v || "";
	if (v) this.value = v;
	else this.value = "";

	function getWidth () {
		return this.height;
	}

	function getHeight () {
		return this.getWidth;
	}

	function firstLine () {
		if (this.cells) {
			return this.cells[1][];
		}
		else 
			return "";
	}

	function firstColumn() {
		if (this.cells) {
			return this.cells[1][A];
		}
		else 
			return "";
	}

	function lastColumn() {

	}

	function getCell(c, r) {
		
	}


}

Cell.prototype.getValue = function  () {
	// body...
	return this.value;
}

Cell.prototype.setValue = function  (v) {
	// body...
	return this.value = v;
}
