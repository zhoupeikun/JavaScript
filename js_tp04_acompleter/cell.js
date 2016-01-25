function Cell ()
{
    this.value = "";
    this.view = null;
    this.formula = null;
}


Cell.prototype = {

    getValue : function () { return this.value; },

    setValue : function (v) {
        this.value = v;
	/* A COMPLETER */
    },

    getView : function () { /* A COMPLETER */ },
    setView : function (v) {  /* A COMPLETER */ },

    getFormula : function () {  /* A COMPLETER */ },

    setFormula : function (s) {
	/* A COMPLETER */
    },



}
