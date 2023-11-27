let lis = document.querySelectorAll('li')
console.log('hola')

// Agrega un event listener a cada elemento <li>
lis.forEach(function(item) {
    item.addEventListener("click", function() {
        // Imprime un mensaje en la consola cada vez que se hace clic en un elemento <li>
        console.log("hhhshhs");
    });
  });