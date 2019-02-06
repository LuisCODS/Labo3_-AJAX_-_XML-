
// ===================================== DEBUT - CLASSE PRODUIT =====================================
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
//FIN


// ===================================== VARIABLES GLOBAUX  =====================================
var tableauProduitsXML;
var tableauProduits = new Array();
var panier=[];
//FIN

// ===================================== METHODES  =====================================

//(step 1) MAIN
$(document).ready(function () {
    chargerProuits();
});

//(step 2)Fait la requête Ajax pour extraire les données provenant du fichier XML
function chargerProuits(){
	$.ajax({
		type:"GET",
		url:"data/produits.xml",
		dataType:"xml",
		success : function(liste){
			tableauProduitsXML = liste;// recoit la reference HTMLCollection(le tableau de tous les Produits)
            RemplirTableauProduits();//(step 3)
            // $("#nbrProduits").html("Affichage de <strong>"+tableauProduits.length+"</strong> produits dans le catalogue")
		},
		fail : function(){
			alert("GROS PROBLEME");
		}
	});
}

//(step 3) Remplir un Tableau avec TOUS les Produits: cree un array pour faire la transposition des données importées en Objets<Produit>
function RemplirTableauProduits() {
	//extrait les Produits du tableau HTMLCollection vers un nouveau tableau.
    var tableau = tableauProduitsXML.getElementsByTagName("produit");
	//teste
	console.log(tableau);
    // var produitToDisplay="";	
	////transition des donnes...
    for (var i = 0; i < tableau.length; i++) 
	{			
		//pour chaque indice un nouveau Produit vide...	
        tableauProduits[i] = new Produit(); 	
		//cree un tableau avec 1 image par indice 
        var images = [
						//chemin ou se retrouve l'image.
						tableau[i].childNodes[9].childNodes[1].innerHTML,
						tableau[i].childNodes[9].childNodes[3].innerHTML
					 ];
		//peuple les proprietes du Produit vide en fournissant a son constructeur les 5 parametres...
        tableauProduits[i].Produit(
									tableau[i].childNodes[1].innerHTML,	//id
									tableau[i].childNodes[3].innerHTML, // categorie
									tableau[i].childNodes[5].innerHTML, // titre
									tableau[i].childNodes[7].innerHTML,	// prix
									images // le tableau image
								   );
		//fait appel à la methode afficher() du Produit à l'indice i.
		//...le retour c'est un Produit en format HTML avec l'ensemble des ses proprietes.
        // produitToDisplay+=tableauProduits[i].afficher();
    }
	//renvois à la DIV le Produit gardé en reference pour l'afficher.
    // $('#listeProduits').html(produitToDisplay);
	$('#listeProduits').html("<img src='img/produits/homePicture.jpg' class='img-fluid'>");
	
}

// Produit.prototype.displayHome = function () {
    // var contenu = "<div class='col-lg-3 col-md-4'>";
		// contenu+="<div class='product'>";
		// contenu+="<div class='flip-container'>";
		// contenu+="<div class='flipper'>";
		// contenu+="<div class='front'><a href='detail.html'><img src='+"img/produits/produit_ID_1"+' alt='"+this.titre+"' class='img-fluid'></a></div>";
		// contenu+="<div class='back'><a href='detail.html'><img src='"+this.images[1]+"' alt='"+this.titre+"' class='img-fluid'></a></div>";
		// contenu+="</div></div>";
		// contenu+="<a href='#' class='invisible'><img src='"+this.images[1]+"' alt='"+this.titre+"' class='img-fluid'></a>";
		// contenu+="<div class='text'> <h3><a href='#'>"+this.titre+"</a></h3>";
		// contenu+="<p class='price'><del></del>"+this.prix+"</p>";
		// contenu+="<p onclick='ajouterAuPanier("+this.id+")' class='buttons'><a href='#' class='btn btn-primary'><i class='fa fa-shopping-cart'></i>Ajouter au panier</a></p>";
		// contenu+="</div></div></div>";

    // return contenu;
// }

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

//Display toutes les proprietes d'un Produit en format HTML
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














