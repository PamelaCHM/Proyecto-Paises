// Obtener los países del localStorage o hacer la petición si no existen
function obtenerPaises() {
    let paises = localStorage.getItem("paises");

    if (!paises) {
        console.log("No hay datos en localStorage, cargando desde la API...");
        cargarPaises(); // Si no hay datos, llamamos a la función que los carga
        return [];
    } else {
        return JSON.parse(paises); // Convertimos el string JSON a un array de objetos
    }
}

// Filtrar países por región usando `localStorage`
function filtrarPorRegion() {
    const region = document.getElementById("region").value; // Obtener la región seleccionada
    const paises = obtenerPaises(); // Obtener lista de países desde `localStorage`

    if (paises.length === 0) {
        alert("No hay datos de países. Intenta recargar la página.");
        return;
    }

    // Filtrar países por región
    const paisesFiltrados = paises.filter(pais => pais.region.toLowerCase() === region.toLowerCase());

    if (paisesFiltrados.length === 0) {
        alert("No se encontraron países en esta región.");
    } else {
        mostrarPaisesPorRegion(paisesFiltrados);
    }
}

// Al cargar la página, verificamos si los datos existen
const paises = obtenerPaises();

if (paises) {
    console.log("Usando datos de localStorage en BuscarPaises.html");
    mostrarPaisesPorRegion(paises); // Llamamos a la función que muestra los países
}

function mostrarPaisesPorRegion(paises) {
    const container = document.getElementById('resultados');
    container.innerHTML = ""; // Limpiar contenido anterior

    paises.forEach(pais => {
        const card = document.createElement('div');
        card.className = 'country-card';
        const nombreTraduc = pais.translations.spa?.common || pais.name.common; //el objetio JSON enviado es pais, ese objeto tiene translation como atributo y dentro de translation hay un objeto spa que tiene un atributo common (es de español) y si no lo tiene, se pone el nombre en ingles (el common)
        const nombreMayusc = nombreTraduc.charAt(0).toUpperCase() + nombreTraduc.slice(1);
        card.innerHTML = `
            <h2>${nombreMayusc}</h2>
            <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}">
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
