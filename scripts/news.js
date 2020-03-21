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
  //recherche_courante = elt.innerHTML;
	recherche_courante_news = JSON.parse(localStorage.getItem(elt.innerHTML));
	recherche_courante_news == null ? recherche_courante_news = [] : recherche_courante_news;
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
	//Redefinition de la variable recherche_courante
	recherche_courante = document.getElementById('zone_saisie').value;

	let wait = document.getElementById("wait");
	wait.style.display = 'block';
	let data = document.getElementById("zone_saisie").value
	//console.log(data);
	ajax_get_request(maj_resultats, URL+data, true);
}


function maj_resultats(res) {
//On cache le truc de chargement
	document.getElementById("wait").style.display = 'none';
	//affichage des résultat
	//passage de res en format Objets
	let resultats = JSON.parse(res);
	let divRes = document.getElementById("resultats");
	// console.log(resultats);
	// console.log(recherche_courante_news);
	for(let i=0; i < resultats.length; i++){
		//Création de l'élément P contenant les informations
		let newP = document.createElement('p');
		newP.className = 'titre_result';

		let newA = document.createElement('a');
		newA.className = 'titre_news';
		newA.href = resultats[i].url;
		newA.target = '_blank';
		newA.innerHTML = decodeHtmlEntities(resultats[i].titre);

		let spanDate = document.createElement('span');
		spanDate.className = 'date_news';
		resultats[i].date = formatDate(resultats[i].date);
		spanDate.innerHTML = resultats[i].date;

		let spanImg = document.createElement('span');
		spanImg.className = 'action_news';
		let img = document.createElement('img');

		console.log(recherche_courante_news);
		console.log(resultats[i]);
		if(indexOfResultat(recherche_courante_news, resultats[i]) == -1){
			spanImg.setAttribute('onclick', 'sauver_nouvelle(this)');
			img.src = 'img/horloge15.jpg';
		}else{
			spanImg.setAttribute('onclick', 'supprimer_nouvelle(this)');
			img.src = 'img/disk15.jpg'
		}


		spanImg.append(img);
		newP.append(newA);
		newP.append(spanDate);
		newP.append(spanImg);

		divRes.append(newP);
	}

}


function sauver_nouvelle(elt) {
	elt.firstChild.src = 'img/disk15.jpg'
	elt.setAttribute('onclick', 'supprimer_nouvelle(this)');

	let p = elt.parentNode;

	let objet = new Object();
	objet.titre = p.childNodes[0].innerHTML;
	objet.date = p.childNodes[1].innerHTML;
	objet.url = p.childNodes[0].href;

	//Si recherche est null on le redefinie sinon c'est la marde
	if(indexOfResultat(recherche_courante_news, objet) == -1){
		recherche_courante_news.push(objet);
	}
	//console.log(recherche_courante_news);

	//"Cookie"
	//console.log(document.getElementById('zone_saisie').value);
	let toConvert = recherche_courante_news;
	localStorage.setItem(recherche_courante, JSON.stringify(toConvert));
	//TODO ...
}


function supprimer_nouvelle(elt) {
	elt.firstChild.src = 'img/horloge15.jpg';
	elt.setAttribute('onclick', 'sauver_nouvelle(this)');

	let p = elt.parentNode;

	let objet = new Object();
	objet.titre = p.childNodes[0].innerHTML;
	objet.date = p.childNodes[1].innerHTML;
	objet.url = p.childNodes[0].href;

	let index = indexOfResultat(recherche_courante_news, objet);
	if( index != -1){
		recherche_courante_news.splice(index, 1);
		//On s'assure de toujour avoir recherche_vourante_nws de définie
		recherche_courante_news == null ? recherche_courante_news = [] : recherche_courante_news;
		let toConvert = recherche_vourante_news;
		localStorage.setItem(recherche_courante, JSON.stringify(toConvert));
	}
	//console.log(recherche_courante_news);

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
