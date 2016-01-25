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

    getView : function () { 
   /* A COMPLETER */ 
        return this.view;
},
    setView : function (v) { 
     /* A COMPLETER */ 
        this.view = v;
 },

    getFormula : function () { 
     /* A COMPLETER */ 
        return this.formula;
 },

    setFormula : function (s) {
	/* A COMPLETER */
        this.formula = s;
    },



}
