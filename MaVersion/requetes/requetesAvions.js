//global
var listeAvions;

/*
 function listerParAnnee(annee)
 {
	 var tabFilms = listeAvions.getElementsByTagName("FILM");
	 var taille = tabFilms.length;

	 for(var i = 0; i<taille; i++)
	 {
		 var anneeFilm = tabFilms[i].getAttribute("annee");
		 if(anneeFilms > aneee)
			  // TRAVAILLE TOI MÊME
	 }
 }
*/
function listerFilms()
{
	//recoit un array avec tous les tags <AVION> au singulier
	var tabFilms = listeAvions.getElementsByTagName("AVION");
	var taille = tabFilms.length;
	
	//var rep="<span onClick=\"$('#contenu').hide();\">X</span>";
		//Representation de la table en HTML
	var	rep="<table border=1 class=table  >";
		// rep+="<table >";
		rep+="<tr><th>IMAGE</th><th>NOM</th><th>VITESSE</th><th>COUT</th><th>MOTEUR</th><th>DESCRIPTION</th></tr>";
		// rep+="<caption>LISTE DES AVIONS</caption>";

	for(var i = 0; i < taille; i++)
	{
		//pega os textos...
		var imageSRC = tabFilms[i].getElementsByTagName("IMAGE")[0].firstChild.nodeValue;
		var nom = tabFilms[i].getElementsByTagName("NOM")[0].firstChild.nodeValue;
		var vitesse = tabFilms[i].getElementsByTagName("VITESSE")[0].firstChild.nodeValue;
		var cout = tabFilms[i].getElementsByTagName("COUT")[0].firstChild.nodeValue;
		var moteur = tabFilms[i].getElementsByTagName("MOTEUR")[0].firstChild.nodeValue;
		var description = tabFilms[i].getElementsByTagName("DESCRIPTION")[0].firstChild.nodeValue;		
		//IMAGE...
		var image = "<img src="+imageSRC+" height="+200+" width="+200+">";		
		//cria uma linha preenchendo as colunas com os textos.
		rep+="<tr><td>"+image+"</td><td>"+nom+"</td><td>"+vitesse+"</td><td>"+cout+"</td><td>"+moteur+"</td><td>"+description+"</td></tr>";		
	}
	
		//fecha  a table
		rep+="</table>";
		$('#col-right').html(rep);//display table aready ready inside the div
		$('#col-right').show();
}

// Charche un fichier par une requête AJAX via jQuery.
function chargerAvions()
{
	$.ajax({
		type:"GET",
		url:"donnees/avion.xml",
		dataType:"xml",
		success : function(data)
		{
			//afect la variavel global avec le <FILMS> qui devient la racine du DOM
			listeAvions = data;
			listerFilms();
		},
		fail : function(){
			alert("GROS PROBLEME");
		}
	});
}