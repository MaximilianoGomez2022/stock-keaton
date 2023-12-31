async function find() {
    return fetch('https://back-stock-keaton.vercel.app/api/products', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
    })
        .then(response => response.json())
}

async function findById(id) {
    return fetch(`https://back-stock-keaton.vercel.app/api/products/${id}`, {
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
                throw new Error('No se pudo obtener las products')
            }
        })
}

async function create(product) {
    return fetch('https://back-stock-keaton.vercel.app/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
}

async function guardarHistorial(historial) {
    return fetch('https://back-stock-keaton.vercel.app/api/historial', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(historial)
    })
        .then(response => response.json())
}

async function edit(id, product) {
    return fetch(`https://back-stock-keaton.vercel.app/api/products/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
}

async function eliminar(id) {
    return fetch(`https://back-stock-keaton.vercel.app/api/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
    })
        .then(response => response.json())
}

export {
    find,
    findById,
    create,
    edit,
    eliminar,
    guardarHistorial
}