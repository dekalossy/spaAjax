let ligneFilms="";




let remplirCard = (unFilm)=> {
    return ` 
    <div class="well " id="${unFilm.id}">
      <div class="media" >
        <a class="pull-left" href="#"><img class="media-object" src=${unFilm.posterUrl} width="130px" title="${unFilm.title}"></a>
        <div class="media-body">
            <h4 class="media-heading" style="color:blue"><b>${unFilm.title}</b></h4>
            <p class="pull-right">
        

            <button type="button" class="btn btn-default" aria-label="Left Align" onclick="ouvrirModalModif('${unFilm.id}', '${unFilm.title}', '${unFilm.director}', '${unFilm.actors}', '${unFilm.genres}', '${unFilm.runtime}', '${unFilm.year}', '${unFilm.plot}', '${unFilm.posterUrl}');">
                <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
            </button>
            <button type="button" class="btn btn-default" aria-label="Left Align" onclick="suppressionFilm('${unFilm.title}', '${unFilm.id}');">
                <span class="glyphicon glyphicon-remove " aria-hidden="true"></span>
            </button>
            </p>


        <p class="text-left" style="color:blue"><b>${unFilm.director}</b> | ${unFilm.actors}</p>
        <p> ${unFilm.plot}</p>
        <ul class="list-inline list-unstyled">
        <li><span><i class="glyphicon glyphicon-calendar"></i> ${unFilm.year}</span></li>
            <li>|</li>
            <span><i class="glyphicon glyphicon-time"></i>${unFilm.runtime}</span></li>
            <li>|</li>
            <span> ${unFilm.genres} </span></li>
            <li>|</li>
            <li>
               <span class="glyphicon glyphicon-star"></span>
                <span class="glyphicon glyphicon-star"></span>
                <span class="glyphicon glyphicon-star"></span>
                <span class="glyphicon glyphicon-star"></span>
                <span class="glyphicon glyphicon-star-empty"></span>
            </li>
        </ul>
        <a href="#" class="btn btn-primary">Bande annonce</a>
       </div>
    </div>
    </div>



                           
            `
    
}



//template du modal qui servira lors de la suppression ou la modification
let modal = ()=>{
        return `

        <!-- Small modal pour Confirmation suppression de film-->
<div class="modal " tabindex="-1" id="confSupFilm" >
  <div class="modal-dialog ">
    <div class="modal-content" style="background-color:#2196f3">
      <div class="modal-header">
        <h5 class="modal-title" style="color:white"><b>Confirmation</h5>
      </div>
      <div class="modal-body">
        <p id="confText"><b>....</b></p>
        
        <input type="hidden" id="filmId" value="">
        <button type="button"  class="btn btn-danger champ" onclick="suppressionDiv();">Confirmer</button>

        <button type="button" class="btn btn-light champ" data-bs-dismiss="modal">Annuler</button>
       
      </div>
     
    </div>
  </div>
</div>


    `
}





//SuppressionFilm  envoie les informations du film (passées en paramètres) au modal et l'ouvre 

function suppressionFilm(titre, id){

    let text = 'Voulez vous supprimer le film:' +titre+' ?'
    $('#confText').html(text);
    $('#filmId').val(id); 
    $('#confSupFilm').modal('show');

   
 
    
}


//SuppressionDiv recupère le id du film dans le modal et supprime la div ayant l'id correspondant au id.

function suppressionDiv(){
    let x = $('#filmId').val();
    div = document.getElementById(x);
    div.remove();
    $('#confSupFilm').modal('hide');
}







let listerTousLesFilms = (duree,titre, annee,ordeDeTri) => {
    if (listeFilmsDisponible){
       let contenu = '';
        if (annee >= 0){
             if (ordeDeTri == 'D'){
                listeFilms.sort((a,b) => parseInt(b.year)-parseInt(a.year));//ordre décroissant
             }else { 
                listeFilms.sort((a,b) => parseInt(a.year)-parseInt(b.year));// cas ordreDeTri == 'C' ordre croissant
             }
                // Par année
                for (unFilm of listeFilms){
                    if (parseInt(unFilm.year) > annee){
                        contenu+=remplirCard(unFilm);
                    }else if (annee == 0) {
                        contenu+=remplirCard(unFilm);
                    }
                }   
        }else if(titre != null){// if (titre == true)
            if (ordeDeTri == 'D'){
                listeFilms.sort((a,b) => (b.title > a.title)?1:-1);//ordre décroissant
             }else { 
                listeFilms.sort((a,b) => (b.title < a.title)?1:-1);// cas ordreDeTri == 'C' ordre croissant
             }
            // Par titre
            for (unFilm of listeFilms){
                    contenu+=remplirCard(unFilm);
            }
           
        } else if(duree >= 0){
            if (ordeDeTri == 'D'){
                listeFilms.sort((a,b) => parseInt(b.runtime)-parseInt(a.runtime));//ordre décroissant
             }else { 
                listeFilms.sort((a,b) => parseInt(a.runtime)-parseInt(b.runtime));// cas ordreDeTri == 'C' ordre croissant
             }
                // Par année
                for (unFilm of listeFilms){
                    if (parseInt(unFilm.runtime) > duree){
                        contenu+=remplirCard(unFilm);
                    }else if (duree == 0) {
                        contenu+=remplirCard(unFilm);
                    }
                }   
           
        }
        
       contenu+= modal();
       contenu+= modalModif();
        $('#newcontainer').html(contenu);
        $('#resultatError').html("");
    }
    else { 
          $('#newcontainer').html('<div class="spinner-border" style="color:red"></div><p>Chargement des fimls les films</p>'); // alert("SVP vous devez charger la liste des films en premier");
         }


}




let listerLesPlusRecents = (annee) => {}





//template du modal qui servira lors de la suppression ou la modification
let modalModif = ()=>{
        return `

<!-- Small modal pour Modification ou enregistrement de film-->
<div class="modal " tabindex="-1" id="divFilmsModif" >
  <div class="modal-dialog ">
    <div class="modal-content" style="background-color:#c8cbcd">
      <div class="modal-header">
        <h5 class="modal-title" style="color:blue" id="titreAmodifier"><b>...</b></h5>
      </div>
      <div class="modal-body">

      <div class="container-fluid">
                           <div class="row">
                               <div class="col-md-10 mx-auto pb-5 modalCol10">
                                   <div class="bg-light rounded shadow-sm px-3 py-3">
                                       <p class="text-muted">
                                           Veuillez saisir les modifications souhaitées
                                       </p>
                                       <form  id="formFilmsModif" method="post" onsubmit="return verifierForm();">
                                        <div  class="erreur" id="alert1" ></div>

                                            
                                        <input type="hidden" id="idFilm" value="0" name="idFilm">
                                        <input type="hidden" id="action" name="action" value="">
                                        <div class="form-row justify-content-between">
                                           <div class="form-group col-md-6">
                                                <label for="titre">Titre</label>
                                                <input type="text" class="form-control" id="titre"  name="titre"  placeholder="">
                                            </div>

                                            <div class="form-group col-md-6">
                                                <label for="realisateur">Réalisateur</label>
                                                <input type="text" class="form-control" id="realisateur" name="realisateur" placeholder="" required>
                                            </div>
                                        </div>


                                        <div class="form-row justify-content-between">
                                           <div class="form-group col-md-6">
                                                <label for="acteurs">Acteurs</label>
                                                <input type="text" class="form-control" id="acteurs"  name="acteurs"  placeholder="" required>
                                            <!--    <small class="form-text text-muted ">8 à 20 caractères</small> -->
                                            </div>

                                            <div class="form-group col-md-6">
                                                <label for="genres">Genres</label>
                                                <input type="text" class="form-control" id="genres" name="genres" required>
                                            </div>
                                        </div>
                                        <div class="form-row justify-content-between">
                                            <div class="form-group col-md-6">
                                                <label for="runtime">Durée</label>
                                                <input type="text" class="form-control" id="runtime"  name="runtime"  placeholder="" required>
                                            </div>

                                            <div class="form-group col-md-6">
                                                <label for="year">Année de sortie</label>
                                                <input type="text" class="form-control" id="year" name="year" placeholder="" required>
                                            </div>
                                        </div>

                                           
                                        <div class="form-group">
                                               <div class="mb-3">
                                                <label for="plot" class="form-label">Synopsis</label>
                                                <textarea class="form-control" id="plot" rows="3" id="plot" name="plot" required></textarea >
                                                </div> 
                                        </div>

                                        <div class="form-group">
                                               <label for="posterUrl">Lien image</label>
                                               <input type="url" class="form-control"  name="posterUrl" id="posterUrl" placeholder="" required>
                                        </div>
                                           <button type="submit" id="soumissionModif" class="btn btn-danger" onclick="modifierFilm();">Modifier</button>
                                           <button type="submit" id="soumissionEnreg" class="btn btn-danger" onclick="enregistrerFilm(); ">Enregistrer</button>
                                       </form>
                                   </div>
                               </div>
                           </div>
                       </div>

        <p id="confText"><b>....</b></p>
        
        
        

        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Annuler</button>

        
       
      </div>
     
    </div>
  </div>
</div>
    `
}



function ouvrirModalModif(id, titre, realisateur, acteurs, genres, runtime, year, plot, posterUrl){
    let text = 'MODIFICATION DU FILM :' +titre+' ?';
    $('#action').val('modifier');                   // Determine la fonction à executer dans gestionFilm.php
    $('#titreAmodifier').html(text);
    $('#idFilm').val(id);
    $('#titre').val(titre); 
    $('#realisateur').val(realisateur); 
    $('#acteurs').val(acteurs); 
    $('#genres').val(genres); 
    $('#runtime').val(runtime); 
    $('#year').val(year); 
    $('#plot').val(plot); 
    $('#posterUrl').val(posterUrl); 
    $('#soumissionEnreg').hide();
    $('#soumissionModif').show();
    $('#divFilmsModif').modal('show');
    //alert($('#action').val());

}



function ouvrirModalEnreg(){ 
    $('#formFilmsModif')[0].reset();
    let text = 'ENREGISTREMENT DE FILM :';
    $('#action').val('enregistrer');    // Determine la fonction à executer dans gestionFilm.php
    $('#titreAmodifier').html(text);
    $('#soumissionModif').hide();
    $('#soumissionEnreg').show();
    $('#divFilmsModif').modal('show');
    
     // alert($('#action').val());
}










                                    
$(document).ready(function(){
      $("select.tri").change(function(){
        var tri = $(this).children("option:selected").val();  // recuperation de la valeur de l'option choisie

    switch(tri){
        case "title":
            listerTousLesFilms(-1,'titre',-1,'C')
        break;

        case "year":
            listerTousLesFilms(-1,null,2010,'C')
        break;

        case "runtime":
            listerTousLesFilms(120,null,-1,'C');
        break;

        case "rien":
            listerTousLesFilms(-1,null,0,'C');
        break;

        }


      });
    });




  
  





