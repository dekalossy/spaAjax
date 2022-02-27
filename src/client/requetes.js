let listeFilms;
let listeFilmsDisponible = false;

let chargerFilms = () => {
    $.ajax({
        "type"      :   "GET",
        "url"       :   "src/client/dbfilms.json",
        "async"     :   false,
        "data"      :   {"nom":"FOFANA"},
        "dataType"  :   "json",
        "success"   : (reponse) =>{
            listeFilms = reponse.movies;
            listeFilmsDisponible = true;
            //listerLesPlusRecents(2018);
        },
        "fail"      : (e) => {
                    //Afficher message sur votre page
        }

    })
}




 // MODIFICATION DE FILM  

   function modifierFilm(){
        $(document).ready(function(){
        formulaire = document.getElementById('formFilmsModif');
        var formFilm = new FormData(formulaire);
        $.ajax({
            type : 'POST',
            url : 'src/serveur/filmManager.php',
            data : formFilm, 
            dataType : 'json', 
            contentType : false,
            processData : false,
            success : function (reponse){

                    let text = reponse.message;

                    $('#confText').html(text);
                    $('#resultatError').html(text);
                    $('.champ').hide();             // cache les boutons
                    $('#confSupFilm').modal('show');

                        //filmsVue(reponse);  ecrire ici une fonction avec un timeout pour message de retour

        
            },

            fail : function (err){
           
            }
        });

        })

    } 





    // AJOUT DE FILM  

   function enregistrerFilm(){
    
        $(document).ready(function(){
        formulaire = document.getElementById('formFilmsModif');
        var formFilm = new FormData(formulaire);
        $.ajax({
            type : 'POST',
            url : 'src/serveur/filmManager.php',
            data : formFilm, 
            dataType : 'json', 
            contentType : false,
            processData : false,
            success : function (reponse){//alert(reponse.message);

                     $('#resultatError').html(reponse.message);
                   
                        //filmsVue(reponse);  ecrire ici une fonction avec un timeout pour message de retour

        
            },

            fail : function (err){
           
            }
        });

        })

    } 





let verifierForm = ()=>{$('#formFilmsModif').submit(function(e){// quand le formulaire est envoyer
    e.preventDefault(); //on desactive le comportement par defaut du navigateur
    var form = $(this);
    $('input, select, textarea', form).each(function(){
        if ($(this).val() == '') {
            etatForm=false;
            
            $('#resultatError').html('Vous devez remplir tous les champs ..!');
            return etatForm;
        }
    });
});

}













//   RECHERCHE D'UNE OCCURENCE DANS LE CAS DE BOUTON RECHERCHE DANS TITRE OU REALISATION  OU D'UNE CATEGORIE DANS LE CAS DE CATEGORIE 



function recherche(){ 
    if($('#maDataList').val()!=""){ //si la zone de recherche est vide... 

    $('#resultatError').html("");
     var termeRecherche = ($('#maDataList').val()).toLowerCase();  // valeur de ma zone de recherche en majuscule
        fetch("src/client/dbfilms.json")
            .then(function(resp){
                return resp.json();          // equivalent  .then(resp => resp.json()) , qui signifie return avec les arrow function 
            })

            .then(function(data){
                    contenu = "";
                    k=0;
                for(film of data.movies){
                        if(((film.title).toLowerCase()).indexOf(termeRecherche) > -1 || ((film.director).toLowerCase()).indexOf(termeRecherche) > -1){ 
                    
                        contenu += remplirCard(film);
                        k++;
                        
                        }
   
                }

                if(k == 0){
                                $('#resultatError').html('Désolé, aucun film avec titre ou réalisateur '+ termeRecherche+ ' ..!');  
                                $('#resultatError').css({ // si pas de correspondance, on le rend rouge
                                    backgroundColor : 'red',
                                     borderColor : 'red',
                                        color : 'white',
                                        textAlign : 'center'
                                            }); 

                            }else{

                                $('#newcontainer').html(contenu);
                                $('#resultatError').html('Films avec titre ou réalisateur '+ termeRecherche+ ' : ' +k+' films.');
                                $('#resultatError').css({ // si tout est bon, on le rend vert
                                     backgroundColor : 'green',
                                        color : 'white'
                                            }); 
                                $('#maDataList').val() ="";
                            }

                    
                    
            });

    }else{  $('#resultatError').html('Veuillez renseigner un titre ou un nom de réalisateur à rechercher ..!');  
             $('#resultatError').css({ // suite zone de recherche vide
            backgroundColor : 'red',
            borderColor : 'red',
            color : 'white',
            textAlign : 'center'
             }); }
}









function categorie(){     // valeur de ma zone de recherche 1ere lettre en majuscule et le reste en minuscule
    if($('#maDataList').val()!=""){ //si la zone de recherche est vide... 
     var termeRecherche = (($('#maDataList').val()).charAt(0).toUpperCase() + ($('#maDataList').val()).substring(1).toLowerCase());  // valeur de ma zone de recherche en majuscule

        fetch("src/client/dbfilms.json")
            .then(function(resp){
                return resp.json();          // equivalent  .then(resp => resp.json())
            })

            .then(function(data){
                    contenu = "";
                    k =0;
                for(film of data.movies){    // 1

                        if((film.genres).indexOf(termeRecherche) > -1 ){ //console.log(film.genres);
                    
                        contenu += remplirCard(film);
                        k++;
                        
                        }

                
                }

                 if(k == 0){
                                $('#resultatError').html('Désolé, catégorie '+ termeRecherche+ ' inexistante...!');  
                                $('#resultatError').css({ // si tout est bon, on le rend vert
                                    backgroundColor : 'red',
                                     borderColor : 'red',
                                        color : 'white',
                                        textAlign : 'center'
                                            }); 

                            }else{

                                $('#newcontainer').html(contenu);
                                $('#resultatError').html('Films trouvés dans la catégorie '+ termeRecherche+ ' : ' +k+' films.');
                                $('#resultatError').css({ // si tout est bon, on le rend vert
                                     backgroundColor : 'green',
                                        color : 'white',
                                        textAlign : 'center'
                                            }); 
                            }
                    

            });


    }else{  $('#resultatError').html('Veuillez renseigner une catégorie de film à rechercher ..!');  
             $('#resultatError').css({ // suite zone de recherche vide
            backgroundColor : 'red',
            borderColor : 'red',
            color : 'white'
             });
        }
}




/*

fetch("src/client/dbfilms.json")
    .then(function(response) {
        if(response.ok) {
            response.json()
            .then(function(data) {
            console.log(data);
            });
        } else {
            console.log('Mauvaise réponse du réseau');
        }
    })

    .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
    });

*/