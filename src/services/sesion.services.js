async function createSesion(hora) {
    return fetch('http://localhost:2022/api/sesion', {
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
    return fetch('http://localhost:2022/api/sesion', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
    })
        .then(response => response.json())
}

async function editSesion(id, hora) {
    return fetch(`http://localhost:2022/api/sesion/${id}`, {
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