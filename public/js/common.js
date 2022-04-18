// $(document).ready(() => {  // prermet le declenechement d'un evenement lorsqu'un document est pret
//     alert("Bob l'Eponge")
// })

$("#postTextArea").keyup((event) => {
  // recuperation de la valeur du texte saisi
  let textbox = $(event.target);
  let valueText = textbox.val().trim();
  // console.log(valueText)

  const submitButton = $("#submitPostButton");
  if (submitButton.length == 0)
    return alert("Pas de boutton de soumission trouvé");

  if (valueText == "") {
    submitButton.prop("disabled", true);
    return;
  }

  submitButton.prop("disabled", false);
});

$("#submitPostButton").click(() => {
  // envoyer la publication ou données saisies  au serveur
  let button = $(event.target);
  let textbox = $("#postTextArea");

  let data = {
    content: textbox.val(),
  };

  $.post("/api/posts", data, (postData, status, xhr) => {
    // xhr = xml http request, requette qui permet de communiquer avec le serveur, recuperer les données sur page sans actualiser celle ci ou pertuber l'experience utilisteur
    // console.log(postData)
    let html = createPostHtml(postData);
    $(".postsContainer").prepend(html); // prepend est le contraire de append, il ajoute au debut de la liste alors que append ajoute a la fin de la liste
    textbox.val("");
    button.prop("disabled", true);
  });
});

function createPostHtml(postData) {
  // fonction pour ajouter le contenu de notre publication sur la page

  var postedBy = postData.postedBy;
  var displayName = postedBy.firstName + " " + postedBy.lastName;
  var timestamp = postData.createdAt;

  return `<div class='post'>

                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                        <img src='${postedBy.profilePic}'>
                    </div>
                    <div class='postContentContainer'>
                        <div class='header'>
                            <a href='/profile/${postedBy.username}'class="displayName">${displayName}</a>
                            <span class='username'>@${postedBy.username}</span>
                            <span class='date'>${timestamp}</span>
                        </div>
                        <div class='postBody'>
                            <span>${postData.content}</span>
                        </div>
                        <div class='postFooter'>
                            <div class="postButtonContainer">
                                <button>
                                    <i class="far fa-comment"></i>
                                </button>
                                </div>
                                
                                <div class="postButtonContainer">
                                <button>
                                    <i class="fas fa-retweet"></i>
                                </button>
                                </div>
                                
                                <div class="postButtonContainer">
                                <button>
                                    <i class="far fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}
