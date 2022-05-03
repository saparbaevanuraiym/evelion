const register = document.querySelector('#register')
const email = document.querySelector('#email')
const username = document.querySelector('#name')
const password = document.querySelector('#pass')
const error = document.querySelector('.error')
const added = document.querySelector('.added')
const auth = document.querySelector('#auth')

const baseUrl = 'https://pbasics.pythonanywhere.com'

auth.addEventListener('click', e => {
  e.preventDefault()
  
  getAuth(username.value, password.value)
})

register.addEventListener('click', e => {
  e.preventDefault()

  error.classList.add('active')
  error.innerHTML = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`

  getRegister(username.value, password.value, email.value)
})

function getRegister(username, password, email) {
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
      validation(res)
      onClick()
    } else {
      successRegister()
    }
  })
  .catch(err => console.log(err))

  reset()
}

function getAuth(username, password) {
  fetch(`${baseUrl}/auth/token/login/`, {
      method: 'POST',
      headers: {
      'Content-type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
      })
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
    if (!res.auth_token) {
      const object = Object.entries(res) 
      const result = object.map(item => {
        return `<span><h3>${item[0]}:</h3> <p>${item[1].join('')}</p></span>`
      })
      error.innerHTML = result.join('')
      validation(res)
      onClick()
    } else {
      successAuth()
      localStorage.setItem('username', username)
      setTimeout(() => {
        window.open('index.html', '_self')
      }, 2500)
    }
  })
  .catch(err => console.log(err))

  reset()
}

function reset(){
  username.value = ''
  password.value = ''
  email.value = ''
}

function onClick (e) {
  error.insertAdjacentHTML('beforeEnd', `<button id="closeModal">Close</button>`)
  const closeModal = document.querySelector('#closeModal')
  closeModal.addEventListener('click', e => {
    e.preventDefault()
    error.classList.remove('active')
  })
}

function successRegister () {
  error.classList.remove('active')
  added.innerHTML = '<h1>Success Register</h1><i class="fa-solid fa-circle-check"></i>'
  added.style.transform = 'translateY(120px)'
  setTimeout(() => {
    added.style.transform = 'translateY(0px)'
  }, 2500)
}

function successAuth () {
  error.classList.remove('active')
  added.innerHTML = '<h1>Success Auth</h1><i class="fa-solid fa-circle-check"></i>'
  added.style.transform = 'translateY(120px)'
  setTimeout(() => {
    added.style.transform = 'translateY(0px)'
  }, 2500)
}

function validation (el) {
  const arr = Object.keys(el)
  arr.forEach(item => {
    if (item === 'email') {
      email.style.border = '1.5px solid red'
      email.style.background = '#ff50505d'
    } else if (item === 'password') {
      password.style.border = '1.5px solid red'
      password.style.background = '#ff50505d'
    } else if (item === 'username') {
      username.style.border = '1.5px solid red'
      username.style.background = '#ff50505d'
    }
  })
}


// const baseUrl = 'https://pbasics.pythonanywhere.com/auth/users/'
// const $nameInput = document.getElementById('nameInput')
// const $passInput = document.getElementById('passInput')
// const $register = document.getElementById('register')
// const $auth = document.getElementById('auth')
// const $errors = document.querySelector('.errors')


// $register.addEventListener('click', e => {
//     e.preventDefault()
//     window.open('./register.html', '_self')
// })

// // $register.addEventListener('click', e => {
// //     e.preventDefault()
// //     getUsers($nameInput.value, $passInput.value)
// // })

// // function getUsers(userName, userPass, email) {
// //     $register.disabled = true
// //     $auth.disabled = true
// //     fetch(baseUrl, {
// //         method: 'POST',
// //         headers: {
// //             'Content-type':'application/json',
// //         },
// //         body: JSON.stringify({
// //             email:email,
// //             username:userName,
// //             password:userPass,
// //         })
// //     })
// //     .then(auth => auth.json())
// //     .then(res => {
// //         console.log(res)
// //         if (!res.id) {
// //             const err = res.username.map(item => {
// //                 return `<span>${item}</span>`
// //             }).join('')

// //             $errors.innerHTML = err
// //             reset()
// //         } 
// //     })
// //     .catch(err => {
// //         console.log(err)
// //     })
// //     .finally(() => {
// //         $register.disabled = false
// //         $auth.disabled = false
// //     })

// //     reset()
// // }


// // function reset(){
// //     $nameInput.value = ''
// //     $passInput.value = ''
// // }