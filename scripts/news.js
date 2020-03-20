// Tableau contenant des chaines de caractères correspondant aux recherches stockées
var recherches = [];
// Chaine de caractères correspondant à la recherche courante
var recherche_courante;
// Tableau d'objets de type resultats (avec titre, date et url)
var recherche_courante_news = [];


function ajouter_recherche() {
	var recherche = document.getElementById('zone_saisie').value;
  //Retourne la valeur de l'indice de recherches[recherche] ou -1 si il n'y est pas
  var a = recherches.indexOf(recherche);
  if(a == -1){
    //Ajout dans l'array reecherches
    recherches.push(recherche);

    //Ajout de la div
    var listeRecherche = document.getElementById('recherches-stockees');
    //Création de p
    let newP = document.createElement('p');
    newP.className = "titre-recherche";
    //Creation du label
    let newLabel = document.createElement('label');
    newLabel.append(recherche);
    newLabel.setAttribute("onclick", "selectionner_recherche(this)");
  

    //"Création" de l'image
    let croix = document.createElement('img')
    croix.src = "img/croix30.jpg";
    croix.className = "icone-croix";
    croix.setAttribute("onclick", "supprimer_recherche(this)");

    //Ajout du label et de l'image a p
    newP.append(newLabel);
    newP.append(croix);
    //Ajout de p dans la liste de recherche
    listeRecherche.append(newP);
  }
}


function supprimer_recherche(elt) {
	console.log("supprimer");
}


function selectionner_recherche(elt) {
	console.log("selectionner_recherche");
}


function init() {
	//TODO ...
}


function rechercher_nouvelles() {
	//TODO ...
}


function maj_resultats(res) {
	//TODO ...
}


function sauver_nouvelle(elt) {
	//TODO ...
}


function supprimer_nouvelle(elt) {
	//TODO ...
}
