<?php

class films{
	private $id;
	private $title;
	private $year;
	private $genres;
	private $director;
	private $actors;
	private $plot;
	private $posterUrl;

	
function __construct($requete=null,$params=null){
		$this->requete=$requete;
		$this->params=$params;
}
	

	
function obtenirConnexion(){
	$maConnexion = new Connexion("localhost", "root", "password", "h18bdfilms");
	$maConnexion->connecter();
	return $maConnexion->getConnexion();
}

function executer(){
		$this->connexion = $this->obtenirConnexion();
		$stmt = $this->connexion->prepare($this->requete);
		$stmt->execute($this->params);
		$this->deconnecter();
		return $stmt;		
	}
function deconnecter(){
		unset($this->connexion);
}

function enleverFichier($dossier,$pochette){
	if($pochette!=="avatar.jpg"){
		$rmPoc="../$dossier/".$pochette;
		$tabFichiers = glob("../$dossier/*");
		//print_r($tabFichiers);
		// parcourir les fichier
		foreach($tabFichiers as $fichier){
		  if(is_file($fichier) && $fichier==trim($rmPoc)) {
			// enlever le fichier
			unlink($fichier);
			break;
		  }
		}
	}
}
	
function verserFichier($dossier, $inputNom, $fichierDefaut, $chaine){
	$cheminDossier="../$dossier/";
	$nomPochette=sha1($chaine.time());
	$pochette=$fichierDefaut;
	if($_FILES[$inputNom]['tmp_name']!==""){
		//Upload de la photo
		$tmp = $_FILES[$inputNom]['tmp_name'];
		$fichier= $_FILES[$inputNom]['name'];
		$extension=strrchr($fichier,'.');
		@move_uploaded_file($tmp,$cheminDossier.$nomPochette.$extension);
		// Enlever le fichier temporaire charg�
		@unlink($tmp); //effacer le fichier temporaire
		//Enlever l'ancienne pochette dans le cas de modifier
		$this->enleverFichier($dossier,$pochette);
		$pochette=$nomPochette.$extension;
	}
	return $pochette;
}
}//fin de la classe
?>