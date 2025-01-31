// Función para obtener los países del localStorage o cargarlos si no existen
function obtenerPaises() {
    let paises = localStorage.getItem("paises");

    if (!paises) {
        console.log("No hay datos en localStorage, cargando desde la API...");
        cargarPaises(); // Si no hay datos, llamamos a la función que los carga
    } else {
        return JSON.parse(paises); // Convertimos el string JSON a un array de objetos
    }
}

// Al cargar la página, verificamos si los datos existen
var paises = obtenerPaises();

if (paises) {
    console.log("Usando datos de localStorage en BuscarPaises.html");
    mostrarResultados(paises); // Llamamos a la función que muestra los países
}

// Buscar país en la lista almacenada en localStorage
async function buscarPais() {
    const paisBuscado = document.getElementById("txtBuscarP").value.trim().toLowerCase();

    if (!paisBuscado) {
        alert("Por favor ingrese un país");
        mostrarResultados(paises); // Llamamos a la función que muestra los países
        return;
    }

    const paises = await obtenerPaises(); // Obtener lista de países (del localStorage)

    // Buscar país en la lista (ignorando mayúsculas y minúsculas)
    const paisEncontrado = paises.filter(pais =>
        pais.name.common.toLowerCase().includes(paisBuscado) ||
        (pais.translations.spa?.common?.toLowerCase() === paisBuscado)
    );

    if (paisEncontrado.length > 0) {
        mostrarResultados(paisEncontrado);
    } else {
        alert("País no encontrado");
        mostrarResultados(paises); // Llamamos a la función que muestra los países
        return
    }
}

// Mostrar resultados en pantalla
function mostrarResultados(paises) {
    const container = document.getElementById("Resultado");
    container.innerHTML = ""; // Limpiar contenido anterior

    paises.forEach(pais => {
        const card = document.createElement("div");
        card.className = "country-card";
        const nombreTraduc = pais.translations.spa?.common || pais.name.common;
        const nombreMayusc = nombreTraduc.charAt(0).toUpperCase() + nombreTraduc.slice(1); // Capitalizar primera letra
        card.innerHTML = `
            <h2>${nombreMayusc}</h2>
            <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}" class="flag">
        `;

        //A la hora de presionar sobre el país, se activa el evento click para que se llame la función mostrarDetalles y el modal
        card.addEventListener("click", () => {
            mostrarDetalles(pais.name.common);
        });

        container.appendChild(card);
    });
}

// Mostrar detalles en un modal
function mostrarDetalles(nombrePais) {
    const paises = JSON.parse(localStorage.getItem("paises"));
    const pais = paises.find(p => p.name.common === nombrePais);

    if (!pais) return alert("No se encontraron detalles del país.");

    const modalBody = document.getElementById("modalBody");
    const nombreTraduc = pais.translations.spa?.common || pais.name.common;
    const nombreMayusc = nombreTraduc.charAt(0).toUpperCase() + nombreTraduc.slice(1);
    modalBody.innerHTML = `
        <h2>${nombreMayusc}</h2>
        <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : "N/A"}</p>
        <p><strong>Población:</strong> ${pais.population.toLocaleString()}</p>
        <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}" class="flag">
    `;

    const modal = new bootstrap.Modal(document.getElementById("paisModal"));
    modal.show();
}

// Evento para el botón de búsqueda
document.getElementById("btnBuscarP").addEventListener("click", buscarPais, false);


