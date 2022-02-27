<?php
	

define('FICHIER', '../client/dbfilms.json');
$json = file_get_contents(FICHIER); // contenu de mon fichier json
$contenuJson =  json_decode($json, true);  // transforme en objet standard si non true sinon en tableau avec true
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
$modifier = 'modifier';


$verifier = array(); //contiendra le nouveau movies qui sera injecté dans $contenuJson['movies']

	foreach($contenuJson['movies'] as $film){
	
				//var_dump($film['title']);
		if($film['id'] != $_POST['idFilm']){
			
				$verifier[] = $film;
				
		}

					
	}

	$contenuJson['movies'] = $verifier;

//	var_dump($contenuJson['movies']);

file_put_contents(FICHIER, json_encode($contenuJson));	
$tableau['message']= "le film  a été retiré...";




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