/* Représentation des formules */

/** Class commune aux autres types de formules */
var Formula = function () {

    this.children = []; // Fils du nœud courant
    this.priority = 0;  // Priorité du nœud courant
    this.arity = 0;     // Arité du nœud courant
}

// Convertit les arguments en chaînes de caractères
Formula.prototype.childrenToString = function () {
    var _this = this;

    //Fonction auxiliaire qui convertit la formule
    //form en chaîne de caractère et rajoute des
    //parenthèses si sa priorité est plus petite que p
    function protect(form, p) {
	var s = form.toString();
	if (p > form.priority)
	    s = "(" + s + ")";
	return s;

    };

    return this.children.map(function (c, i, a) {
	if (c)
	    return protect(c, _this.priority);
	else
	    return "";
    });
}



//Évalue tous les enfants de la formule courante
//et renvoie un tableau de leur valeurs

Formula.prototype.evalChildren = function () {
    return this.children.map(function(c, i, a) {
	return c.eval();
    });
};

//////////////////////////////////
/** Class Const */

var Const = function (n) {
    Formula.call(this);    //appel du constructeur parent
    this.priority = 10;    //plus haute priorité
    this.value = n || 0;   //valeur directement égale
                           //au nombre passé en paramètre
};

Const.prototype = Object.create(Formula.prototype);

Const.prototype.toString = function () {
    return this.value.toString();
};

Const.prototype.eval = function () {
    return this.value;
};

//////////////////////////////////
/** Classe Add (addition) */
var Add = function () {
    Formula.call(this);
    this.priority = 3;
    this.arity = 2;
};

Add.prototype = Object.create(Formula.prototype);

Add.prototype.toString = function () {
    var schildren = this.childrenToString();
    return schildren[0] + " + " + schildren[1];
};

Add.prototype.eval = function () {
    var vchildren = this.evalChildren();
    return vchildren[0] + vchildren[1];
};

//////////////////////////////////
var Sub = function (f1, f2) {
    Formula.call(this);
    this.priority = 3;
    this.arity = 2;
};

Sub.prototype = Object.create(Formula.prototype);

Sub.prototype.toString = function () {
    var schildren = this.childrenToString();
    return schildren[0] + " - " + schildren[1];
};

Sub.prototype.eval = function () {
    var vchildren = this.evalChildren();
    return vchildren[0] - vchildren[1];
};

//////////////////////////////////
var Mul = function (f1, f2) {
    Formula.call(this);
    this.priority = 4;
    this.arity = 2;
};

Mul.prototype = Object.create(Formula.prototype);

Mul.prototype.toString = function () {
    var schildren = this.childrenToString();
    return schildren[0] + " * " + schildren[1];
};

Mul.prototype.eval = function () {
    var vchildren = this.evalChildren();
    return vchildren[0] * vchildren[1];
};

//////////////////////////////////
var Div = function (f1, f2) {
    Formula.call(this);
    this.priority = 4;
    this.arity = 2;
};

Div.prototype = Object.create(Formula.prototype);

Div.prototype.toString = function () {
    var schildren = this.childrenToString();
    return schildren[0] + " / " + schildren[1];
};

Div.prototype.eval = function () {
    var vchildren = this.evalChildren();
    return vchildren[0] / vchildren[1];
};

//Méthode « statique », directement attachée à l'objet Formula, pas
//individuellement à chaque formule.

Formula.parse = function (input) {

    //tableau d'action pour le lexer
    var actions = [
        { re : /[+]/, action : function (s, i, j) { return new Add(); }},
        { re : /-/, action : function (s, i, j) { return new Sub(); }},
        { re : /[*]/, action : function (s, i, j) { return new Mul(); }},
        { re : /\//, action : function (s, i, j) { return new Div(); }},
        { re : /[()]/, action : function (s, i, j) { return s; } },
        { re : /[-+]?[0-9]+(?:[.][0-9]*(?:[eE](?:[-+]?)[0-9]+)?)?/ ,
          action : function (s, i, j) { return new Const(+(s)); } }
    ];

    //Création d'un nouveau lexer
    var lexer = new Lexer(actions);
    //Obtention d'un tableau de jetons.
    //Un jeton est soit un objet dont le type est une sous-classe de Formula
    //soit la chaîne "(", soit la chaîne ")"

    var tokens = lexer.scan(input);


    //La sortie et la pile, comme dans l'algorithme de Dijkstra
    var output = [];
    var stack = [];

    //Monkey patching : on ajoute une méthode peek sur l'objet stack qui permet
    //de récupérer le sommet sans le dépiler
    stack.peek = function () {
	return this[this.length - 1];
    }

    //Monkey patching : on ajoute une méthode reduce sur l'objet output. Lorsque
    //L'on ajoute un opérateur dans la sortie, alors la méthode reduce dépile
    //automatiquement les n formules en sommet de pile et le place comme fils
    //du nœud ajouté.
    //Lève une exception si la pile ne dispose pas d'assez de valeurs.

    output.reduce = function (op) {
	var args = [];
	for (var i = 0; i < op.arity; i++) {
	    if (this.length === 0) {
		throw "Syntax error, not enough arguments";
	    } else {
		args.push(this.pop());
	    }
	}
	op.children = args.reverse ();
	this.push(op);
    };

    //Algorithme de Dijkstra, Phase I

    for (var i = 0; i < tokens.length; i++) {
	var token = tokens[i];

	if (token instanceof Const) {
	    output.push(token);
	} else if (token instanceof Formula) {
	    //operator
	    var op;
	    while (stack.length) {
		op = stack.peek();

		if (token.priority <= op.priority) {
		    stack.pop();
		    output.reduce(op);
		} else { break; }
	    }
	    stack.push(token);
	} else if (token === "(") {
	    stack.push(token);
	} else if (token === ")") {
	    while(stack.length > 0 && stack.peek() !== "(") {
		output.reduce(stack.pop());
	    };
	    if (stack.peek() === "(")
		stack.pop();
	    else
		throw "Mismatched parenthesis";
	}
    }
    // Phase II
    while(stack.length > 0) {
	if (stack.peek() instanceof Formula)
	    output.reduce(stack.pop());
	else
	    throw "Mismatched parenthesis";
    };

    if (output.length !== 1)
	throw "Syntax error, missing operator";
    else
	return output[0];
};
