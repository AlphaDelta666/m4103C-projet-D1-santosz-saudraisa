var view = {};
view.get_button_ok = function(){
  return document.getElementById('OK');
}
view.set_zone_saisie = function(elt){
  document.getElementById("zone_saisie").value = elt;
}
view.get_zone_saisie = function(){
  return document.getElementById('zone_saisie');
}
view.erase_zone_resultat = function(){
  let container = document.getElementById("resultats");
  while(container.firstChild){
    container.removeChild(container.firstChild);
  }
}
view.setP = function(elt){ // VIEW.JS
	let newP = document.createElement('p');
	newP.className = "titre-recherche";
	//Creation du label
	let newLabel = document.createElement('label');
	newLabel.append(elt);
	newLabel.setAttribute("onclick", "controler.selectionner_recherche(this)");


	//"Création" de l'image
	let croix = document.createElement('img')
	croix.src = "img/croix30.jpg";
	croix.className = "icone-croix";
	croix.setAttribute("onclick", "controler.supprimer_recherche(this)");

	//Ajout du label et de l'image a p
	newP.append(newLabel);
	newP.append(croix);
	//Ajout de p dans la liste de recherche
	document.getElementById('recherches-stockees').append(newP);
}
view.getParent = function(elt){
  return elt.parentNode;
}
view.getTextLabel = function(elt){
  return elt.firstChild.innerHTML;
}
view.removeRecherche = function(elt){
  document.getElementById('recherches-stockees').removeChild(elt);
}

view.rechercher_nouvelles = function(elt){
  let resultats = document.getElementById("resultats");
	resultats.innerHTML = '';
  return document.getElementById('zone_saisie').value;
}

view.getdata = function(){
  let wait = document.getElementById("wait");
  wait.style.display = 'block';
  return document.getElementById("zone_saisie").value;
}

view.setDisplayWait = function(elt){
  document.getElementById("wait").style.display = elt;
}
view.setDivResultat = function(elt, elt2){
  let divRes = document.getElementById("resultats");
	// console.log(resultats);
	// console.log(recherche_courante_news);
	for(let i=0; i < elt.length; i++){
		//Création de l'élément P contenant les informations
		let newP = document.createElement('p');
		newP.className = 'titre_result';

		let newA = document.createElement('a');
		newA.className = 'titre_news';
		newA.href = elt[i].url;
		newA.target = '_blank';
		newA.innerHTML = decodeHtmlEntities(elt[i].titre);

		let spanDate = document.createElement('span');
		spanDate.className = 'date_news';
    elt[i].date = formatDate(elt[i].date);

		spanDate.innerHTML = elt[i].date;

		let spanImg = document.createElement('span');
		spanImg.className = 'action_news';
		let img = document.createElement('img');

		console.log(elt2);
		console.log(elt[i]);
		if(indexOfResultat(elt2, elt[i]) == -1){
			spanImg.setAttribute('onclick', 'controler.sauver_nouvelle(this)');
			img.src = 'img/horloge15.jpg';
		}else{
			spanImg.setAttribute('onclick', 'controler.supprimer_nouvelle(this)');
			img.src = 'img/disk15.jpg'
		}


		spanImg.append(img);
		newP.append(newA);
		newP.append(spanDate);
		newP.append(spanImg);

		divRes.append(newP);
	}
}
view.setImageSave = function(elt){
  elt.firstChild.src = 'img/disk15.jpg';
  elt.setAttribute('onclick', 'controler.supprimer_nouvelle(this)');
}
view.createObject = function(elt){
  let objet = new Object();
  objet.titre = elt.childNodes[0].innerHTML;
  objet.date = elt.childNodes[1].innerHTML;
  objet.url = elt.childNodes[0].href;

  return objet;
}

view.setImageUnsave = function(elt){
  elt.firstChild.src = 'img/horloge15.jpg';
	elt.setAttribute('onclick', 'controler.sauver_nouvelle(this)');
}
