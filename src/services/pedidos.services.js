
async function create(pedido) {
    return fetch('https://back-stock-keaton.vercel.app/api/pedidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(pedido)
    })
    .then(response => response.json())
}

async function traerPedidos() {
    return fetch('https://back-stock-keaton.vercel.app/api/pedidos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
    })
    .then(response => response.json())
}

async function traerPedidoPorId(id) {
    return fetch(`https://back-stock-keaton.vercel.app/api/pedido/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
    })
    .then(response => response.json())
}

async function editarPedido(id, pedido) {
    return fetch(`https://back-stock-keaton.vercel.app/api/pedido/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(pedido)
    })
    .then(response => response.json())
}

async function eliminar(id) {
    return fetch(`https://back-stock-keaton.vercel.app/api/pedido/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-type' : 'apllication/json',
            'auth-token': localStorage.getItem('token')
        },
    })
    .then(response => response.json())

}

export {
    create,
    traerPedidos,
    traerPedidoPorId,
    editarPedido,
    eliminar
}