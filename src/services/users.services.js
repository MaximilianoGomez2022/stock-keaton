async function findById(id) {
    return fetch(`https://back-stock-keaton.vercel.app/api/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw new Error('No se pudo obtener los users')
            }
        })
}

async function edit(id, user) {
    return fetch(`https://back-stock-keaton.vercel.app/api/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
}

async function editContraseña(id, contraseñas) {  
    return fetch(`https://back-stock-keaton.vercel.app/api/users/cambiarPassword/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(contraseñas)
    })
    .then(response => response.json())
}

export {
    findById,
    edit,
    editContraseña
}