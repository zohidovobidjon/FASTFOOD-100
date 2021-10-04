const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 500,
        amount: 0,
        get Sum(){
            return  this.price * this.amount
        },
        get Kcall(){
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 800,
        amount: 0,
        get Sum(){
            return  this.price * this.amount
        },
        get Kcall(){
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 1100,
        amount: 0,
        get Sum(){
            return  this.price * this.amount
        },
        get Kcall(){
            return this.kcall * this.amount
        }
    }    
}
const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной Майонез',
        price: 1000,
        kcall: 300
    },
    lettuce: {
        name: 'Салатный лист',
        price: 500,
        kcall: 50
    },
    cheese:{
        name:'Сыр',
        price: 800,
        kcall:100
    }
}
const btnPlusOrMinus = document.querySelectorAll('.main__product-btn')
btnPlusOrMinus.forEach(btn =>{
    btn.addEventListener('click', function(){
        plusOrMinus(this)
    })
})
function plusOrMinus(element) {
    /* 
    closest() - это метод обьекта. Который получает родителя 
    getAttribute() - который получает значение аттрибута у элемента с HTML 
    */
   const parent = element.closest('.main__product'),
       parentID = parent.getAttribute('id'),
       productAmount = parent.querySelector('.main__product-num'),
       price = parent.querySelector('.main__product-price span'),
       kcall = parent.querySelector('.main__product-kcall span '),
       elementAttribute = element.getAttribute('data-symbol');
       
       if(elementAttribute == '+'){
           product[parentID].amount++;
       } else if (elementAttribute == '-' && product[parentID].amount > 0){
           product[parentID].amount--;
       }
       productAmount.innerHTML = product[parentID].amount
       price.innerHTML = product[parentID].Sum
       kcall.innerHTML = product[parentID].Kcall
       
}
const checkExtraProduct = document.querySelectorAll('.main__product-checkbox')
checkExtraProduct.forEach(checkbox =>{
  checkbox.addEventListener('click', function () {
    addExtraProduct(this)
      
  })  
})
function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
    parentId = parent.getAttribute('id'),
    price = parent.querySelector('.main__product-price span'),
    kcall = parent.querySelector('.main__product-kcall span'),
    elementAttr = element.getAttribute('data-extra')
    
    product[parentId][elementAttr] = element.checked;
    
    if(product[parentId][elementAttr]==true){
        product[parentId].price += extraProduct[elementAttr].price
        product[parentId].kcall += extraProduct[elementAttr].kcall
    } else{
        product[parentId].price -= extraProduct[elementAttr].price
        product[parentId].kcall -= extraProduct[elementAttr].kcall
    }
   
    price.innerHTML = product[parentId].Sum
    kcall.innerHTML = product[parentId].Kcall
}

const addCart = document.querySelector('.addCart'),
receipt = document.querySelector('.receipt')
receiptWindow = document.querySelector('.receipt__window')
let arrProduct = [],
totalPrice = 0,
totalKcall = 0,
totalName = ''
addCart.addEventListener('click', function () {
    for(const key in product){
        if(product[key].amount > 0){
            arrProduct.push(product[key])
            for(const newKey in product[key]){
                if(product[key][newKey] == true){
                    product[key].name += extraProduct[newKey].name
                }
            }
        } 
    }
    for(let value of arrProduct){
        totalPrice += value.price
        totalKcall += value.kcall
        totalName += '\n' + value.name + '\n'
    }
    receipt.classList.remove('active')
    receipt.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 1
    `
    receiptWindow.style.cssText = `
    background: #fff;
    padding: 100px;
    border-radius: 10px;
    `
    
})

const timerLevel = document.querySelector('.header__timer-extra');

rec()
function rec(count = 1, speed = 30){

    timerLevel.innerHTML = count

    if (count > 50) {
        speed = 100
    }
    if (count > 80) {
        speed = 200
    }
    if (count > 90) {
        speed = 500
    }
    if (count != 100) {
        setTimeout(() =>
            rec(++count), speed
        )
    }
}




    
