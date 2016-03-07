//Variable globale contenant les coups joués.
// La première case correspond au coin supérieur gauche.
//Les cases sont données ligne à ligne.
var grille = ["", "", "", "", "", "", "", "", "" ];

//Le joueur courant. Si croix vaut vrai, c'est à croix de jouer sinon c'est au rond.
var croix = true;
//Vaut vrai si la partie est terminée
var fini = false;


//Fonction testant qu'une partie est finie. Renvoie "x" si les croix
//on gagné, "o" si les ronds ont gagné et "" si personne n'a gagné pour l'instant.


//A COMPLÉTER La fonction est bugguée et renvoie toujours "". Expliquer en commentaire
// pourquoi la fonction est bugguée et la corriger pour qu'elle fonctionne correctement.

var victoire = function () {

    var symbols = [ "x", "o" ];



    symbols.forEach(function(symbol, j, tab) {

    // 3 colonnes
	for (var i = 0; i < 3; i++) {

	    if (grille[i] == grille[i+3] &&
		grille[i+3] == grille[i+6] &&
		grille[i+6] == symbol)
		return symbol;

	}

	// 3 lignes
	for (var i = 0; i < 8; i+= 3) {
	    if (grille[i] == grille[i+1] &&
		grille[i+1] == grille[i+2] &&
		grille[i+2] == symbol)
		return symbol;
	}

	// diagonale 1
	if (grille[0] == grille[4] &&
	    grille[4] == grille[8] &&
	    grille[8] == symbol)
	    return symbol;

	// diagonale 2
	if (grille[2] == grille[4] &&
	    grille[4] == grille[6] &&
	    grille[6] == symbol)
	    return symbol;


    });

    //personne n'a gagné.
    return "";

}

//Gestionaire de click.
//A compléter

var clickHandler = function (ev) {
    console.log(ev);
    if (ev.target.tagName != "TD" || fini) return;

    var idx ;

    // Récupérer l'id du TD cliqué (qui vaut c0 à c8) et le transformer
    // En entier entre 0 et 8. Le mettre dans al variable idx;

    /* A COMPLÉTER */
    idx = ev.target.id;
    idx = (idx[1] - 0); // force la conversion en Number.
    console.log(idx);

    var symbol = "o";
    if (croix) symbol = "x";

    if (grille[idx] == "") {

	//Écrire le symbole dans la bonne case de la grille;
	/* A COMPLÉTER */
	grille[idx] = symbol;

	//Écrire le symbole dans l'élément HTML cliqué;
	/* A COMPLÉTER */
	ev.target.innerHTML = symbol;


	croix = !croix;

	var gagnant = victoire();
	if (gagnant != "") {
	    var message = symbol + " a gagné.";

	    // Afficher le message dans le div HTML message.
	    /* A COMPLETER */
	    document.getElementById("message").innerHTML = message;
	    fini = true;
	}
    }
}

//Fonction d'initialisation

var init = function () {

    document.getElementById("grille").addEventListener("click", clickHandler);

}

//On initialise lorsque la page est chargée.
window.addEventListener("load", init);