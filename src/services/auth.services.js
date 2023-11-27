async function login(mail, password) {
    return fetch('http://localhost:2022/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mail, password })
    })
        .then(async response => {
            if (response.ok) {
                return response.json()
            }
            else if (response.status === 400) {
                throw await response.json()
            }
            else {
                throw new Error('No se pudo iniciar sesión')
            }
        })
}

async function logout() {
    return fetch('http://localhost:2022/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        }
    })

        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw new Error('No se pudo cerrar sesión')
            }
        })
}

export {
    login,
    logout
}