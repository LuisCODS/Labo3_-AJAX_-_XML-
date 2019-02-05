
// ===================================== CLASSE PRODUIT =====================================
//Classe
function Produit() {
    this.id;
    this.categorie;
    this.titre;
    this.prix;
    this.images=[];
} 
//Constructeur
Produit.prototype.Produit = function (id, categorie, titre, prix, images) {
    if (arguments.length == 0) {
        this.id = null;
        this.categorie = 3;
        this.titre = null;
        this.prix = 0;
        this.images = [];
    } else if (arguments[0] instanceof Produit) {
        this.id = arguments[0].id;
        this.categorie = arguments[0].categorie;
        this.titre = arguments[0].titre;
        this.prix = arguments[0].prix;
        this.images = arguments[0].images;
    } else {
        this.setId(id);
        this.setCategorie(categorie);
        this.setTitre(titre);
        this.setPrix(prix);
        this.setImages(images);
    }
} 
// getters et setters
Produit.prototype.getId = function () {
    return this.id;
}
Produit.prototype.getCategorie = function () {
    return this.categorie;
}
Produit.prototype.getTtire = function () {
    return this.titre;
}
Produit.prototype.getPrix = function () {
    return this.prix;
}
Produit.prototype.getImages = function () {
    return this.images;
}
Produit.prototype.setId = function (id) {
    this.id = id;
}
Produit.prototype.setCategorie = function (categorie) {
    this.categorie = categorie;
}
Produit.prototype.setTitre = function (titre) {
    this.titre = titre;
}
Produit.prototype.setPrix = function (prix) {
    this.prix = prix;
}
Produit.prototype.setImages = function (images) {
        this.images = images;
}
// méthodes
Produit.prototype.afficher = function () {
    var contenu = "<div class='col-lg-3 col-md-4'>";
		contenu+="<div class='product'>";
		contenu+="<div class='flip-container'>";
		contenu+="<div class='flipper'>";
		contenu+="<div class='front'><a href='detail.html'><img src='"+this.images[0]+"' alt='"+this.titre+"' class='img-fluid'></a></div>";
		contenu+="<div class='back'><a href='detail.html'><img src='"+this.images[1]+"' alt='"+this.titre+"' class='img-fluid'></a></div>";
		contenu+="</div></div>";
		contenu+="<a href='#' class='invisible'><img src='"+this.images[1]+"' alt='"+this.titre+"' class='img-fluid'></a>";
		contenu+="<div class='text'> <h3><a href='#'>"+this.titre+"</a></h3>";
		contenu+="<p class='price'><del></del>"+this.prix+"</p>";
		contenu+="<p onclick='ajouterAuPanier("+this.id+")' class='buttons'><a href='#' class='btn btn-primary'><i class='fa fa-shopping-cart'></i>Ajouter au panier</a></p>";
		contenu+="</div></div></div>";

    return contenu;
}
// ===================================== FIN - CLASSE PRODUIT  =====================================

var tableauProduitsXML, tableauProduits = new Array(), panier=[];

function ajouterAuPanier(id) { 
    if (existe(id)){
        for (var i = 0; i < panier.length; i++)
            if (panier[i].id==id) {
                panier[i].qte++;
                break;
            }
    }else panier.push({"id":id,"qte":1});
    zonePanier();
    console.log(panier);
 }
function existe(id) { 
    if (panier.length>0)
        for (var i = 0; i < panier.length; i++)
            if (panier[i].id==id)
                return true;
       return false;
}
function zonePanier() {
    var prixTotal=0, nbrProduits=0;
    if (panier.length>0) {
        for(var i in panier){
            leProduit=produitById(panier[i].id);
            prixTotal += parseFloat(leProduit.getPrix()) * panier[i].qte;
            nbrProduits+=panier[i].qte;
        }
    }
    $('#panier').html("("+nbrProduits+") " +prixTotal+" $");
}
function produitById(id) {
    for (var i in tableauProduits)
        if (parseInt(tableauProduits[i].id,10)==id)
            return tableauProduits[i]
}

$(document).ready(function () {
    chargerProuits();
});
function chargerProuits(){
	$.ajax({
		type:"GET",
		url:"data/produits.xml",
		dataType:"xml",
		success : function(liste){
			tableauProduitsXML=liste;
            RemplirTableauProduits();
            $("#nbrProduits").html("Affichage de <strong>"+tableauProduits.length+"</strong> produits dans le catalogue")
		},
		fail : function(){
			alert("GROS PROBLEME");
		}
	});
}

function RemplirTableauProduits() {
    var tab = tableauProduitsXML.getElementsByTagName("produit");
    var contenu="";
    for (var i = 0; i < tab.length; i++) {
        tableauProduits[i] = new Produit();
        var images = [tab[i].childNodes[9].childNodes[1].innerHTML,tab[i].childNodes[9].childNodes[3].innerHTML];
        tableauProduits[i].Produit(tab[i].childNodes[1].innerHTML, tab[i].childNodes[3].innerHTML, tab[i].childNodes[5].innerHTML, tab[i].childNodes[7].innerHTML, images);
        contenu+=tableauProduits[i].afficher();
    }
    $('#listeProduits').html(contenu);
}