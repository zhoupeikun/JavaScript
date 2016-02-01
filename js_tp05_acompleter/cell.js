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
	if (typeof this.view.notify == "function")
            this.view.notify(this);
    },

    getView : function () { return this.view; },
    setView : function (v) { this.view = v; },

    getFormula : function () { return this.formula; },

    setFormula : function (s) {
        var f = Formula.parse(s); //peut lever une exception rattrapée dans le controleur
	this.formula = f;
        this.setValue(f.eval());
    },



}
