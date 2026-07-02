let email = document.querySelector("#email")
let password = document.querySelector("#password")
let login = document.querySelector("#login")

let getEmail = localStorage.getItem("email")
let getPassword = localStorage.getItem("password")

login.addEventListener("click" , function (e) {
    e.preventDefault()

    if(email.value === ""|| password.value === ""){
        alert("fill all required data")
    } else {
        if ( getEmail && getEmail.trim() === email.value && getPassword && getPassword === password.value){
            setTimeout(() => {
                window.location = "index.html"
            }, 1500)
        } else {
            alert("Wrong Username or Password !")
        }

    }
})

