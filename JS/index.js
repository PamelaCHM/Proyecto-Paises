// Cargar la lista de países al iniciar la aplicación
async function cargarPaises() {//Funciónasync para que se pueda usar await y fetch (peticiones HTTP)
    const localData = localStorage.getItem("paises"); // Verificar si ya hay datos en localStorage

    if (localData) {
        console.log("Cargando desde localStorage...");
        return JSON.parse(localData); // Si hay datos, devolverlos en formato JSON
    }

    console.log("Haciendo petición a la API...");
    const url = "https://restcountries.com/v3.1/all";

    try {
        const respuesta = await fetch(url);//Petición HTTP a la API
        if (!respuesta.ok) throw new Error("Error al obtener los países");

        const data = await respuesta.json();
                    //localStorage.setItem(key, value)
        localStorage.setItem("paises", JSON.stringify(data)); // Guardar en localStorage
        return data;                        //Stringfy convierte un objeto en una cadena de texto en formato JSON.Porque solo se pueden guardar cadenas de texto en localStorage
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudieron cargar los países. Intenta más tarde.");
        return [];
    }
}

// Cargar la lista de países al inicio
cargarPaises();