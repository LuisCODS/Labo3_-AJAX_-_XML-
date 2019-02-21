//Classe Produit
function Produit() {
    this.id = null;
    this.categorie = null;
    this.titre = null;
    this.prix = null;
    this.images = [];
} //fin de la classe Voiture
Produit.prototype.Produit = function (id, zone, categorie, titre, prix, images) {
    if (arguments.length == 0) {
        this.id = null;
        this.zone = null;
        this.categorie = 3;
        this.titre = null;
        this.prix = 0;
        this.images = [];
    } else if (arguments[0] instanceof Produit) {
        this.id = arguments[0].id;
        this.zone = arguments[0].zone;
        this.categorie = arguments[0].categorie;
        this.titre = arguments[0].titre;
        this.prix = arguments[0].prix;
        this.images = arguments[0].images;
    } else {
        this.setId(id);
        this.setZone(zone);
        this.setCategorie(categorie);
        this.setTitre(titre);
        this.setPrix(prix);
        this.setImages(images);
    }
}; //fin des constructeurs

Produit.prototype.getId = function () {
    return this.id;
};
Produit.prototype.getZone = function () {
    return this.zone;
};
Produit.prototype.getCategorie = function () {
    return this.categorie;
};

Produit.prototype.getTtire = function () {
    return this.titre;
};
Produit.prototype.getPrix = function () {
    return this.prix;
};
Produit.prototype.getImages = function () {
    return this.images;
};
Produit.prototype.setId = function (id) {
    this.id = id;
};

Produit.prototype.setZone = function (zone) {
    this.zone = zone;
};
Produit.prototype.setCategorie = function (categorie) {
    this.categorie = categorie;
};
Produit.prototype.setTitre = function (titre) {
    this.titre = titre;
};
Produit.prototype.setPrix = function (prix) {
    this.prix = prix;
};
Produit.prototype.setImages = function (images) {
    this.images = images;
};

Produit.prototype.afficher = function () {
    var contenu = "<div class='col-lg-4 col-md-4'>";
    contenu += "<div class='product'>";
    contenu += "<div class='flip-container'>";
    contenu += "<div class='flipper'>";

    contenu += "<div class='front'><a href='#/'><img src='" + this.images[0] + "' alt='" + this.titre + "' class='img-fluid'></a></div>";
    contenu += "<div class='back'><a href='#/'><img src='" + this.images[1] + "' alt='" + this.titre + "' class='img-fluid'></a></div>";
    contenu += "</div></div>";
    contenu += "<a href='#/' class='invisible'><img src='" + this.images[1] + "' alt='" + this.titre + "' class='img-fluid'></a>";
    contenu += "<div class='text'> <h3><a href='#/'>" + this.titre + "</a></h3>";
    contenu += "<div class='ribbon sale'><div class='theribbon'>" + this.getCategorie() + "</div><div class='ribbon-background'></div></div>";
    contenu += "<div class='ribbon new'><div class='theribbon'>" + this.getZone() + "</div><div class='ribbon-background'></div></div>";
    contenu += "<p class='buttons'><a href='#/' class='btn btn-outline-secondary'>" + this.prix + " <i class='fab fa-btc'></i></a><a onclick='ajouterAuPanier(" + this.id + ")' href='#/' class='btn btn-primary'><i class='fa fa-shopping-cart'></i>Ajouter au panier</a></p>";
    contenu += "</div></div></div>";

    return contenu;
};

//Charger les produits lorsque le DOM sera prêt
$(document).ready(function () {
    $('.panier').html("Panier vide");
    chargerProuits();
});


//Variables
var tableauProduitsXML, tableauProduits = [], panier = [];

//Ajouter id et qté dans un tableau json
function ajouterAuPanier(id) {
    if (existe(id)) {
        for (var i = 0; i < panier.length; i++)
            if (panier[i].id == id) {
                panier[i].qte++;
                break;
            }
    } else panier.push({
        "id": id,
        "qte": 1
    });
    zonePanier();
}

//Vérifier si le produit existe dans le tableau des produits
function existe(id) {
    if (panier.length > 0)
        for (var i = 0; i < panier.length; i++)
            if (panier[i].id == id)
                return true;
    return false;
}

//Affichage de la zone panier
var prixTotal = 0, nbrProduits = 0;

function zonePanier() {
    if (panier.length > 0) {
        prixTotal = 0;
        nbrProduits = 0;
        for (var i in panier) {
            leProduit = produitById(panier[i].id);
            prixTotal += parseFloat(leProduit.getPrix()) * panier[i].qte;
            nbrProduits += panier[i].qte;
        }
        $('.panier').html("(" + nbrProduits + ") " + prixTotal + " <i class='fab fa-btc'></i>");
    } else
        $('.panier').html("Panier vide");
}

function majDonneesPanier() {
    if (panier.length > 0) {
        $('#nbrProduitsPanier').html("Vous avez " + panier.length + " produits dans votre panier");
        $('#totalPanier').html(prixTotal + " <i class='fab fa-btc'></i>");
        $('#sousTotal').html(prixTotal + " <i class='fab fa-btc'></i>");
        $('#shipping').html((prixTotal * 0.05).toFixed(2) + " <i class='fab fa-btc'></i>");
        $('#taxe').html((prixTotal * 0.1).toFixed(2) + " <i class='fab fa-btc'></i>");
        var total = ((prixTotal * 0.1) + (prixTotal * 0.05) + prixTotal).toFixed(2);
        $('#total').html(total + " <i class='fab fa-btc'></i>");
    } else {
        $('#nbrProduitsPanier').html("Vous avez " + panier.length + " produits dans votre panier");
        $('#totalPanier').html("0 <i class='fab fa-btc'></i>");
        $('#sousTotal').html("0 <i class='fab fa-btc'></i>");
        $('#shipping').html("0 <i class='fab fa-btc'></i>");
        $('#taxe').html("0 <i class='fab fa-btc'></i>");
        $('#total').html("0 <i class='fab fa-btc'></i>");
    }
}
//Supprimer un produit du panier
function supprimerDuPanier(id) {
    for (var i in panier)
        if (panier[i].id == id)
            panier.splice(panier.indexOf(panier[i]), 1);
    zonePanier();
    $('#ligneProduit').html(lignesProduitsPanier());
    majDonneesPanier();
}

//Les lignes des produits dans la page panier
function lignesProduitsPanier() {
    $('#ligneProduit').html("");
    var contenu = "";
    for (var i in panier) {
        produit = produitById(panier[i].id);
        contenu += '<tr>';
        contenu += '<td><a><img src="' + produit.images[0] + '" alt="' + produit.titre + '"></a></td>';
        contenu += '<td><a>' + produit.titre + '</a></td>';
        contenu += '<td>' + panier[i].qte + '</td>';
        contenu += '<td>' + produit.prix + '</td>';
        contenu += '<td>' + produit.prix * panier[i].qte + '</td>';
        contenu += '<td><a onclick="supprimerDuPanier(' + produit.id + ')" href="#/"><i class="fas fa-trash-alt"></i></a></td>';
        contenu += '</tr>';
    }
    return contenu;
}

//Recherche de produit par id
function produitById(id) {
    for (var i in tableauProduits)
        if (parseInt(tableauProduits[i].id, 10) == id)
            return tableauProduits[i];
}
//Importer les produits du fichier XML
function chargerProuits() {
    $.ajax({
        type: "GET",
        url: "data/produits.xml",
        dataType: "xml",
        success: function (liste) {
            tableauProduitsXML = liste;
            RemplirTableauProduits();
        },
        fail: function () {
            alert("GROS PROBLEME");
        }
    });
}

//Remplir le tableaux de type Produit par les produits importés
function RemplirTableauProduits() {
    var produitsHTML = "";
    var tab = tableauProduitsXML.getElementsByTagName("produit");
    $('#page').append("<div id='listeProduits' class='row products'>");
    for (var i = 0; i < tab.length; i++) {
        tableauProduits[i] = new Produit();
        var images = [tab[i].childNodes[9].childNodes[1].innerHTML, tab[i].childNodes[9].childNodes[3].innerHTML];
        tableauProduits[i].Produit(
            tab[i].children[0].firstChild.nodeValue,
            tab[i].firstElementChild.attributes[0].nodeValue,
            tab[i].children[1].firstChild.nodeValue,
            tab[i].children[2].firstChild.nodeValue,
            tab[i].children[3].firstChild.nodeValue,
            images);
        produitsHTML += tableauProduits[i].afficher();
    }
    produitsHTML += "</div>";
    //Menu
    $('#menu').append(menu());
    $('#listeProduits').html(produitsHTML);
}

//Page de contact
function contact() {
    $('#page').html("");
    $('#page').load("./contact.html");
}
//Page d'accueil
function accueil() {
    $('#page').html("");
    chargerProuits();
}

//Page panier
function afficherPanier() {
    $('#page').html("");
    $('#page').load("./panier.html");
}

function filtrer(categorie) {
    var produitsHTML = "";
    $('#page').html("");
    $('#page').append("<div id='listeProduits' class='row products'>");
    for (var i in tableauProduits) {
        if (tableauProduits[i].getCategorie() == categorie) {
            produitsHTML += tableauProduits[i].afficher();
        }
    }
    //produitsHTML += "</div>";
    $('#listeProduits').html(produitsHTML);
}

function menu() {
    var contenu = "",
        zone = ['Mer', 'Terre', 'Air'];
    contenu += '<ul class="dropdown-menu megamenu"><li><div class="row">';
    for (var i = 0; i < zone.length; i++) {
        contenu += '<div class="col-md-6 col-lg-4">';
        contenu += '<h5>' + zone[i] + '</h5>';
        contenu += '<ul class="list-unstyled mb-3">';
        var a=false,m=false,t=false;
        for (var j = 0; j < tableauProduits.length; j++) {
            if (zone[i] == (tableauProduits[j].getZone()) && (contenu.indexOf(tableauProduits[j].getCategorie()))==-1) {

                contenu += '<li onclick="filtrer(\'' + tableauProduits[j].getCategorie() + '\')" class="nav-item"><a href="#/" class="nav-link">' + tableauProduits[j].getCategorie() + '</a></li>';
            }
        }

        contenu += '</ul></div>';
    }
    contenu += '</div></li></ul>';
    return contenu;
}