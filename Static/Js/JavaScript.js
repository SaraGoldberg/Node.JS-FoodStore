function postUser() {
    let user = {
        email: document.getElementById("h1").value,
        password: document.getElementById("h2").value,
        firstName: document.getElementById("h3").value,
        lastName: document.getElementById("h4").value
    };
    fetch("api/login/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user),
    }).then(response => {
        if (response.ok) {
            alert("new user added successfully");
        }
        else {
            response.json().then(error1 => { alert(JSON.stringify(error1.errors)); })
        }
    })
}

function newUser() {
    let div = document.getElementById("hide");
    div.hidden = false;
}

function getUser() {
    let email = document.getElementById("name").value;
    let password = document.getElementById("pswd").value;
    fetch("api/login/" + email + "/" + password)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data1 => {
            if (data1 != undefined) {
                sessionStorage.setItem('user', JSON.stringify(data1));
                window.location.href = "htmlpage1.html";
            }
            else
                alert("your name or password are incorrect :( please try again ")
        })
        .catch((error) => {
            alert("your name or password are incorrect :( please try again ")
        });
}

function putUser() {
    let oldUser = JSON.parse(sessionStorage.getItem("user"));
    let user = {
        email: document.getElementById("h1").value,
        password: document.getElementById("h2").value,
        firstName: document.getElementById("h3").value,
        lastName: document.getElementById("h4").value,
    };
    fetch("api/login/"+ oldUser._id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user),
    }).then(response => {
        if (response.ok)
            alert("The update was successful");
        else
            response.json().then(error => { alert(JSON.stringify(error.errors)) })
    }).catch(error => {
        console.log(error);
        alert("Sorry, the update was not performed successfully");
    });
}