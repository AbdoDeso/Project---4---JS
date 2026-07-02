let user = document.querySelector("#user")
let link1 = document.querySelector("#link1")
let link2 = document.querySelector("#link2")
let logoutBtn = document.querySelector("#logout")

// check login status
if (localStorage.getItem("email")){
    link1.classList.add("hidden")
    link2.classList.add("hidden")
    showCart.classList.remove("hidden")
    logoutBtn.classList.remove("hidden")
    user.innerHTML += localStorage.getItem("firstname") + " " + localStorage.getItem("lastname")
    
}



logoutBtn.addEventListener("click" , function(){
   link1.classList.remove("hidden")
    link2.classList.remove("hidden")
    showCart.classList.add("hidden")
    logoutBtn.classList.add("hidden")
    localStorage.clear()
    setTimeout(() => {
                window.location = "register.html"
            }, 100)
})