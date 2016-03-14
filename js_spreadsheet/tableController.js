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
        view.input.value = form ? '=' + form.toString() : "";

        //focus the input.

        setTimeout( function () { view.input.focus(); }, 100);

    };

    view.table.addEventListener("mousedown", tdClickHandler);


    // multiple selection
    function tdSelctHandler (e) {


    };

    view.table.addEventListener("mouseup", tdSelctHandler);


    function buttonClickHandler (e) {
        var td = this_.selection;
        if (!td) return;
	var s = view.input.value;
	var cell = view.model.getCell(td.col, td.row);

	//test if it is a formula:
	var res = s.match(/^=(.*)$/);
	try {
	    var address = td.col + "," + td.row;
	    if (res)
		cell.setFormula(res[1], address);
	    else
		cell.setFormula('"' + s + '"', address);
	} catch (e) {
	    alert(e);
	}
    };

    //To do, five functions
    // gras
    function gras(e) {
        var td = this_.selection;
        if(!td) return;
            //form.style.fontWeight = bold;
        if(td.style.fontWeight == "normal")
            td.style.fontWeight = "bold";
        else
            td.style.fontWeight = "normal";

    };

    // italic
    function italique(e) {
        var td = this_.selection;
        if(!td) return;
        if(td.style.fontStyle == "normal")
            td.style.fontStyle = "italic";
        else
            td.style.fontStyle = "normal";

    };

    // underline
    function souligne(e) {
        var td = this_.selection;
        if(!td) return;
        if(td.style.textDecoration == "")
            td.style.textDecoration = "underline";
        else
            td.style.textDecoration = "";

    };

    // text's color
    function textCouleur(e) {
        var td = this_.selection;
        if(!td) return;
            td.style.color="#3333ff"
    };

    // case's color
    function caseCouleur(e) {
        var td = this_.selection;
        if(!td) return;
            td.style.backgroundColor = "red";
    };

    view.button.addEventListener("click", buttonClickHandler);
    view.input.addEventListener("keypress", function (e) {
	if (e.keyCode == 13) //[enter]
	    buttonClickHandler(e);
    });

    // click 'gras'
    view.button_gras.addEventListener("click", gras);

    // click 'italique'
    view.button_italique.addEventListener("click", italique);

    // click 'souligne'
    view.button_souligne.addEventListener('click', souligne);

    //click 'choix de couleur du texte'
    view.button_textCouleur.addEventListener("click", textCouleur);

    //click 'choix du couleur du fond de case'
    view.button_caseCouleur.addEventListener("click", caseCouleur);


}
