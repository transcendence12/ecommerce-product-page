 
const menu = document.querySelector(".menu")
const hamburgerBtn = document.querySelector(".hamburger")
const closeBtn = document.getElementById("close-menu")
const btnCart = document.querySelector(".btnCart")
const cart = document.querySelector(".cart")


// Hamburger Menu
hamburgerBtn.addEventListener("click", onHamburgerClick)
closeBtn.addEventListener("click", onCloseClick)

// Product in cart
btnCart.addEventListener("click", openCartWhenClicked)

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