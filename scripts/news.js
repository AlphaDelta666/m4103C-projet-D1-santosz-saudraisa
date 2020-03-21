// Tableau contenant des chaines de caractères correspondant aux recherches stockées
var recherches = [];
// Chaine de caractères correspondant à la recherche courante
var recherche_courante;
// Tableau d'objets de type resultats (avec titre, date et url)
var recherche_courante_news = [];
//Ensemble des paragraphes
var listeRecherche = document.getElementById('recherches-stockees');
//Url des données
var URL = "https://carl-vincent.fr/search-internships.php?data=";


function setP(elt){
	let newP = document.createElement('p');
	newP.className = "titre-recherche";
	//Creation du label
	let newLabel = document.createElement('label');
	newLabel.append(elt);
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

function ajouter_recherche() {
	var recherche = document.getElementById('zone_saisie').value;
  //Retourne la valeur de l'indice de recherches[recherche] ou -1 si il n'y est pas
  var a = recherches.indexOf(recherche);
  if(a == -1){
    //Ajout dans l'array reecherches
    recherches.push(recherche);

    //Ajout de la div
    //Création de p
		setP(recherche);
		//Impossible de gérer le temps sans faire des appel incéssant

		localStorage.setItem("recherches", JSON.stringify(recherches));
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

	localStorage.setItem("recherches", JSON.stringify(recherches));

}


function selectionner_recherche(elt) {
//	console.log("selectionner_recherche");
  document.getElementById("zone_saisie").value = elt.innerHTML;
  recherche_courante = elt.innerHTML;
}


function init() {
	if(JSON.parse(localStorage.getItem("recherches"))){
		recherches = JSON.parse(localStorage.getItem("recherches"));
		for(let i=0; i < recherches.length; i++){
			setP(recherches[i]);
		}
	}
}


function rechercher_nouvelles() {
	//Vidage de la div resultats
	let resultats = document.getElementById("resultats");
	resultats.innerHTML = '';

	let wait = document.getElementById("wait");
	wait.style.display = 'block';
	let data = document.getElementById("zone_saisie").value
	console.log(data);
	ajax_get_request(maj_resultats, URL+data, true);
}


function maj_resultats(res) {
//On cache le truc de chargement
	document.getElementById("wait").style.display = 'none';
	//affichage des résultat
	//passage de res en format Objets
	let resultats = JSON.parse(res);
	let divRes = document.getElementById("resultats");
	console.log(formatDate(resultats[0].date));
	for(let i=0; i < resultats.length; i++){
		let newP = document.createElement('p');
		newP.className = 'titre_result';

		let newA = document.createElement('a');
		newA.className = 'titre_news';
		newA.href = resultats[i].url;
		newA.target = '_blank';
		newA.innerHTML = decodeHtmlEntities(resultats[i].titre);

		let spanDate = document.createElement('span');
		spanDate.className = 'date_news';
		spanDate.innerHTML = formatDate(resultats[i].date);

		let spanImg = document.createElement('span');
		spanImg.className = 'action_news';
		spanImg.onclick = 'sauver_nouvelle(this)';

		let img = document.createElement('img');
		img.src = 'img/horloge15.jpg';

		spanImg.append(img);
		newP.append(newA);
		newP.append(spanDate);
		newP.append(spanImg);

		divRes.append(newP);
	}

	//TODO ...
}


function sauver_nouvelle(elt) {
	//TODO ...
}


function supprimer_nouvelle(elt) {
	//TODO ...
}

function ajax_get_request(callback, url, async) {
	// Instanciation d'un objet XHR
	var xhr = new XMLHttpRequest();

	// Définition de la fonction à exécuter à chaque changement d'état
	xhr.onreadystatechange = function(){
		/* readyState permet de connaître l'état de la requête :
			=> 0: L'objet XHR a été créé, mais pas encore initialisé
			=> 1: L'objet XHR a été créé, mais pas encore envoyé
			=> 2: La méthode send vient d'être appelée
			=> 3: Le serveur traite les informations et a commencé à renvoyer des données
			=> 4: Le serveur a fini son travail, et toutes les données sont réceptionnées
		*/
		if (callback && xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			// Si une fonction callback est définie + que le serveur a fini son travail
			// + que le code d'état indique que tout s'est bien passé
			// => On appelle la fonction callback en passant en paramètre
			//		les données récupérées sous forme de texte brut
			callback(xhr.responseText);
		}
	};

	// Initialisation de l'objet puis envoi de la requête
	xhr.open("GET", url, async);
	xhr.send();

}
