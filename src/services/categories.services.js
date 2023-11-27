async function find() {
    return fetch('http://localhost:2022/api/categories')
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw new Error('No se pudo obtener los productos')
            }
        })
}

export {
    find
}