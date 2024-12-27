import { useState, useEffect } from "react"

function Success({mensaje}) {

    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 3000); // Desaparecerá después de 3 segundos
    
        return () => {
          clearTimeout(timer);
        };
      }, []);

    return isVisible ? <div className="success"><img src="/img/success.svg"></img><p>{mensaje}</p></div> : null

}

export default Success