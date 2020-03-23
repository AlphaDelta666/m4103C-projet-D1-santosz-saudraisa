var model = {};
model.recherche_courante = "";
model.recherches = [];
model.recherche_courante_news = [];
model.setRechercheCouranteNew = function(elt){
  model.recherche_courante_news = JSON.parse(localStorage.getItem(elt));
  model.recherche_courante_news == null ? model.recherche_courante_news = [] : model.recherche_courante_news;
}
model.indexInRecherche = function(elt){
  return model.recherches.indexOf(elt);
}
model.ajouter_recherche = function(elt){
  model.recherches.push(elt);
  model.setLocalStorage(model.recherches);
  //ajout a la date actuelle de milliseconde->seconde->minute->heure->jours nbJours
  localStorage.setItem("timeRecherches", Date.now() + (1000*60*60*24*1000));//dateSauvegarde+1000jour

}
model.supprimer_recherche = function(elt){
  model.recherches.splice(elt, 1);
}

model.setLocalStorage = function(elt){
  localStorage.setItem("recherches", JSON.stringify(elt));
}
model.getRecherchesLocalStorage = function(){
  return JSON.parse(localStorage.getItem("recherches"));
}
model.initRecherches = function(){
  model.recherches = JSON.parse(localStorage.getItem("recherches"));
}
model.getRecherchesLength = function(){
  return model.recherches.length;
}
model.getRechercheElem = function(elt){
  return model.recherches[elt];
}
model.getRecherchesCouranteNews = function(){
  return model.recherche_courante_news;
}

model.modifrecherchecourante = function(value){
  model.recherche_courante = value;
}
model.ajouterRechercheCouranteNew = function(elt){
  model.recherche_courante_news.push(elt);
  let toConvert = model.recherche_courante_news;
  localStorage.setItem(model.recherche_courante, JSON.stringify(toConvert));
  localStorage.setItem("time"+model.recherche_courante, Date.now() + (1000*60*60*24*1000));
}
model.supprimerRechercheCouranteNew = function(indice){
  model.recherche_courante_news.splice(indice, 1);
  let toConvert = model.recherche_vourante_news;
  localStorage.setItem(model.recherche_courante, JSON.stringify(toConvert));
  localStorage.setItem("time"+model.recherche_courante, Date.now() + (1000*60*60*24*1000));
}
model.setRechercheCouranteLocalStorage = function(){
  model.recherche_courante_news == null ? model.recherche_courante_news = [] : model.recherche_courante_news;
  let copie = model.recherche_courante_news;
  localStorage.setItem(model.recherche_courante, JSON.stringify(copie));
}

model.checkLocalStorage = function(){
  let tempsActuelle = Date.now();
  for(let i=0; i< localStorage.length; i++){
    let key = localStorage.key(i);
    console.log(key);
    console.log(key.substring(0,4) );
    if(key.substring(0,4) == 'time'){
      let tempsRecherches = localStorage.getItem("timeRecherches");
      console.log("chektime");
      if(tempsActuelle >= tempsRecherches){
        localStorage.setItem("recherches", null);
      }
    }
  }

}
