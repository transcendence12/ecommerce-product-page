 
const menu = document.querySelector(".menu")
const hamburgerBtn = document.querySelector(".hamburger")
const closeBtn = document.getElementById("close-menu")
const btnCart = document.querySelector(".btnCart")
const cart = document.querySelector(".cart")
const btnMinus = document.querySelector("#btnMinus")
const btnPlus = document.querySelector("#btnPlus")
const productCounter = document.querySelector(".counter")

let productCounterValue = 0

const gallery = document.querySelectorAll(".pic")
const heroImg = document.querySelector(".product-hero")
const btnNext = document.querySelector(".next")
const btnPrevious = document.querySelector(".previous")
const btnAddToCard = document.querySelector(".btn")

let productsInCart = 0

const cartCount = document.querySelector(".cart-count")
const productInShoppingCart = document.querySelector(".products-in-cart")

let price = 250.00
let discount = 0.5

const msgEmpty = document.querySelector(".msg-empty")
const checkout = document.querySelector(".checkout")
const overlay = document.querySelector(".overlay")
const lightbox = document.querySelector(".lightbox")

let lightboxGallery
let lightboxHero



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

btnNext.addEventListener("click", handleBtnClickNext)
btnPrevious.addEventListener("click", handleBtnClickPrevious)

btnAddToCard.addEventListener("click", addToCart)
heroImg.addEventListener("click", onHeroImgClick)





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
     heroImg.src = event.target.src.replace("-thumbnail", "")
}
// ON MOBILE:
function handleBtnClickNext() {
    let imageIndex = getCurrentImageIndex()
    imageIndex++
    if (imageIndex > 4) {
        imageIndex = 1
    }
    setHeroImage(imageIndex)
}

function handleBtnClickPrevious() {
    let imageIndex = getCurrentImageIndex()
    imageIndex--
    if (imageIndex < 1) {
        imageIndex = 4
    }
    setHeroImage(imageIndex)
}

function getCurrentImageIndex() {
    const imageIndex = parseInt(heroImg.src.split("\\").pop().split("/").pop().replace(".jpg", "").replace("image-product-", ""))
    return imageIndex
}

function setHeroImage(imageIndex) {
    heroImg.src = `./images/image-product-${imageIndex}.jpg`
    // images are not sync
    gallery.forEach(img => {
        img.classList.remove("active")
    })
    // set active thumbnail
    gallery[imageIndex-1].classList.add("active")
}

// PRODUCTS IN CART

function addToCart() {
    productsInCart += productCounterValue

    const productHTMLElement = `
    <div class="item">
        <img class="product-img" src="./images/image-product-1-thumbnail.jpg" alt="product 1 thumbnail">

        <div class="details">
            <div class="product-name">Autumn Limited Edition...</div>
            <div class="price-group">
                <div class="price">$${(price*discount).toFixed(2)}</div> x
                <div class="count">${productsInCart}</div>
                <div class="total-amount">$${(price*discount*productsInCart).toFixed(2)}</div>
            </div>
        </div>
        <img id="btnDelete" src="./images/icon-delete.svg" alt="icon delete">
    </div>
    `

    productInShoppingCart.innerHTML = productHTMLElement

    updateCart()

    const btnDelete = document.querySelector("#btnDelete")
    btnDelete.addEventListener("click", onBtnDeleteClick)
}

function updateCart() {
    updateCartIcon()
    updateMsgEmpty()
    updateCheckoutButton()
}

function updateCartIcon() {
    cartCount.textContent = productsInCart
    if (productsInCart === 0) {
        if (!productInShoppingCart.classList.contains("hidden")) {
            cartCount.classList.add("hidden")
        }
    } else {
        cartCount.classList.remove("hidden")
    }
}

function updateMsgEmpty() {
    if (productsInCart === 0) {
        if (msgEmpty.classList.contains("hidden")) {
            msgEmpty.classList.remove("hidden")
        }
    } else {
        if (!msgEmpty.classList.contains("hidden")) {
            msgEmpty.classList.add("hidden")
        }
    }
}

function updateCheckoutButton() {
    if (productsInCart === 0) {
        if (!checkout.classList.contains("hidden")) {
            checkout.classList.add("hidden")
        }
    } else {
        checkout.classList.remove("hidden")
    }
}

function onBtnDeleteClick() {
    if (productsInCart > 0) {
        productsInCart--
    }
    updateCart()

    const el = document.querySelector(".count")
    const totalAmount = document.querySelector(".total-amount")
    el.innerHTML = productsInCart
    totalAmount.innerHTML = `$${(price*discount*productsInCart).toFixed(2)}`

    if (productsInCart === 0) {
        productInShoppingCart.innerHTML = ""
    }
}

// OVERLAY with arrows
function onHeroImgClick() {
        
    if (window.innerWidth >= 1440) {
        if (overlay.childElementCount === 1) {
            const newNode = lightbox.cloneNode(true)
            overlay.appendChild(newNode)
            
            const btnOverlayClose = document.querySelector("#btnOverlayClose")
            btnOverlayClose.addEventListener("click", onBtnOverlayCloseClick)

            lightboxGallery = overlay.querySelectorAll(".pic")
            lightboxHero = overlay.querySelector(".product-hero")
            lightboxGallery.forEach(img => {
                img.addEventListener("click", onThumbClickLightbox)
            })
            
            const btnOverlayNext = overlay.querySelector(".next")
            const btnOverlayPrevious = overlay.querySelector(".previous")
            btnOverlayNext.addEventListener("click", handleBtnClickNextOverlay)
            btnOverlayPrevious.addEventListener("click", handleBtnClickPreviousOverlay)
            
        }
        overlay.classList.remove("hidden")
    }
}

function onBtnOverlayCloseClick() {
    overlay.classList.add("hidden")
}

function onThumbClickLightbox(event) {
    //remove active state from all thumbs
     lightboxGallery.forEach(img => {
         img.classList.remove("active")
     })
    //set activ thumb
     event.target.parentElement.classList.add("active")
    //  update hero image
     lightboxHero.src = event.target.src.replace("-thumbnail", "")
}


function handleBtnClickNextOverlay() {
// console.log("I am clicked!!!!")
    let imageIndex = getOverlayCurrentImageIndex()
    imageIndex++
    if (imageIndex > 4) {
        imageIndex = 1
    }
    setOverlayHeroImage(imageIndex)
}

function handleBtnClickPreviousOverlay() {
    let imageIndex = getOverlayCurrentImageIndex()
    imageIndex--
    if (imageIndex < 1) {
        imageIndex = 4
    }
    setOverlayHeroImage(imageIndex)
}

function getOverlayCurrentImageIndex() {
    const imageIndex = parseInt(lightboxHero.src.split("\\").pop().split("/").pop().replace(".jpg", "").replace("image-product-", ""))
    return imageIndex
}

function setOverlayHeroImage(imageIndex) {
    lightboxHero.src = `./images/image-product-${imageIndex}.jpg`
    // images are not sync
    lightboxGallery.forEach(img => {
        img.classList.remove("active")
    })
    // set active thumbnail
    lightboxGallery[imageIndex-1].classList.add("active")
}

