// Al cargar la página, verificamos si los datos existen y luego imprimmimos todos los países
//Enlace de script esat al final del body en BuscarPaises.html
var paises = obtenerPaises();//recibe el JSON de países

if (paises) {
    mostrarResultados(paises); //Función que muestra todos los países, la lista 
}


/************************************************************************************************************************************ */
// Función para obtener los países del localStorage o cargarlos si no existen
function obtenerPaises() {
    let paises = localStorage.getItem("paises");

    if (!paises) {
        console.log("No hay datos en localStorage, cargando desde la API...");
        cargarPaises(); // Si no hay datos, llamamos a la función para que los cargue
        //CragarPiases es una función que se encuentra en la carpeta index.js
    } else {
        return JSON.parse(paises); // Convertimos el string recibido en el localStorage a un array de objetos JSON
    }
}

// Mostrar resultados de los países en la página o el país buscado
function mostrarResultados(paises) {
    const container = document.getElementById("Resultado");
    container.innerHTML = ""; // Limpiar contenido anterior

    paises.forEach(pais => {
        const cartaPais = document.createElement("div");
        cartaPais.className = "cartaPais";
        const nombreTraduc = pais.translations.spa?.common || pais.name.common;
        const nombreMayusc = nombreTraduc.charAt(0).toUpperCase() + nombreTraduc.slice(1); // Capitalizar primera letra
        cartaPais.innerHTML = `
            <h2>${nombreMayusc}</h2>
            <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}" class="flag">
        `;

        //A la hora de presionar sobre el país, se activa el evento click para que se llame la función mostrarDetalles y el modal
        cartaPais.addEventListener("click", () => {
            mostrarDetalles(pais.name.common);
        });

        container.appendChild(cartaPais);
    });
}

// Mostrar detalles en un modal
function mostrarDetalles(nombrePais) {
    
    const pais = paises.find(p => p.name.common === nombrePais);

    if (!pais) return alert("No se encontraron detalles del país.");

    const modalBody = document.getElementById("modalBody");
    const nombreTraduc = pais.translations.spa?.common || pais.name.common;
    const nombreMayusc = nombreTraduc.charAt(0).toUpperCase() + nombreTraduc.slice(1);
    modalBody.innerHTML = `
        <h2>${nombreMayusc}</h2>
        <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : "No tiene capital"}</p>
        <p><strong>Población:</strong> ${pais.population.toLocaleString()}</p>
        <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}" class="flag">
    `;

    const modal = new bootstrap.Modal(document.getElementById("paisModal"));
    modal.show();
}

// Buscar país en la lista almacenada en localStorage
async function buscarPais() {
    const paisBuscado = document.getElementById("txtBuscarP").value.trim().toLowerCase();

    if (!paisBuscado) {
        alert("Por favor ingrese un país");
        mostrarResultados(paises); // Llamamos a la función que muestra los países
        return;
    }

    // Buscar país en la lista (ignorando mayúsculas y minúsculas) ya el pais ingreado esta en minusculas
    const paisEncontrado = paises.filter(pais =>
        pais.name.common.toLowerCase().includes(paisBuscado) || //Uso inlude para que busque la palabra en cualquier parte del nombre
        (pais.translations.spa?.common?.toLowerCase().includes(paisBuscado))
        //Tiene las opciones si se imgresa en ingles o en español
    );

    if (paisEncontrado.length > 0) {
        mostrarResultados(paisEncontrado);
    } else {
        alert("País no encontrado");
        mostrarResultados(paises); // Llamamos a la función que muestra los países
        return
    }
}

// Evento para el botón de búsqueda
document.getElementById("btnBuscarP").addEventListener("click", buscarPais, false);


