var listeLivres;
var lesLivres = [];
var monPanier = [];

function chargerLivres() {
    $.ajax({
        type: "GET",
        url: "donnees/livre.xml",
        dataType: "xml",
        success: function (liste) {
            
            var categs = [];
            var categorie, titre, prix, auteur, photo;
            listeLivres = $(liste);
            var $livre = listeLivres.find("LIVRE");

            var select1 = $('#catalogues');
            select1.html("");

            select1.append('<option value="' + '"> CATALOGUE</option>');
            $livre.each(function () {

                categorie = $(this).find('categorie').text();
                titre = $(this).find('titre').text();
                prix = $(this).find('prix').text();
                
                auteur = $(this).find('auteur');
                var nomAuteur = $(auteur[0]).find('nom').text();
                    nomAuteur +=" "+$(auteur[0]).find('prenom').text();
                
                photo = $(this).find('photo').text();

                var livre = new Livre();
                livre.Livre(categorie, titre, prix, nomAuteur,photo);
                lesLivres.push(livre);

                if ($.inArray(categorie, categs) < 0) {
                    categs.push(categorie);
                    select1.append('<option value="' + categorie + '">' + categorie + '</option>');
                }

            });
            select1.append('<hr>');
            select1.append('<option value="' + "toutes les categories" + '">Toutes les categories</option>');

             AfiicheLivre();
        },
        fail: function () {
            alert("Fichier introuvable");
        }
    });
}

function AfiicheLivre(param) {

    var categ1s = [],
        message,
        nvb = 0;

    if (param) {
        $.each(lesLivres, function (index, value) {
            if (value.getCategorie() == param) {
                categ1s.push(value);
            }
        });
        message = param;
    } else {
        categ1s = lesLivres;
        message = "Tous les catégories";
    }

    var articles = "<h2 class=\"text-center titre\">" + message + "</h2>";
    articles += "<div class=\"row lesArticles\">";
    $.each(categ1s, function (index, value) {
        articles += "<div class=\"col-xs-6 col-md-3\">"
        articles += "<div>";
        articles += "<a><img alt=\"" + value.getTitre() + "\" src=\"" + value.getPhoto() +
            "\"style=\"width:200px;height:258px\" class=\"img-thumbnail\">";
        articles += "</a></div>";
        articles += "<div><p><strong><em>" + value.getTitre() + "</em></strong></p><p><strong><em>" +
            value.getPrix() + " $" + "</em></strong></p><p><button type=\"button\" class=\"btn btn-success ajouter\"  id=\"" +
            value.getTitre() + "\"> <span class=\"glyphicon glyphicon-shopping-cart\"></span> Ajouter au panier</button></p></div></div>"
        if (nvb == 3) {
            articles += "</div><div class=\"row lesArticles\">";
            nvb = 0;
        } else {
            nvb++;
        }

    });
    articles += "</div>";

    $('#contenus').html(articles);

    $(".ajouter").click(function () {
        var nom = $(this).get(0).id,
            nonTrouve = true;

        NbreArticle++;
        var produit = new Produit();

        $.each(categ1s, function (index, value) {

            if (value.getTitre() == nom) {

                produit.Produit(nom, 1, value.getPrix());
                if (monPanier.length == 0) {
                    monPanier.push(produit);
                } else {
                    $.each(monPanier, function (para1, para2) {
                        if (para2.getNom() == nom) {
                            para2.setQuantite(parseInt(para2.getQuantite() + 1));
                            nonTrouve = false;
                        }
                    });
                    if (nonTrouve) {
                        monPanier.push(produit);
                    }
                }

                prixTotal += parseFloat(value.getPrix())

            }
        });

        $('#nbrePanier').text(NbreArticle).css('display', 'block');
        $('#prixArticle').text(prixTotal.toFixed(2) + "$").css('display', 'inline');

    });
}