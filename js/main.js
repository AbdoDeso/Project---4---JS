
// products list show
let showCart = document.querySelector("#showCartIcon")
showCart.addEventListener('click', function() {
    cartDiv.classList.toggle('hidden');
})

// products generate code
let allProducts = document.querySelector("#products")
function generateItems () {
    let x = products.map((item) => {
    return `<div  id="${item.id}" price="${item.price}" class=" hover:shadow-2xl hover:-translate-y-4 h-112  w-80  xl:w-80 bg-gray-200 rounded-sm
     border-1 border-gray-300  transition duration-300">
                <img class="w-full h-70 mx-auto  " src= "${item.imgSrc}" alt="productImage">
                <div class="flex flex-col px-20 mx-auto py-5  text-left  gap-y-2 ">
                    <h2 class="text-lg font-bold">${item.title}</h2>
                    <span class="text-sm">Color : ${item.color}</span>
                    <p class="text-sm">Price : ${item.price}.LE</p>
                </div>
                    <div class="flex items-center justify-center">
                        <button class="rounded-lg  md:py-1 px-2 md:px-4 font-bold bg-black text-white hover:bg-gray-900  
                         transition duration-300" id="addToCart-${item.id}" onClick="addProductToCart(${item.id})">Add to Cart</button>
                         <button class="hidden rounded-lg  md:py-1 px-2 md:px-4  font-bold bg-red-700 text-white hover:bg-red-800 hover:text-white
                          transition duration-300" id="removeItem-${item.id}" onClick="removeProduct(${item.id})">
                          Remove From Cart</button>
                        <button class="" id="addFav-${item.id}" onClick="addFavItems(${item.id})">
                        <i class="fa-solid fa-heart text-black text-xl md:text-2xl ml-2 md:ml-4"></i>
                        </button>
                        <button class="hidden" id="removeFav-${item.id}" onClick="removeFavItem(${item.id})">
                        <i class="fa-solid fa-heart text-red-700  text-xl md:text-2xl ml-2 md:ml-4"></i>
                        </button>
                    </div>
            </div>`
        })
    allProducts.innerHTML =  x.join("")
}
generateItems()

// add to cart list functions

/// added items collect
let addedItems = localStorage.getItem("addedProducts") ? JSON.parse(localStorage.getItem("addedProducts")) : []
let itemsCount = document.querySelector("#itemsCount")
let cartDiv = document.querySelector("#cartSpace")
let itemSpace = document.querySelector("#itemSpace")


/// add product to cart fuction
function addProductToCart(id){
    
    let choosenItem = products.find((item) => item.id === id)
    let checkExist = addedItems.find((item) => item.id === id)

    if(!checkExist){
        let z = `<div id="${choosenItem.id}" class=" w-47 bg-gray-900 py-5 text-white    mx-auto my-2 text-xs">
                                    <p class="flex justify-between mx-2 text-xs">
                                        <span>${choosenItem.title}</span>
                                        <span id="price-${choosenItem.id}" >${choosenItem.price}.LE</span>
                                     </p>
                                <p class="space-x-2 mr-20 mt-2 ">
                                    <button class="border border-1 px-[5px] md:px-[8px] text-sm"  onClick="itemCounter(${choosenItem.id}, -1)">-</button>
                                    <span class="w-5 text-sm " id="counter-${choosenItem.id}">1</span>
                                    <button class="border border-1 px-[5px] md:px-[8px] text-sm" onClick="itemCounter(${choosenItem.id}, +1)">+</button>                                       
                                </p>
                                </div>`
        itemSpace.innerHTML += z
        addedItems = [...addedItems, choosenItem];
    localStorage.setItem("addedProducts" , JSON.stringify(addedItems))
    localStorage.setItem(`price-${choosenItem.id}` , choosenItem.price )
    let productsLength = document.querySelectorAll("#itemSpace div");
    itemsCount.innerHTML = productsLength.length
    }
    let countPrices = addedItems.map(item => item.price).reduce((acc , current) => acc+current,0)
    localStorage.setItem("price" , countPrices)
    let getItem = localStorage.getItem(`counter${choosenItem.id}`)
    let getItemDiv = document.getElementById(`counter-${choosenItem.id}`)
    let AddBtn = document.getElementById(`addToCart-${choosenItem.id}`)
    let removeBtn = document.getElementById(`removeItem-${choosenItem.id}`)

    getItemDiv.innerHTML = (getItem ||1)
    if(AddBtn){
        AddBtn.classList.add("hidden")
        removeBtn.classList.remove("hidden")
    }
}



/// remove producct from cart
function removeProduct(id) {
    let markedItem = document.getElementById(id)

        markedItem.remove()
    

    addedItems = addedItems.filter(item => item.id !== id)
    localStorage.setItem("addedProducts", JSON.stringify(addedItems))
    localStorage.setItem(`counter${id}` , 1)
    let AddBtn = document.getElementById(`addToCart-${id}`)
    let removeBtn = document.getElementById(`removeItem-${id}`)
    if(AddBtn){
        AddBtn.classList.remove("hidden")
        removeBtn.classList.add("hidden")
    }
    let productsLength = document.querySelectorAll("#itemSpace div");
    itemsCount.innerHTML = productsLength.length
}

/// keep changes after reload
function keepCartReload() {

    let z = addedItems.map((item) => {
        return `<div id="${item.id}" class=" w-47 bg-gray-900 py-5 text-white    mx-auto my-2 text-xs">
                                    <p class="flex justify-between mx-2 text-xs">
                                        <span>${item.title}</span>
                                        <span id="price-${item.id}" >${item.price}.LE</span>
                                     </p>
                                <p class="space-x-2 mr-20 mt-2 ">
                                    <button class="border border-1 px-[5px] md:px-[8px] text-sm"  onClick="itemCounter(${item.id}, -1)">-</button>
                                    <span class="w-5 text-sm " id="counter-${item.id}">1</span>
                                    <button class="border border-1 px-[5px] md:px-[8px] text-sm" onClick="itemCounter(${item.id}, +1)">+</button>                                       
                                </p>
                                </div>`
                                
    })
    itemSpace.innerHTML = z.join("")

    let productsLength = document.querySelectorAll("#itemSpace div");
    itemsCount.innerHTML = productsLength.length

    addedItems.forEach(item => {
        priceDiv = document.getElementById(`price-${item.id}`)
        priceDiv.innerHTML = localStorage.getItem(`price-${item.id}`) + "LE"
        let AddBtn = document.getElementById(`addToCart-${item.id}`)
        let removeBtn = document.getElementById(`removeItem-${item.id}`)
        if (AddBtn) {
            AddBtn.classList.add("hidden")
            removeBtn.classList.remove("hidden")
        }

        
    })
}
keepCartReload()


// Favorite Functions

///  add fav items
let favItems = localStorage.getItem("favItems") ? JSON.parse(localStorage.getItem("favItems")) : []

function addFavItems (id){
    let choosedFav = products.find((item) => item.id === id)
    let checkExist = favItems.find((item) => item.id === id)

    if(!checkExist){
        favItems = [...favItems , choosedFav ]
        localStorage.setItem("favItems" , JSON.stringify(favItems))
    }
    let AddBtn = document.getElementById(`addFav-${id}`)
    let removeBtn = document.getElementById(`removeFav-${id}`)
    if(AddBtn){
        AddBtn.classList.add("hidden")
        removeBtn.classList.remove("hidden")
    }
}

/// remove fav items
function removeFavItem(id) {
    
    favItems = favItems.filter(item => item.id !== id)
    localStorage.setItem("favItems", JSON.stringify(favItems))

    let AddBtn = document.getElementById(`addFav-${id}`)
    let removeBtn = document.getElementById(`removeFav-${id}`)
    if(AddBtn){
        AddBtn.classList.remove("hidden")
        removeBtn.classList.add("hidden")
    }
}

/// keep changes after reload
function keepFavReload() {

    favItems.forEach(item => {
        let AddBtn = document.getElementById(`addFav-${item.id}`)
        let removeBtn = document.getElementById(`removeFav-${item.id}`)
        if (AddBtn) {
            AddBtn.classList.add("hidden")
            removeBtn.classList.remove("hidden")
        }
    })
}
keepFavReload()

// filter search function
let searchBar = document.querySelector("#filter")
let Select = document.querySelector("#type")

let selectValue = Select.value

function defaultSearchBar (targetSearch){

    let filterProducts = products.filter((product) => 
        product[selectValue].toLowerCase().includes(targetSearch))

        
        let x =  filterProducts.map(item => {
          return `<div  id="${item.id}" price="${item.price}" class=" hover:shadow-2xl hover:-translate-y-4 h-112  w-80  bg-gray-200 rounded-sm
     border-1 border-gray-300  transition duration-300">
                <img class="w-full h-70 mx-auto  " src= "${item.imgSrc}" alt="productImage">
                <div class="flex flex-col px-20 mx-auto py-5  text-left  gap-y-2 ">
                    <h2 class="text-lg font-bold">${item.title}</h2>
                    <span class="text-sm">Color : ${item.color}</span>
                    <p class="text-sm">Price : ${item.price}.LE</p>
                </div>
                    <div class="flex items-center justify-center">
                        <button class="rounded-lg  md:py-1 px-2 md:px-4 font-bold bg-black text-white hover:bg-gray-900  
                         transition duration-300" id="addToCart-${item.id}" onClick="addProductToCart(${item.id})">Add to Cart</button>
                         <button class="hidden rounded-lg  md:py-1 px-2 md:px-4  font-bold bg-red-700 text-white hover:bg-red-800 hover:text-white
                          transition duration-300" id="removeItem-${item.id}" onClick="removeProduct(${item.id})">
                          Remove From Cart</button>
                        <button class="" id="addFav-${item.id}" onClick="addFavItems(${item.id})">
                        <i class="fa-solid fa-heart text-black text-xl md:text-2xl ml-2 md:ml-4"></i>
                        </button>
                        <button class="hidden" id="removeFav-${item.id}" onClick="removeFavItem(${item.id})">
                        <i class="fa-solid fa-heart text-red-700  text-xl md:text-2xl ml-2 md:ml-4"></i>
                        </button>
                    </div>
            </div>`
        })
    
        allProducts.innerHTML = x.join("")
    
}
searchBar.addEventListener("input", function(event) {
    defaultSearchBar(event.target.value.toLowerCase())
    })
Select.addEventListener("change" , function(event){
    selectValue = event.target.value
    defaultSearchBar(searchBar.value.toLowerCase())
})

// counter onclick change function
function itemCounter(id, change) {
    let item = addedItems.find((item) => item.id === id)
    let counterDiv = document.getElementById(`counter-${id}`)
    let priceDiv = document.getElementById(`price-${item.id}`)
    item.count = Math.max(1, (item.count ?? 1) + change)

    localStorage.setItem(`counter${item.id}` , item.count)
    counterDiv.innerHTML = localStorage.getItem(`counter${item.id}`)
    
    let countPrice  = item.price * item.count       
    localStorage.setItem(`price-${item.id}` , countPrice)
    priceDiv.innerHTML = countPrice + ".LE"

       
    let countPrices = addedItems.map(item => item.price * (item.count ?? 1)).reduce((acc , current) => acc+current,0)
        
    localStorage.setItem("price" , countPrices)
}


function keepOnReLoad() {
    let counterPrint = addedItems.forEach((item) => {
        let counterDiv = document.getElementById(`counter-${item.id}`)
        let counter = Number(localStorage.getItem(`counter${item.id}`)) || 1
        item.count = counter

        counterDiv.innerHTML = counter

        let priceValue = document.getElementById(`price-${item.id}`)

        priceValue.innerHTML = localStorage.getItem(`price-${item.id}`) + ".LE"
    })
    
}

keepOnReLoad()
