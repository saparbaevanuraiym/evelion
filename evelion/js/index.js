const baseURL = 'https://pbasics.pythonanywhere.com/'
const goods_container = document.querySelector('.goods-container')
const h1 = document.querySelector('.username')
let alertBasket = document.querySelector('.alertBasket')
const select = document.querySelector('#select')
const signup = document.querySelector('.signup')

select.addEventListener('change', e => {
  database(`/?category=${e.target.value}`)
})

const username = localStorage.getItem('username')
if (username !== null) {
  h1.innerHTML = `Добро пожаловать <span>${username}!</span>`
  signup.innerHTML = `<button onclick="logOut()">Log out</button>`
}


function cardTamplete (image_url, title, description, price, id) {
  return `
    <div class="card">
      <div class="card-img">
        <img src="${image_url}" alt="">
      </div>
      <div class="card-body">
        <div class="card-text">
          <p>13:26 / 30.04.2022</p>
          <h1>${title}</h1>
          <div class="card-comment">
            <i class="fa-solid fa-star colour"></i>
            <i class="fa-solid fa-star colour"></i>
            <i class="fa-solid fa-star colour"></i>
            <i class="fa-solid fa-star colour"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <h4>${description}</h4>
          <h1>$${price}</h1>
        </div>
      </div>
      <div class="card-footer">
        <button onclick="busket()">Buy</button>
        <button id="${id}" class="delete" onclick="deleteGood(${id})">Delete</button>
      </div>
    </div>
  
  `
}

function database(category = '') {
  goods_container.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
  fetch(`${baseURL}/products/${category}`, {
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(res => {
    const temp = res.map(({image_url, title, description, price, id}) => cardTamplete(image_url, title, description, price, id)).join('')
    goods_container.innerHTML = temp
  })
  .catch(err => {
    console.log(err)
    goods_container.innerHTML = `<h1 style="text-align: center">Что-то пошло не так!</h1>`
  })
}
database()

function busket () {
  alertBasket.style.transform = 'translateY(80px)'
  setTimeout(() => {
    alertBasket.style.transform = 'translateY(-80px)'
  }, 2000)
}

function deleteGood(id) {
  const askDelete = confirm('Are you sure you want to delete?')
  if (askDelete) {
    fetch(`${baseURL}/products/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        id,
      })
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => {
      window.location.reload()
    })
  } 
}

function logOut() {
  localStorage.removeItem('username')
  window.location.reload()
}