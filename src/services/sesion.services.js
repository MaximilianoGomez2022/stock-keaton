async function createSesion(hora) {
    return fetch('https://back-stock-keaton.vercel.app/api/sesion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(hora)
    })
        .then(response => response.json())
}

async function find() {
    return fetch('https://back-stock-keaton.vercel.app/api/sesion', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
    })
        .then(response => response.json())
}

async function editSesion(id, hora) {
    return fetch(`https://back-stock-keaton.vercel.app/api/sesion/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(hora)
    })
        .then(response => response.json())
}

export {
    createSesion,
    editSesion,
    find
}