var TableController = function (view) {
    //Constructeur, il n'y a pas de code en dehors

    //Alias pour accéder à l'objet courant depuis les
    //fonctions imbriquées

    var this_ = this;

    if (!(view instanceof TableView))
        throw "Invalid view";

    //Fonction auxiliaire qui permet de remonter sur la cellule si
    //c'est un sous-élément de cette dernière qui a reçu l'évènement.

    function findTD(obj) {
        if ( !obj || obj.nodeName == "TD") return obj
        else findTD(obj.parentNode);
    };


    //Objet stockant la cellule actuellement sélectionnée.
    this_.selection = null;

    //Séléctionne la cellule cliquée
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

        //focus la zone de texte

        setTimeout( function () { view.input.focus(); }, 100);

    };

    view.table.addEventListener("mousedown", tdClickHandler);




    function buttonClickHandler (e) {
        var td = this_.selection;
        if (!td) return;
	var s = view.input.value;
	var cell = view.model.getCell(td.col, td.row);

	/* A COMPLETER QUESTION 1 */
    };

    view.button.addEventListener("click", buttonClickHandler);

    /* A COMPLETER QUESTION 2 */

}
