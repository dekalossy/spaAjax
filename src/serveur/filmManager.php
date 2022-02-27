<?php
	

define('FICHIER', '../client/dbfilms.json');
$json = file_get_contents(FICHIER); // contenu de mon fichier json
$contenuJson =  json_decode($json, true);  // transforme en tableau avec true sinon  en objet standard 
$tousLesFilms = $contenuJson['movies']; // ceci est un tableau voir avec  var_dump($tousLesFilms);
//var_dump($tousLesFilms);
 
$tableau = array();
$filmPoste = array();

$filmPoste['id'] = $_POST['idFilm'];
$filmPoste['title'] = $_POST['titre']; 
$filmPoste['director'] = $_POST['realisateur'];
$filmPoste['actors'] = $_POST['acteurs']; 
$filmPoste['genres'] = array($_POST['genres']);
$filmPoste['runtime'] = $_POST['runtime'];
$filmPoste['year'] = $_POST['year']; 
$filmPoste['plot'] = $_POST['plot']; 
$filmPoste['posterUrl'] = $_POST['posterUrl'];
$action = $_POST['action'];


$verifier = array(); //contiendra le nouveau movies qui sera injecté dans $contenuJson['movies']


if(isset($_POST['action']) AND $_POST['action'] == 'modifier'){

			foreach($contenuJson['movies'] as $film){
	
				//var_dump($film['title']);
				if($film['id'] == $_POST['idFilm']){

						$verifier[] = $filmPoste;
				
				}else{


						$verifier[] = $film;
				}

					
			}

			$contenuJson['movies'] = $verifier;

		//	var_dump($contenuJson['movies']);

	file_put_contents(FICHIER, json_encode($contenuJson));	
	$tableau['message']= "Le film :".$filmPoste['title']." a été modifié avec succès...";


}else{

	$dernierFilm = end($tousLesFilms);  // obtenir le dernier element, film du tableau $tousLesFilms
	$k = $dernierFilm['id']+1;			// id du dernier film du tableau $tousLesFilms incrementé de 1 sera attribué au film a enregistré
	$filmPoste['id'] = $k;
	
	$contenuJson['movies'][] = $filmPoste;  // Ajout du film à la suite 



	file_put_contents(FICHIER, json_encode($contenuJson));	
	$tableau['message']= "Le film, ".$filmPoste['title']." a été enregistré avec succès avec id : ".$k.".";

}











echo json_encode($tableau);









/*
	$tabRes=array();
	function enregistrer(){
		global $tabRes;	
		$titre=$_POST['titre'];
		$duree=$_POST['duree'];
		$res=$_POST['res'];
		try{
			$unModele=new filmsModele();
			$pochete=$unModele->verserFichier("pochettes", "pochette", "avatar.jpg",$titre);
			$requete="INSERT INTO films VALUES(0,?,?,?,?)";
			$unModele=new filmsModele($requete,array($titre,$duree,$res,$pochete));
			$stmt=$unModele->executer();
			$tabRes['action']="enregistrer";
			$tabRes['msg']="Film bien enregistre";
		}catch(Exception $e){
		}finally{
			unset($unModele);
		}
	}






	 $id = $_POST['id'];
  	$titre = $_POST['titre'];
  	$realisateur = $_POST['realisateur'];	
 
    if( isset($_POST['titre']) && isset($_POST['realisateur'])){
 
        if($_POST['id'] == 134 ){ // Si les infos correspondent...
            
            echo "Success";    
        }
        else{ // Sinon
            echo "Failed";
        }
    }



*/




?>