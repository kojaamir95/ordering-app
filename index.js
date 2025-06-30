//importing the array of menus from data.js file
import {menuArray} from '/data.js'

//creating constants variables
const menuDiv = document.getElementById('menu-div')
const order = document.getElementById('order-div')
const completeOrderBtn = document.getElementById('order-btn')
const payBtn = document.getElementById('pay-btn')
const closeFormBtn = document.getElementById('close-form-btn')

// mapping over the menuArray and extracting each menu and create the menuList
const menuList = menuArray.map( (menu) => {
  return `
        <div class="content-menu-div" id="menu-div">
            <div class="list">
                <p class="menu-pic" id="menu-img">${menu.emoji}</p>
                    <div class="menu-div">
                        <h2 class="menu-title" id="menu-title">${menu.name}</h2>
                        <p class="menu-desc" id="menu-desc">${menu.ingredients}</p>
                        <p class="menu-price" id="menu-price">$${menu.price}</p>
                    </div>
                    <div class="btns">
                        <button class="plus-btn" id="plus-btn" data-plus="${menu.id}">+</button>
                    </div>
            </div>
            <hr>
        </div>
    `
})

//rendering the menuList to the user using the innerHTML property added to the menuDiv variable
menuDiv.innerHTML = menuList.join('')

//targeting buttons using dataset property to create custom data attributes on this buttons e.g data-plus, data-remove
document.addEventListener('click', (e) => {
    
    //data-plus is used to add an order in the order container using the renderOrder() call passing in the Id of the clicked + sign which holds the Id of the menu item
    if(e.target.dataset.plus) {
        renderOrder(e.target.dataset.plus)
        document.querySelector('div.total-div').classList.remove("disabled")
        document.querySelector('hr.opened').classList.remove("disabled")
        document.querySelector('h2.order-title').classList.remove('disabled')
        document.querySelector('button.complete-order-btn').classList.remove('disabled')
        document.querySelector('section.container').classList.add('disabled')
    }
    
    //data-remove is used to take away an order in the order container and update the total price
    if (e.target.dataset.remove) {
        let targetOrderItem = e.target.closest('.order-div')
        if (targetOrderItem) {
            targetOrderItem.remove()
            updateTotalPrice()
        }}
    
    //is used to make sure whether order container has anything left
    if (order.children.length == 0) {
        document.querySelector('button.complete-order-btn').classList.add('disabled')
        document.querySelector('div.total-div').classList.add("disabled")
        document.querySelector('hr.opened').classList.add("disabled")
        document.querySelector('h2.order-title').classList.add('disabled')}
})

//is a function which holds the Id of the menu passed when calling, created to render order object using the insertAdjancentHTML added to the order variable
function renderOrder(menuId) {
    
    //initializing the order object with empty keys (has no values)
    let orderObj = {
        name: "",
        price: ""
    }
    
    //iterating over the menu array to find the exact menu with the exact Id passed over it, takes it's values and store them in the object created above
    orderObj = menuArray.find((menu) => { 
        if (menuId == menu.id){
          return menu  
        }  
    })
    
    //creating the order html string that would added to the order container
    let orderObjHtml = `
                    <div class="order-div">
                        <p class="order-item" id="order-item">${orderObj.name}</p>
                        <button class="remove-btn" data-remove="${orderObj.id}">Remove</button>
                        <p class="order-price" id="order-price">$${orderObj.price}</p>
                    </div>
                `
    order.insertAdjacentHTML('beforeend', orderObjHtml)
    updateTotalPrice()
    }

//function created to make sure the total price is properly is updated everytime the user add or removes an order.
function updateTotalPrice() {
    //initializing variables
    let total = 0
    const orderPrices = document.querySelectorAll('.order-price')
    
    //updating the total using the price of each menu the user adds or remove to the order container
    orderPrices.forEach( (orderPrice) => {
        let price = parseFloat(orderPrice.textContent.replace('$', ''))
        total += price
    })
    
    //rendering the total price using textContent property targeting only the text of the paragraph
    document.getElementById('total-price').textContent = `$${total}`
    } 

//this function is used to handle proper payment modal
payBtn.addEventListener('click', () => {
    
    //initializing some variables
    let userName = document.getElementById('user-name')
    let userEmail = document.getElementById('user-email')
    let cardNumber = document.getElementById('card-number')
    let cardCvv = document.getElementById('card-cvv')
    const thankYouCard = document.querySelector('section.container')
    
    //checks whether the user has filled all the required spaces
    if (userName.value == '' || userEmail.value == '' || cardNumber.value == '' || cardCvv.value == '') {
        alert('Please fill all the required fields and then submit the form!')}
        else {
        order.innerHTML = ''
        thankYouCard.innerHTML = `
            <p>Thanks <span>${userName.value}!</span> Wait as we deliver your order!</p>
        `
        document.querySelector('section.container').classList.remove('disabled')
        document.querySelector('button.complete-order-btn').classList.add('disabled')
        document.querySelector('div.total-div').classList.add("disabled")
        document.querySelector('hr.opened').classList.add("disabled")
        document.querySelector('h2.order-title').classList.add('disabled')
        document.querySelector('form.payment-form').classList.add('form-closed')}
    
    //once the user has submitted the form it clears it
        userName.value = ''
        userEmail.value = ''
        cardNumber.value = ''
        cardCvv.value = ''
        })

//is used to render the form to the user
completeOrderBtn.addEventListener('click', () =>
    document.querySelector('form.payment-form').classList.remove('form-closed'))

//is used to close the form
closeFormBtn.addEventListener('click', () => 
    document.querySelector('form.payment-form').classList.add('form-closed'))