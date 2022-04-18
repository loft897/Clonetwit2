$(document).ready(() => { // affichage de toutes les publications presentes dans le serveur 
    $.get("/api/posts", results => {
        console.log(results);
    })
})