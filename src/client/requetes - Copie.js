let listeFilms;
let listeFilmsDisponible = false;

let chargerFilms = () => {
    $.ajax({
        "type"      :   "GET",
        "url"       :   "dbfilms.json",
        "async"     :   false,
        "data"      :   {"nom":"Antonio"},
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




   

   function modifierFilm(){
        $(document).ready(function(){
        formulaire = document.getElementById('example');
        var formFilm = new FormData(formulaire);
        $.ajax({
            type : 'POST',
            url : 'src/serveur/filmManager.php',
            data : formFilm, //$('#formEnregFilms').serialize();
            dataType : 'json', 
            contentType : false,
            processData : false,
            success : function (reponse){alert(reponse.username +" password " + reponse.password)
                        //filmsVue(reponse);  ecrire ici une fonction avec un timeout pour message de retour
        
            },
            fail : function (err){
           
            }
        });

        })

    } 


