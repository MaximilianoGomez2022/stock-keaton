import { useState, useEffect } from "react"
import {useParams} from 'react-router-dom'
import * as ProductsServices from "../services/products.services"

function ProductList() {

    const {id} = useParams()
    const [product, setProducts] = useState({})

    useEffect(()=>{
        ProductsServices.findById(id)
        .then(data => {
            setProducts(data)
        })
    }, [id])


   return ( 
            <div className="container">
            <h1>Detalle</h1>
            <h2>{product.name}</h2>
            <h3>{product.category}</h3>
            </div> )

}

export default ProductList