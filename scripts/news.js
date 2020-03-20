// Tableau contenant des chaines de caractères correspondant aux recherches stockées
var recherches = [];
// Chaine de caractères correspondant à la recherche courante
var recherche_courante;
// Tableau d'objets de type resultats (avec titre, date et url)
var recherche_courante_news = [];
//Ensemble des paragraphes
var listeRecherche = document.getElementById('recherches-stockees');


function ajouter_recherche() {
	var recherche = document.getElementById('zone_saisie').value;
  //Retourne la valeur de l'indice de recherches[recherche] ou -1 si il n'y est pas
  var a = recherches.indexOf(recherche);
  if(a == -1){
    //Ajout dans l'array reecherches
    recherches.push(recherche);

    //Ajout de la div
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
	//console.log("supprimer");
  //Récupère le paragraphe contenant la croix cliqué
  let p = elt.parentNode;
  //On récupère le texte dans le label du p qu'on veux supprimer
  let recherche = p.firstChild.innerHTML;
  let indice = recherches.indexOf(recherche);
  //On supprime 1 élément à partir de notre indice donc on supprime notre recherche
  recherches.splice(indice, 1);
  //Supprime le paragraphe de la liste de recherche
  listeRecherche.removeChild(p);
  console.log(recherches);
}


function selectionner_recherche(elt) {
//	console.log("selectionner_recherche");
  document.getElementById("zone_saisie").value = elt.innerHTML;
  recherche_courante = elt.innerHTML;
  console.log(recherche_courante);
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
