//global
var listeFilms;

/*
 function listerParAnnee(annee)
 {
	 var tabFilms = listeFilms.getElementsByTagName("FILM");
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
	//recoit un array avec tous les tags <FIML> au singulier
	var tabFilms = listeFilms.getElementsByTagName("FILM");
	var taille = tabFilms.length;
	
	var rep="<span onClick=\"$('#contenu').hide();\">X</span>";
		//Representation de la table en HTML
		rep+="<table border=1>";
		rep+="<tr><th>TITRE</th><th>GENRE</th><th>PAYS</th><th>ROLES</th></tr>";
		rep+="<caption>LISTE DES FILMS</caption>";

	for(var i = 0; i < taille; i++)
	{
		//pega os textos...
		var titre = tabFilms[i].getElementsByTagName("TITRE")[0].firstChild.nodeValue;
		var genre = tabFilms[i].getElementsByTagName("GENRE")[0].firstChild.nodeValue;
		var pays = tabFilms[i].getElementsByTagName("PAYS")[0].firstChild.nodeValue;
		//cria uma linha preenchendo as colunas com os textos.
		//la <tr> reste ouverte
		rep+="<tr><td>"+titre+"</td><td>"+genre+"</td><td>"+pays+"</td>";
		
		//recoit un array avec tous les tags <ROLE> au singulier
		var tabRoles = tabFilms[i].getElementsByTagName("ROLE");
		var taille2 = tabRoles.length;
		var liste="";
		for(var j = 0; j < taille2; j++)
		{
			//pega os textos...
			var prenom = tabRoles[j].getElementsByTagName("PRENOM")[0].firstChild.nodeValue;
			var nom = tabRoles[j].getElementsByTagName("NOM")[0].firstChild.nodeValue;
			var intitule = tabRoles[j].getElementsByTagName("INTITULE")[0].firstChild.nodeValue;
			//
			liste+="Role:"+prenom+","+nom+","+intitule+"<br>";
		}
		//acrescenta a ultima coluna em seguida fecha a tag <tr>
		rep+="<td>"+liste+"</td></tr>";
	}
	//fecha  a table
	rep+="</table>";
	$('#contenu').html(rep);//display table aready ready inside the div
	$('#contenu').show();
}

function chargerFilms()
{
	$.ajax({
		type:"GET",
		url:"donnees/films.xml",
		dataType:"xml",
		success : function(data)
		{
			//afect la variavel global avec le <FILMS> qui devient la racine du DOM
			listeFilms = data;
			listerFilms();
		},
		fail : function(){
			alert("GROS PROBLEME");
		}
	});
}