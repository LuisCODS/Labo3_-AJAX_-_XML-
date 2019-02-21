// ****** Classe Livre ********
function Livre() {
    this.categorie;
    this.titre;
    this.prix;
    this.auteur;
    this.photo;
} //fin de la classe Dinosaure

Livre.prototype.Livre = function (categorie, titre, prix, auteur,photo) {
    if (arguments.length == 0) {
        this.categorie = null;
        this.titre = null;
        this.prix = 0;
        this.auteur = null;
        this.photo=null;
    } else
    if (arguments[0] instanceof Livre) {
        this.categorie = arguments[0].categorie;
        this.titre = arguments[0].titre;
        this.prix = arguments[0].prix;
        this.auteur = arguments[0].auteur;
        this.photo=arguments[0].photo;
    } else {
        this.setCategorie(categorie);
        this.setTitre(titre);
        this.setPrix(prix);
        this.setAuteur(auteur);
        this.setPhoto(photo);
    }
} //fin des constructeurs

Livre.prototype.getCategorie = function () {
    return this.categorie;
}
Livre.prototype.getTitre = function () {
    return this.titre;
}

Livre.prototype.getPrix = function () {
    return this.prix;
}

Livre.prototype.getAuteur = function () {
    return this.auteur;
}

Livre.prototype.getPhoto = function () {
    return this.photo;
}

Livre.prototype.setCategorie = function (categorie) {
    this.categorie = categorie;
}

Livre.prototype.setTitre = function (titre) {
    this.titre = titre;
}

Livre.prototype.setPrix = function (prix) {
    this.prix = prix;
}

Livre.prototype.setAuteur = function (auteur) {
    this.auteur = auteur;
}

Livre.prototype.setPhoto = function (photo) {
    this.photo = photo;
}

// Classe produits pour le panier

function Produit() {
    this.nom;
    this.quantite;
    this.prix;
} //fin de la classe produit

Produit.prototype.Produit = function (nom, quantite,prix) {
    if (arguments.length == 0) {
        this.nom = "";
        this.quantite = 0;
        this.prix=0;
    } else
    if (arguments[0] instanceof Produit) {
        this.nom = arguments[0].nom;
        this.quantite = arguments[0].quantite;
        this.prix = arguments[0].prix;
    } else {
        this.setNom(nom);
        this.setQuantite(quantite);
        this.setPrix(prix);
    }
} //fin des constructeurs

// getters and setters

Produit.prototype.getPrix = function () {
    return this.prix;
}

Produit.prototype.setPrix = function (prix) {
    this.prix = prix;
}

Produit.prototype.getNom = function () {
    return this.nom;
}

Produit.prototype.setNom = function (nom) {
    this.nom = nom;
}


Produit.prototype.getQuantite = function () {
    return this.quantite;
}

Produit.prototype.setQuantite = function (quantite) {
    this.quantite = quantite;
}


