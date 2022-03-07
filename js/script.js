 
const menu = document.querySelector(".menu")
const hamburgerBtn = document.querySelector(".hamburger")
const closeBtn = document.getElementById("close-menu")
const btnCart = document.querySelector(".btnCart")
const cart = document.querySelector(".cart")
const btnMinus = document.getElementById("btnMinus")
const btnPlus = document.getElementById("btnPlus")
const productCounter = document.querySelector(".counter")

let productCounterValue = 1

const gallery = document.querySelectorAll(".pic")
const heroImg = document.querySelector(".product-hero")



// Hamburger Menu
hamburgerBtn.addEventListener("click", onHamburgerClick)
closeBtn.addEventListener("click", onCloseClick)

// Product in cart
btnCart.addEventListener("click", openCartWhenClicked)

//Increment or decrement the counter
btnPlus.addEventListener("click", productCounterIncrement)
btnMinus.addEventListener("click", productCounterDecrement)

for (let i = 0; i < gallery.length; i++) {
    gallery[i].addEventListener("click", onThumbClick)
}

function onHamburgerClick() {
    menu.classList.remove("hidden")
}

function onCloseClick() {
    menu.classList.add("hidden")
}

// Product in cart - when cart is closed .toggle() method make it open.
// when cart is open .toggle() method makes it closed.

function openCartWhenClicked() {
    cart.classList.toggle("hidden")
}

function productCounterIncrement() {
    setProductCounterValue(1)
}

function productCounterDecrement() {
    setProductCounterValue(-1)
}

function setProductCounterValue(value) {
    if ((productCounterValue + value) > 0) {
        productCounterValue += value
        productCounter.textContent = productCounterValue
    }
}

function onThumbClick(event) {
    //remove active state from all thumbs
     gallery.forEach(img => {
         img.classList.remove("active")
     })
    //set activ thumb
     event.target.parentElement.classList.add("active")
    //  update hero image
     heroImg.src = event.target.src
}