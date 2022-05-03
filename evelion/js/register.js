const register = document.querySelector('#register')
const userEmail = document.querySelector('#email')
const userName = document.querySelector('#name')
const userPass = document.querySelector('#pass')
const error = document.querySelector('.error')
const added = document.querySelector('.added')
const auth = document.querySelector('#auth')

const baseUrl = 'https://pbasics.pythonanywhere.com'

auth.addEventListener('click', e => {
  e.preventDefault()
  window.open('../auth.html', '_self')
})

register.addEventListener('click', e => {
  e.preventDefault()

  error.classList.add('active')
  error.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`

  getUsers(userName.value, userPass.value, userEmail.value)
})

function getUsers(username, password, email) {
  fetch(`${baseUrl}/auth/users/`, {
      method: 'POST',
      headers: {
      'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        username,
      })
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
    if (!res.id) {
      const object = Object.entries(res) 
      const result = object.map(item => {
        return `<span><h3>${item[0]}:</h3> <p>${item[1].join('')}</p></span>`
      })
      error.innerHTML = result.join('')
      onClick()
    } else {
      addAlert()
    }
  })
  .catch(err => console.log(err))

  reset()
}

function reset(){
  userName.value = ''
  userPass.value = ''
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
  added.style.transform = 'translateY(120px)'
  setTimeout(() => {
    added.style.transform = 'translateY(0px)'
  }, 2500)
}