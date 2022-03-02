const menu = document.querySelector(".menu")
const hamburgerBtn = document.querySelector(".hamburger")
const closeBtn = document.getElementById("close-menu")

hamburgerBtn.addEventListener("click", onHamburgerClick)
closeBtn.addEventListener("click", onCloseClick)

function onHamburgerClick() {
    menu.classList.remove("hidden")
}

function onCloseClick() {
    menu.classList.add("hidden")
}
