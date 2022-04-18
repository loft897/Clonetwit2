// $(document).ready(() => {  // prermet le declenechement d'un evenement lorsqu'un document est pret 
//     alert("Bob l'Eponge")
// }) 

$("#postTextArea").keyup(event => {  // recuperation de la valeur du texte saisi
    let textbox = $(event.target);
    let valueText = textbox.val().trim()
    // console.log(valueText)

    const submitButton = $("#submitPostButton");
    if(submitButton.length == 0) return alert('Pas de boutton de soumission trouvé')

    if(valueText == ""){
        submitButton.prop("disabled", true)
        return;
    }

    submitButton.prop("disabled", false)
});

$("#submitPostButton").click(() => {  // envoyer la publication ou données saisies  au serveur
    let button = $(event.target)
    let textbox = $("#postTextArea")

    let data = {
        content: textbox.val()
    }

    $.post("/api/posts", data, (postData, status, xhr) => { // xhr = xml http request, requette qui permet de communiquer avec le serveur, recuperer les données sur page sans actualiser celle ci ou pertuber l'experience utilisteur
                console.log(postData)                
    })
})