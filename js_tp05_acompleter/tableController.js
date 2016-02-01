var TableController = function (view) {

    var this_ = this;

    if (!(view instanceof TableView))
        throw "Invalid view";

    function findTD(obj) {
        if ( !obj || obj.nodeName == "TD") return obj
        else findTD(obj.parentNode);
    };


    this_.selection = null;


    function tdClickHandler (e ) {

        var td = findTD(e.target);

        if (!td) {
            this_.selection = null;
            return;
        };

        if (this_.selection)
            this_.selection.select(false);
        this_.selection = td;
        this_.selection.select(true);

        var cell = view.model.getCell(td.col, td.row);
        var form = cell.getFormula();
        view.input.value = form ? form.toString() : cell.getValue();

        //focus the input.

        setTimeout( function () { view.input.focus(); }, 100);

    };

    view.table.addEventListener("mousedown", tdClickHandler);




    function buttonClickHandler (e) {
        var td = this_.selection;
        if (!td) return;
	var s = view.input.value;
	var cell = view.model.getCell(td.col, td.row);

	//test if it is a formula:
	var res = s.match(/^=(.*)$/);
	if (res) {
	    //on a trouvé un = 
/*	    try {
		cell.setFormula(res[1]);
	    } catch (e) {
		alert(e);
	    }*/

                    if (s[0] != ''='') 
                        alert(e);
	}
	else
            cell.setValue(s);
    };

    view.button.addEventListener("click", buttonClickHandler);
    view.input.addEventListener("keypress", function (e) {
	if (e.keyCode == 13) //[enter]
	    buttonClickHandler(e);
    });

}
