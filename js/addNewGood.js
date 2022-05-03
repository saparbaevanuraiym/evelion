const add = document.getElementById('add')
const baseURL = 'https://pbasics.pythonanywhere.com'

const title = document.querySelector('.inputTitle')
const description = document.querySelector('.inputDescrip')
const price = document.querySelector('.inputPrice')
const image_url = document.querySelector('.inputImgURL')
const category = document.querySelectorAll('.category')
const inputs = document.querySelectorAll('.inputs')
const error = document.querySelector('.error')
const added = document.querySelector('.added')
const category_container = document.querySelector('.category_container')


add.addEventListener('click', e => {
  e.preventDefault()

  error.classList.add('active')
  error.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`

  request(title.value, description.value, price.value, image_url.value)
})

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    error.classList.remove('active')
  }
})

function request (title, description, price, image_url, ) {
  fetch(`${baseURL}/products/create/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description,
      price,
      image: null,
      image_url,
      category: itemChecked(),
    })
  })
  .then(res => res.json())
  .then(res => {
    resetValue(inputs)
    if (!res.id) {
      const object = Object.entries(res) 
      const result = object.map(item => {
        return `<span><h3>${item[0]}:</h3> <p>${item[1].join('')}</p></span>`
      })
      error.innerHTML = result.join('')
      onClick()
      validation(res)
    } else {
      setTimeout(() => {
        window.open('index.html', '_self')
      }, 2000)
      addAlert()
    } 
  })
  .catch(err => console.log(err))
}

function resetValue (item) {
  item.forEach(el => el.value = '')
}

function itemChecked () {
  let checked = 0
  category.forEach(item => {
    if (item.checked) {
      checked = parseInt(item.value)
    }
  })
  return checked
}

function onClick (e) {
  error.insertAdjacentHTML('beforeEnd', `<button id="closeModal">Close</button>`)
  const closeModal = document.querySelector('#closeModal')
  closeModal.addEventListener('click', e => {
    e.preventDefault()
    error.classList.remove('active')
  })
}

function addAlert () {
  error.classList.remove('active')
  added.style.transform = 'translateY(80px)'
  setTimeout(() => {
    added.style.transform = 'translateY(0px)'
  }, 2500)
}

function validation (el) {
  const arr = Object.keys(el)
  arr.forEach(item => {
    if (item === 'title') {
      title.style.border = '1.5px solid red'
      title.style.background = '#ff50505d'
    } else if (item === 'description') {
      description.style.border = '1.5px solid red'
      description.style.background = '#ff50505d'
    } else if (item === 'price') {
      price.style.border = '1.5px solid red'
      price.style.background = '#ff50505d'
    }
  })
}

title.addEventListener('change', e => {
  if (e.target.value !== '') {
    title.style.border = '1px solid #dddfe2'
    title.style.background = '#fff'
  }
})

description.addEventListener('change', e => {
  if (e.target.value !== '') {
    description.style.border = '1px solid #dddfe2'
    description.style.background = '#fff'
  }
})

price.addEventListener('change', e => {
  if (e.target.value !== '') {
    price.style.border = '1px solid #dddfe2'
    price.style.background = '#fff'
  }
})