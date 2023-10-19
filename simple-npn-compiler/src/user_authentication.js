// Dynamic buttons
const dynamicBtn = document.querySelectorAll('[data-nav-link]')

// Check if user is logged in with session stroage else try log in with local storage
if(sessionStorage.getItem("server-session") !== null) {
    if (localStorage.getItem("userData")) {
        showUserIcon()
    } else {
        fetchUserData()
    }
} else {
    refreshSession()
}

async function fetchUserData() {
    const responce = await fetch('./server/user_authentication_fetch_user.php').then(response=>{if(response.status === 200){return response.text()}})
    if (responce) {
        localStorage.setItem('userData', responce)
        showUserIcon()
    } else {
        showLogin()
    }
}

async function refreshSession() {
    if (localStorage.getItem("userData") && localStorage.getItem('userPass')) {
        const userDataObj = JSON.parse(localStorage.getItem("userData"))
        const formData = new FormData()
        userDataObj.username ? type = 'username' : type = 'email'
        formData.append(type, userDataObj[type])
        formData.append('password', localStorage.getItem('userPass'))
        await fetch('./server/login.php', {method: 'POST', body: formData})
        fetchUserData()
    } else {
        showLogin()
    }
}

function showUserIcon() {
    if (document.getElementById('default-account') !== null) {
        document.getElementById('default-account').style.display = 'block'
    }
    setDashboardLinks('./dashboard/create-survey')
    showUserMenu()
}

function setDashboardLinks(link) {
    for (var i=0, l=dynamicBtn.length; i < l; ++i ) {
        dynamicBtn[i].href = link
    }
}

function showUserMenu() {
    const accountMenu = document.getElementById('default-account-menu')
    if (accountMenu !== null) {
        // Check if username or email is stored
        const userDataObj = JSON.parse(localStorage.getItem("userData"))
        userDataObj.username ? type = 'username' : type = 'email'
        document.getElementById('default-account-user-id').innerHTML = userDataObj[type]

        // Logout event listener
        document.getElementById('logout').addEventListener('click', e=> {
            e.preventDefault()
            logout()
        }, {once : true})
    }

    const defaultAccountSvg = document.getElementById('default-account-icon')
    if (defaultAccountSvg !== null) {
        defaultAccountSvg.addEventListener('click', e=> {
            accountMenu.style.display = accountMenu.style.display === '' ? 'block' : '';
        })

        // Hide account menu when clicking outside element
        document.addEventListener('click', e=> {
            if (e.target !== defaultAccountSvg && !accountMenu.contains(e.target)) {
                accountMenu.style.display = ''
            }
        })
    }
}

function showLogin() {
    const defaultNavLoginBtn = document.getElementById('default-nav-login-btn')
    if (defaultNavLoginBtn !== null) {
        defaultNavLoginBtn.style.display = 'block'
        setDashboardLinks('./login')
    }
}

function logout() {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "./"
}
