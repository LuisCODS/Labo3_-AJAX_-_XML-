/*
*
* ======================================================================
* 				DEBUT - CLASSE PRODUIT
* ======================================================================
*
*/
//
//Classe
// 
function Produit() {
    this.id;
    this.categorie;
    this.titre;
    this.prix;
    this.images=[];
} 
//
//Constructeur
// 
Produit.prototype.Produit = function (id, categorie, titre, prix, images) {
	//... PAR DÉFAUT
    if (arguments.length == 0) {
        this.id = null;
        this.categorie = null;
        this.titre = null;
        this.prix = 0;
        this.images = [];
    } 
	//...PAR  COPIE
	else if (arguments[0] instanceof Produit) {
        this.id = arguments[0].id;
        this.categorie = arguments[0].categorie;
        this.titre = arguments[0].titre;
        this.prix = arguments[0].prix;
        this.images = arguments[0].images;
    }
	//...PAR PARAMÈTRÉ
	else {
        this.setId(id);
        this.setCategorie(categorie);
        this.setTitre(titre);
        this.setPrix(prix);
        this.setImages(images);
    }
} 
// 
// 			MÉTHODES «GET» ET «SET»
// 
Produit.prototype.getId = function () {
    return this.id;
}
Produit.prototype.getCategorie = function () {
    return this.categorie;
}
Produit.prototype.getTtitre = function () {
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
// 
//		VARIABLES GLOBAUX
//  
var tableauProduitsXML;
var tableauProduits = new Array(); //contien tous les produits
var panier=[];
 
/*
 *METHODE: Display toutes les proprietes d'un Produit en format HTML* 
 * href='javascript::'
*/
Produit.prototype.afficher = function () {
    var contenu = "<div class='col-lg-3 col-md-4'>";
		contenu+="<div class='product'>";
		contenu+="<div class='flip-container'>";
		contenu+="<div class='flipper'>";
		contenu+="<div class='front'><a href='detail.html'><img src='"+this.images[0]+"' alt='"+this.titre+"' class='img-fluid'></a></div>";
		contenu+="<div class='back'><a href='detail.html'><img src='"+this.images[1]+"'  alt='"+this.titre+"' class='img-fluid'></a></div>";
		contenu+="</div></div>";
		contenu+="<a href='#' class='invisible'><img src='"+this.images[1]+"'  alt='"+this.titre+"' class='img-fluid'></a>";
		contenu+="<div class='text'> <h3><a href='#'>"+this.titre+"</a></h3>";
		contenu+="<p class='price'><del></del>"+this.prix+"</p>";
		contenu+="<p onclick='ajouterAuPanier("+this.id+")' class='buttons'><a href='#' class='btn btn-primary'><i class='fa fa-shopping-cart'></i>Ajouter au panier</a></p>";
		contenu+="</div></div></div>";

    return contenu;
}
/*
*
* ======================================================================
* 				FIN - CLASSE PRODUIT 
* ======================================================================
*
*/

 
  
/*
* MAIN
*/
$(document).ready(function () {
    chargerProduits();
});
/*
* METHODE: Fait la requête Ajax pour charger les données 
* ...provenant du fichier XML dans la var global. tableauProduitsXML.
* tableauProduitsXML: recoit la reference HTMLCollection(le tableau de tous les Produits)
*/
function chargerProduits(){
	$.ajax({
		type:"GET",
		url:"data/produits.xml",
		dataType:"xml",
		success : function(liste){
			tableauProduitsXML = liste;
            RemplirTableauProduits();
            // $("#nbrProduits").html("Affichage de <strong>"+tableauProduits.length+"</strong> produits dans le catalogue")
		},
		fail : function(){
			alert("GROS PROBLEME");
		}
	});
}
/*
* METHODE: Fait la requête Ajax pour charger la page contact.html  sans load.
*/
function loadExternePage(){
	 //document.getElementById("affichageZone").style.visibility = "hidden";
	 $('#listeProduits').html("");
	 chargerProduits();
	// if(thePage)
	// {
		// $.ajax(
		// {
			// type:"POST",
			// url:thePage,
			// dataType:"html",
			// success : function(data){
				// charge la page externe dans la div
				  // $('#listeProduits').html(data);
			// },
		// });
	// }
}
/*
* METHODE: Remplir un tableauDOM avec TOUS les Produits.
* Il fait la transposition des données(XML) provenant du tableauProduitsXML
* pour transposer en Objets<Produit>
*/
function RemplirTableauProduits() {

    var tableauDOM = tableauProduitsXML.getElementsByTagName("produit");
	console.log(tableauDOM);
    var produitToDisplay="";	
	
    for (var i = 0; i < tableauDOM.length; i++) 
	{			
        tableauProduits[i] = new Produit(); 	
        var images = [
						//chemin ou se retrouve l'image.
						tableauDOM[i].childNodes[9].childNodes[1].innerHTML,
						tableauDOM[i].childNodes[9].childNodes[3].innerHTML
					 ];
		//peuple les proprietes du Produit en lui fournissant au constructeur les 5 parametres...
        tableauProduits[i].Produit(
									tableauDOM[i].childNodes[1].innerHTML,	//id
									tableauDOM[i].childNodes[3].innerHTML, // categorie
									tableauDOM[i].childNodes[5].innerHTML, // titre
									tableauDOM[i].childNodes[7].innerHTML,	// prix
									images // le tableauDOM image
								   );
		//fait appel à la methode afficher() du Produit à l'indice i.
		//...le retour c'est un Produit en format HTML avec l'ensemble des ses proprietes.
        produitToDisplay+=tableauProduits[i].afficher();
    }
	//renvois à la DIV le Produit gardé en reference pour l'afficher.
    $('#listeProduits').html(produitToDisplay);
	// $('#listeProduits').html("<img src='img/produits/homePicture.jpg' height="+1100+" width="+1100+" class='img-fluid'>");	
}

/*
 * METHODE: Affiche les produit de la categorie homme*
*/
function showProduistHomme(tag) {
	
	var textLien = tag.innerHTML;
	var tableau = tableauProduitsXML.getElementsByTagName("produit");
    var produitToDisplay="";
	var produitName =	"";
	var genre='';
	
    for (var i = 0; i < tableau.length; i++) 
	{	
		 produitName = tableau[i].getAttribute("class");
		 genre 	     =  tableau[i].getElementsByTagName("categorie")[0].firstChild.nodeValue;
		 
		if(produitName == textLien && genre == "Homme")
			produitToDisplay+=tableauProduits[i].afficher();
    }
    $('#listeProduits').html(produitToDisplay);
}
/*
 * METHODE: Affiche les produit de la categorie Femme*
*/
function showProduitFemme(tag) {
	
	var textLien = tag.innerHTML;
	var tableau = tableauProduitsXML.getElementsByTagName("produit");
    var produitToDisplay="";
	var produitName =	"";
	var genre='';
	
    for (var i = 0; i < tableau.length; i++) 
	{	
		 produitName = tableau[i].getAttribute("class");
		 genre 	     =  tableau[i].getElementsByTagName("categorie")[0].firstChild.nodeValue;
		 
		if(produitName == textLien && genre == "Femme")
			produitToDisplay+=tableauProduits[i].afficher();
    }
    $('#listeProduits').html(produitToDisplay);

}
/*
 * METHODE: Affiche les produit de la categorie kid*
*/
function showProduitsKid(tag) {
	
	var textLien = tag.innerHTML;
	var tableau = tableauProduitsXML.getElementsByTagName("produit");
    var produitToDisplay="";
	var produitName =	"";
	var genre='';
	
    for (var i = 0; i < tableau.length; i++) 
	{	
		 produitName = tableau[i].getAttribute("class");
		 genre 	     =  tableau[i].getElementsByTagName("categorie")[0].firstChild.nodeValue;
		 
		if(produitName == textLien && genre == "Kid")
			produitToDisplay+=tableauProduits[i].afficher();
    }
    $('#listeProduits').html(produitToDisplay);
}

/*
 * METHODE: ajoute les article au Panier
*/
function ajouterAuPanier(id) { 
    if (existe(id))
	{
        for (var i = 0; i < panier.length; i++)
            if (panier[i].id==id) {
                panier[i].qte++;
                break;
            }
    }else{ 
		panier.push({"id":id,"qte":1});				
	}		
	zonePanier();
    console.log(panier);
 }
/*
 * METHODE: Verifie si un produit existe
*/
function existe(id) { 
    if (panier.length > 0)
        for (var i = 0; i < panier.length; i++)
            if (panier[i].id==id)
                return true;
       return false;
}
/*
 *METHODE:
*/
function zonePanier() 
{
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
/*
 *METHODE: returne un produit correspondant à un ID donnée.
 * tableauProduits: contien tous les produits
*/
function produitById(id) {
	
    for (var i in tableauProduits)
        if (parseInt(tableauProduits[i].id,10)==id)
            return tableauProduits[i]
}











