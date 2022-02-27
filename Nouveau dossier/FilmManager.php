<?php
	

define('FICHIER', '../client/dbfilms.json');

$tabRes=array();
$tabRes['action']="enregistrer";
$tabRes['msg']="Film bien enregistre";



$json = file_get_contents(FICHIER); // contenu de mon fichier json
$contenuJson =  json_decode($json);  // transforme en objet standard
$tousLesFilms = $contenuJson->movies; // ceci est un tableau voir avec  var_dump($tousLesFilms);

foreach($tousLesFilms as $film){

	if($film->id == 10){
	//	$film->title = ($film->title).'e';
	var_dump(($film->title).' ok ça marche');

	}

}












echo json_encode($tabRes);

//file_put_contents(FICHIER, json_encode($contenuJson));



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
$acteurs = $_POST['acteurs'];
$genres = $_POST['genres'];
$runtime = $_POST['runtime'];
$year = $_POST['year'];
$plot = $_POST['plot'];
$posterUrl = $_POST['posterUrl'];










*/