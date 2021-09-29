let user = JSON.parse(sessionStorage.getItem("user"));
let h1 = document.getElementById("welcome").innerHTML = "Welcome to " + user.email + " you've logged in successfully";
