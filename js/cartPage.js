
let CartedProductsDiv = document.querySelector("#CartedProducts")
let addedItems = localStorage.getItem("addedProducts") ? JSON.parse(localStorage.getItem("addedProducts")) : []
let showCart = document.querySelector("#showCartIcon")

// generate page content items and fav

/// generate added products
function addItems () {
    let x = addedItems.map((item) => {
    return `<div  id="${item.id}" price="${item.price}" class=" hover:shadow-2xl hover:-translate-y-4 h-112 w-80  xl:w-80 bg-gray-200 rounded-sm
     border-1 border-gray-300  transition duration-300">
         
                <img class="w-full h-70 mx-auto  " src= "${item.imgSrc}" alt="productImage">
            <div class="flex flex-col px-5 mx-auto py-5  font-bold text-left  gap-y-2 ">
                    <h2 class="text-lg font-bold">${item.title}</h2>
                    <span class="text-sm">Color : ${item.color}</span>
                    <p class="inline text-sm">Price : ${item.price}.LE</p>
                      <div class="mt-[-65px] mb-[20px] ml-45 space-x-1  ">
                        <button class="border border-2  px-[8px] md:px-[10px] font-bold text-base md:text-2xl"  onClick="itemCounter(${item.id}, -1)">-</button>
                        <span class="w-5 font-bold md:text-2xl" id="counter-${item.id}">1</span>
                        <button class="border border-2  px-[8px] md:px-[10px] font-bold text-base md:text-2xl" onClick="itemCounter(${item.id}, +1)">+</button>                                       
                    </div>
            </div>
                <div class="flex items-center justify-center">
                         <button class="rounded-md  py-1 px-4 font-bold bg-red-700 text-white hover:bg-red-800 hover:text-white
                          transition duration-300" id="removeItem-${item.id}" onClick="removeProduct(${item.id})">
                          Remove From Cart</button>
                        <button class="" id="addFav-${item.id}" onClick="addFavItem(${item.id})">
                        <i class="fa-solid fa-heart text-black text-xl md:text-2xl ml-2 md:ml-4"></i>
                        </button>
                        <button class="hidden" id="removeFav-${item.id}" onClick="removeFavItem(${item.id})">
                        <i class="fa-solid fa-heart text-red-700  text-xl md:text-2xl ml-2 md:ml-4"></i>
                        </button>
                </div>
            </div>`
        })

    CartedProductsDiv.innerHTML =  x.join("")
}
addItems()

/// generate added fav items
let favItems = localStorage.getItem("favItems") ? JSON.parse(localStorage.getItem("favItems")) : []
let favItemsDiv = document.querySelector("#favItems")
function FavItems (id){

let z = favItems.map((item) => {
        return `<div  id="fav-${item.id}" price="${item.price}" class=" mx-auto hover:shadow-2xl hover:-translate-y-4  h-112  w-80  xl:w-80 bg-gray-200 rounded-sm
     border-1 border-gray-300  transition duration-300">
                <img class="w-full h-70 mx-auto  " src= "${item.imgSrc}" alt="productImage">
                <div class="flex flex-col px-20 mx-auto py-5 font-bold text-left  gap-y-2 ">
                    <h2 class="text-lg font-bold">${item.title}</h2>
                    <span class="text-sm">Color : ${item.color}</span>
                    <p class="text-sm">Price : ${item.price}.LE</p>
                </div>
                    <div class="flex items-center justify-center">
                        <button class="rounded-md  py-1 px-4 font-bold bg-black text-white hover:bg-gray-900  
                         transition duration-300" id="addToCart-${item.id}" onClick="fromFavToCart(${item.id})">Add to Cart</button>
                 
                    
                        <button class="" id="removeFav-${item.id}" onClick="removeFavItem(${item.id})">
                        <i class="fa-solid fa-heart text-red-700  text-xl md:text-2xl ml-2 md:ml-4"></i>
                        </button>
                    </div>
            </div>`
    })
    favItemsDiv.innerHTML = z.join("")
}
FavItems()

// cart items function
/// remove product from cart
function removeProduct (id) {
    let findItem = addedItems.find((item) => item.id === id)
    let getItemValue = localStorage.getItem(`counter${id}`)
    
    if(getItemValue === null){
        let countPrices = Number(localStorage.getItem("price")) - findItem.price

        localStorage.setItem("price" , countPrices)
        priceDiv.innerHTML =  (localStorage.getItem("price") || 0) + ".LE"  
    }else{
        let minPrice =  Number(localStorage.getItem("price")) - (findItem.price * getItemValue)
        localStorage.setItem("price" , minPrice)
        priceDiv.innerHTML =  (localStorage.getItem("price") || 0) + ".LE"  
    }
    let markedItem = document.getElementById(id)
       
        markedItem.remove()
    
    addedItems = addedItems.filter(item => item.id !== id)
    localStorage.setItem("addedProducts", JSON.stringify(addedItems))
   
}

// fav itenms functions

///  add fav item
function addFavItem (id){
  
    let item = addedItems.find((item) => item.id === id)
    let checkExist = favItems.find((item) => item.id === id)
    if(!checkExist){
    let z = `<div  id="fav-${item.id}" price="${item.price}" class=" hover:shadow-2xl hover:-translate-y-4 h-112  w-80  xl:w-80 bg-gray-200 rounded-sm
     border-1 border-gray-300  transition duration-300">
                <img class="w-full h-70 mx-auto  " src= "${item.imgSrc}" alt="productImage">
                <div class="flex flex-col px-20 mx-auto py-5 font-bold text-left  gap-y-2 ">
                    <h2 class="text-lg font-bold">${item.title}</h2>
                    <span class="text-sm">Color : ${item.color}</span>
                    <p class="text-sm">Price : ${item.price}.LE</p>
                </div>
                    <div class="flex items-center justify-center">
                        <button class="rounded-md  py-1 px-4 font-bold bg-black text-white hover:bg-gray-900  
                         transition duration-300" id="addToCart-${item.id}" onClick="fromFavToCart(${item.id})">Add to Cart</button>
                     
                  
                        <button class="" id="${item.id}" onClick="removeFavItem(${item.id})">
                        <i class="fa-solid fa-heart text-red-700  text-xl md:text-2xl ml-2 md:ml-4"></i>
                        </button>
                    </div>
            </div>`
    favItemsDiv.innerHTML += z
        favItems = [...favItems , item ]
        localStorage.setItem("favItems" , JSON.stringify(favItems))
    }
    let AddBtn = document.getElementById(`addFav-${id}`)
    let removeBtn = document.getElementById(`removeFav-${id}`)
    if(AddBtn){
        AddBtn.classList.add("hidden")
        removeBtn.classList.remove("hidden")
    }
}

/// remove fav item
function removeFavItem(id) {
    let removeItem = document.getElementById(`fav-${id}`)
    removeItem.remove()    
    favItems = favItems.filter(item => item.id !== id)
    localStorage.setItem("favItems", JSON.stringify(favItems))

    let AddBtn = document.getElementById(`addFav-${id}`)
    let removeBtn = document.getElementById(`removeFav-${id}`)
    if(AddBtn){
        AddBtn.classList.remove("hidden")
        removeBtn.classList.add("hidden")
    }
}

/// add product to cart from fav fuction 
function fromFavToCart(id){
    
    let item = favItems.find((item) => item.id === id)
    let checkExist = addedItems.find((item) => item.id === id)
    if(!checkExist){
    let x = `<div  id="${item.id}" price="${item.price}" class=" hover:shadow-2xl hover:-translate-y-4 h-112  w-80  xl:w-80 bg-gray-200 rounded-sm
     border-1 border-gray-300  transition duration-300">
                <img class="w-full h-70 mx-auto  " src= "${item.imgSrc}" alt="productImage">
                    <div class="flex flex-col px-5 mx-auto py-5 font-bold text-left  gap-y-2 ">
                    <h2 class="text-lg font-bold">${item.title}</h2>
                    <span class="text-sm">Color : ${item.color}</span>
                    <p class="inline text-sm">Price : ${item.price} LE</p>
                      <div class="mt-[-65px] mb-[20px] ml-45 space-x-1  ">
                        <button class="border border-2  px-[8px] md:px-[10px] font-bold text-base md:text-2xl"  onClick="itemCounter(${item.id}, -1)">-</button>
                        <span class="w-5 font-bold md:text-2xl" id="counter-${item.id}">1</span>
                        <button class="border border-2  px-[8px] md:px-[10px] font-bold text-base md:text-2xl" onClick="itemCounter(${item.id}, +1)">+</button>                                       
                    </div>
            </div>
                    <div class="flex items-center justify-center">
                  
                         <button class="rounded-md  py-1 px-4  font-bold bg-red-700 text-white hover:bg-red-800 hover:text-white
                          transition duration-300" id="removeItem-${item.id}" onClick="removeProduct(${item.id})">
                          Remove From Cart</button>
                        <button class="hidden" id="addFav-${item.id}" onClick="addFavItem(${item.id})">
                        <i class="fa-solid fa-heart text-black text-xl md:text-2xl ml-2 md:ml-4"></i>
                        </button>
                        <button class="" id="removeFav-${item.id}" onClick="removeFavItem(${item.id})">
                        <i class="fa-solid fa-heart text-red-700  text-xl md:text-2xl ml-2 md:ml-4"></i>
                        </button>
                    </div>
            </div>`
        CartedProductsDiv.innerHTML += x
        addedItems = [...addedItems, item]
        localStorage.setItem("addedProducts", JSON.stringify(addedItems))
        localStorage.setItem(`counter${id}` , 1)
        let addPrice =  Number(localStorage.getItem("price")) + item.price 
        localStorage.setItem("price" , addPrice)   
        priceDiv.innerHTML =  (localStorage.getItem("price") || 0) + ".LE" 
    }
    let favItem = favItems.find((item) => item.id === id)
    if(item.id === favItem.id){
        let addBtn = document.getElementById(`addFav-${id}`)
        let removeBtn = document.getElementById(`removeFav-${id}`)
        let counter = document.getElementById(`counter-${id}`)
        counter.innerHTML = localStorage.getItem(`counter${id}`)
        addBtn.classList.add("hidden")
        removeBtn.classList.remove("hidden")
    }
          
}

/// keep changes after reload
function keepFavReload() {
    if (!favItems.length) return;

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

// let priceArr = localStorage.getItem("price") ? JSON.parse(localStorage.getItem("price")) : []
let priceDiv = document.getElementById(`totalPriceDiv`)
function itemCounter(id, change) {
    let item = addedItems.find((item) => item.id === id)
    let counterDiv = document.getElementById(`counter-${id}`)
    
    item.count = Math.max(1, (item.count ?? 1) + change)

    localStorage.setItem(`counter${item.id}` , item.count)
    counterDiv.innerHTML = localStorage.getItem(`counter${item.id}`)
    
    let countPrices = addedItems.map(item => item.price * (item.count ?? 1)).reduce((acc , current) => acc+current,0)
        
    localStorage.setItem("price" , countPrices)
    priceDiv.innerHTML = countPrices + ".LE"

}


function keepOnReLoad() {
    let counterPrint = addedItems.forEach((item) => {
        let counterDiv = document.getElementById(`counter-${item.id}`)
        let counter = Number(localStorage.getItem(`counter${item.id}`)) || 1
        item.count = counter

        counterDiv.innerHTML = counter
    })

    priceDiv.innerHTML = localStorage.getItem("price") + ".LE"
}

keepOnReLoad()
