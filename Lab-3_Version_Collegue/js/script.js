$(function () {

    NbreArticle = 0,
        prixTotal = 0;

    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    $('.paniers').click(function () {

        $("#catalogues").val('');

        var shops = "";

        shops = creerPanier();

        $('#contenus').html(shops);

        if (monPanier.length > 0) {

            $('button').click(function () {

                var elt = $(this).attr("id");
                NbreArticle--;
                var qte = parseInt(monPanier.find(x => x.getNom() === elt).getQuantite());

                if (qte > 1) {
                    monPanier.find(x => x.getNom() === elt).setQuantite(qte - 1);
                    $(this).closest('tr').find('td').eq(1).text(qte - 1);
                    $(this).closest('tr').find('td').eq(3).text(parseFloat(monPanier.find(x => x.getNom() === elt).getPrix()) * (qte - 1) + " $");
                } else {
                    var index = monPanier.findIndex(x => x.getNom() === elt);
                    monPanier.splice(index, 1);
                    $(this).closest('tr').remove();
                }

                prixTotal = 0;
                $.each(monPanier, function (index, value) {
                    prixTotal += parseInt(value.getQuantite()) * parseFloat(value.getPrix());
                });

                $('#totalTab').text("Total: " + prixTotal.toFixed(2) + "$");

                if (NbreArticle == 0) {
                    $('#nbrePanier').text(0).css('display', 'none');
                    $('#prixArticle').text(0 + "$").css('display', 'none');
                    $('#contenus').html(creerPanier());
                    prixTotal = 0;
                } else {
                    $('#nbrePanier').text(NbreArticle).css('display', 'block');
                    $('#prixArticle').text(prixTotal.toFixed(2) + "$").css('display', 'inline');
                }
            });

        }

    });


    function creerPanier() {

        var shops = "";
        shops = "<h2 class=\"text-center text-primary\">Votre panier</h2>";
        shops += "<div class=\"panierAchat\">";

        if (monPanier.length == 0) {
            shops += "<h3 class=\"text-center\"> Le panier est vide </h3>"
            shops += "</div>";
        } else {

            var total = 0;
            shops += "<table class=\"table\">";
            shops += "<tr>";
            shops += "<th> Produit</th>";
            shops += "<th> Quantité</th>";
            shops += "<th> Prix</th>";
            shops += "<th> Sous-total</th>";
            shops += "<th></th>";
            shops += "</tr>";

            $.each(monPanier, function (index, value) {
                shops += "<tr><td>" + value.getNom() + "</td><td>" + value.getQuantite() + "</td>";
                var sousTot = parseFloat(value.getPrix()) * value.getQuantite();
                shops += "<td>" + value.getPrix() + " $" + "</td><td>" + sousTot.toFixed(2) + " $" + "</td>";
                shops += "<td><button type=\"button\" class=\"btn btn-danger supprimer\" id=\"" + value.getNom() +
                    "\"><span class='glyphicon glyphicon-trash'></span> Supprimer</button></td></tr>"
                total = parseFloat(total) + parseFloat(sousTot);
            });

            shops += "</table>";
            shops += "<h4 class=\"text-right\" id=\"totalTab\"> Total: " + total.toFixed(2) + " $" + "</h4>"
            shops += "</div>";
        }

        $('#contenus').html(shops);

        return shops;
    }

    $('.accueils').click(function () {

        $("#catalogues").val('');

        AfiicheLivre();
    });

    $('#catalogues').change(function () {

        var selectedCategories = "";
        selectedCategories = $(this).children("option:selected").val();

        if (selectedCategories == "" || selectedCategories == "toutes les categories") {
            AfiicheLivre();
        } else {
            AfiicheLivre(selectedCategories);
        }
    });

    $('#contacts').on("click", function () {

        $("#catalogues").val('');

        var formes = "<h2 class=\"text-center\">Contactez-nous</h2>";
        formes += "<hr>";
        formes += "<div class=\"formulaires\">"
        formes += "<form>";
        formes += "<div class=\"form-group\">";
        formes += "<label for=\"nom\">* Nom</label>";
        formes += "<input type=\"text\" class=\"form-control\" id=\"nom\" placeholder=\"Entrer votre nom\">";
        formes += "</div>"
        formes += "<div class=\"form-group\">";
        formes += "<label for=\"prenom\">* Preom</label>";
        formes += "<input type=\"text\" class=\"form-control\" id=\"prenom\" placeholder=\"Entrer votre prenom\">";
        formes += "</div>"
        formes += "<div class=\"form-group\">";
        formes += "<label for=\"tel\">* Telephone</label>";
        formes += "<input type=\"text\" class=\"form-control\" id=\"tel\" placeholder=\"Entrer votre telephone\">";
        formes += "</div>"
        formes += "<button type=\"submit\" class=\"btn btn-primary\"> Envoyer</button>"
        formes += "</form>";
        formes += "</div>";
        $('#contenus').html(formes);

    });

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function startTime() {
        var today = new Date();
        var dts = new Date($.now());

        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();

        // add a zero in front of numbers<10
        m = checkTime(m);
        s = checkTime(s);
        h = checkTime(h);

        var jour = dts.toLocaleDateString("fr-FR", options).charAt(0).toUpperCase() + dts.toLocaleDateString("fr-FR", options).slice(1);
        $("#horloge").html("<strong>" + jour + "    " + h + ":" + m + ":" + s + "</strong>");

        t = setTimeout(function () {
            startTime()
        }, 500);
    }


    startTime();

    chargerLivres();

});