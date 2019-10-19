$(document).ready(function() {
  getPosts();
});

function handleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user.email);
    
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function handleMessageFormSubmit() {
  const title = $('#post-title').val();
  const body = $('#post-body').val();
  addMessage(title, body);
}

function addMessage(title, body) {
  const database = firebase.database();
  
  const data = {
    postTitle: title,
    postBody: body
  };
  
  const postDB = database.ref('posts');
  
  const newPostReference = postDB.push();
  newPostReference.set(data, function(err) {
    if (err) {
      window.alert(`Something went wrong\n${JSON.stringify(err)}`);
    } else {
      window.location.reload();
    }
  });
}

function getPosts() {
  return firebase.database().ref('posts').once('value').then(function(snapshot) {
    const posts = snapshot.val();
    console.log(posts);

    for (const postKey in posts) {
      const post = posts[postKey];
      $('#postsList').append('<div>' + post.postTitle + ' - ' + post.postBody + '</div>');
    }
  });
}