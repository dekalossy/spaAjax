<?php
	

define('FICHIER', '../client/dbfilms.json');
$json = file_get_contents(FICHIER); // contenu de mon fichier json
$contenuJson =  json_decode($json);  // transforme en objet standard
$tousLesFilms = $contenuJson->movies; // ceci est un tableau voir avec  var_dump($tousLesFilms);

//foreach($tousLesFilms as $film){

//	if($film->id == 134){
	
//	var_dump(($film->title).' ok ça marche');

//	}

//}

$tableau=array();




		
	

		
			$username = $_POST['username'];
		 	$password = $_POST['password'];

			$tableau['message']= "Enregistrement fait avec succès..!";
			$tableau['username']= $username;
			$tableau['password']= $password;
		
 

		echo json_encode($tableau);

















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