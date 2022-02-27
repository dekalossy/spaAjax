let ligneFilms="";

let remplirCard = (unFilm)=> {
    return ` 
                        <div class="col">
                            <div class="card">
                                <img src=${unFilm.posterUrl} class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${unFilm.title}</h5>
                                    <p class="card-text">Année : ${unFilm.year}</p>
                                    <p class="card-text">Durée : ${unFilm.runtime}</p>
                                    <p class="card-text">${unFilm.plot}</p>
                                    <a href="#" class="btn btn-primary">Bande annonce</a>
                                </div>
                            </div>
                        </div>
                           
                        `
    
}

let listerTousLesFilms = (duree,titre, annee,ordeDeTri) => {
    if (listeFilmsDisponible){
        console.log("titre = "+titre);
        let contenu = `<div class="row row-cols-4">`;
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
        contenu+= `</div>`;

        $('#contenu').html(contenu);
    }
    else { alert("SVP vous devez charger la liste des films en premier"); }
}

let listerLesPlusRecents = (annee) => {

}