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
}
model.supprimerRechercheCouranteNew = function(indice){
  model.recherche_courante_news.splice(indice, 1);
  let toConvert = model.recherche_vourante_news;
  localStorage.setItem(model.recherche_courante, JSON.stringify(toConvert));
}
model.setRechercheCouranteLocalStorage = function(){
  model.recherche_courante_news == null ? model.recherche_courante_news = [] : model.recherche_courante_news;
  let copie = model.recherche_courante_news;
  localStorage.setItem(model.recherche_courante, JSON.stringify(copie));
}
