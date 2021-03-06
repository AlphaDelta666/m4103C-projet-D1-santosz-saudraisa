//URL
var URL = "https://carl-vincent.fr/search-internships.php?data=";

var controler = {};
controler.selectionner_recherche = function(elt){
  //on modifie la zone_saisie
  view.set_zone_saisie(elt.innerHTML);
  //on modifie la variable recherche_courante_news
  model.setRechercheCouranteNew(elt.innerHTML);
  let res = elt.innerHTML;
  view.erase_zone_resultat();
  res = localStorage.getItem(res);
  if(res != null){
    res = model.ajust_data(res);
    controler.maj_resultats(res);
  }else{
    view.setNbResultat(0);
  }

}
controler.ajouter_recherche = function(){
  var recherche = view.get_zone_saisie().value;
  var indice = model.indexInRecherche(recherche);
  if(indice == -1){
    model.ajouter_recherche(recherche);
    view.setP(recherche);
  }
}
controler.supprimer_recherche= function(elt){
  let p = view.getParent(elt);
  let recherche = view.getTextLabel(p);
  let indice = model.indexInRecherche(recherche);
  view.removeRecherche(p);
  model.supprimer_recherche(indice);
  model.setLocalStorage();
}
controler.init = function(){
  if(model.getRecherchesLocalStorage()){
    model.checkLocalStorage();
    model.initRecherches();
    for(let i=0; i < model.getRecherchesLength(); i++){
      view.setP(model.getRechercheElem(i));
    }
  }
  view.get_zone_saisie().onkeypress = controler.autocomplete();
  view.get_zone_saisie().onkeypress = function(e){
    var e = window.event || e;
    let touche = e.keyCode;
    if(touche == 13){
      view.get_button_ok().click();
    }
  }
}
controler.rechercher_nouvelles = function(elt){
  model.modifrecherchecourante(view.rechercher_nouvelles(elt));
  let data = view.getdata();
  ajax_get_request(controler.maj_resultats, URL+data, true);
}

controler.maj_resultats = function(elt){
  view.setDisplayWait('none');
  //console.log(typeof elt);
  let resultats = JSON.parse(elt);
  //console.log(resultats);
  //console.log(typeof resultats);
  model.setRechercheCouranteNew(view.get_zone_saisie().value);
  view.setDivResultat(resultats, model.getRecherchesCouranteNews());

}
controler.sauver_nouvelle = function(elt){
  view.setImageSave(elt);
  let p = view.getParent(elt);
  let objet = view.createObject(p);
  if(indexOfResultat(model.getRecherchesCouranteNews(), objet) == -1){
    model.ajouterRechercheCouranteNew(objet);
  }

}

controler.supprimer_nouvelle = function(elt){
  view.setImageUnsave(elt);
  let p = view.getParent(elt);
  let objet = view.createObject(p);
  let indice = indexOfResultat(model.getRecherchesCouranteNews(), objet);
  if( indice != -1){
    model.supprimerRechercheCouranteNew(indice);
  }

}

controler.autocomplete = function(){
  console.log("passage");
  let recherches = model.recherches;
  let divRecherche = document.getElementById('nouvelle-recherche');
  if(document.getElementById('listeRecherche')){
    divRecherche.removeChild(document.getElementById('listeRecherche'));
  }
  let datalist = document.createElement('datalist');
  datalist.setAttribute('id', 'listeRecherche');

  for(let i=0; i < recherches.length; i++){
    let option = document.createElement('option');
    option.setAttribute('value', recherches[i]);
    datalist.append(option);
  }
  divRecherche.append(datalist);
  view.get_zone_saisie().setAttribute('list', 'listeRecherche');

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
