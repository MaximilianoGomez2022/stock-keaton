import { useState, useEffect } from "react"

function Error({mensaje}) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 155000); // Desaparecerá después de 3 segundos
    
        return () => {
          clearTimeout(timer);
        };
      }, []);

    return isVisible ? <div className="error"><img src="/img/error.svg"></img><p>{mensaje}</p></div> : null
}

export default Error