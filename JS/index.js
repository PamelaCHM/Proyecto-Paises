// Cargar la lista de países al iniciar la aplicación
async function cargarPaises() {//Función async para que se pueda usar await y fetch (peticiones HTTP)
    const localData = localStorage.getItem("paises"); // Verificar si ya hay datos en localStorage

    if (localData) {
        return JSON.parse(localData); //Si ya se cargó en el local storge, que no vuelva a cargar o guardar y devolver todo eso en JSON
    }

    //Si no se ah guardado nada en el localStorge entonces hacerlo:
    const url = "https://restcountries.com/v3.1/all";

    try {
        const respuesta = await fetch(url);//Petición HTTP a la API y esperar su respuesta
        if (!respuesta.ok) throw new Error("Error al obtener los países");

        //Si no hubo ningún error entonces convertir a objeto JSON todo lo recibido por la API
        const data = await respuesta.json();
                    //localStorage.setItem(clave, valor)
        localStorage.setItem("paises", JSON.stringify(data)); // Guardar en localStorage
        return data;                        //Stringfy convierte un objeto en una cadena de texto en formato JSON.Porque solo se pueden guardar cadenas de texto en localStorage
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudieron cargar los países desde la API. Intenta más tarde.");
        return [];
    }
}

// Cargar la lista de países al cargar la página de inicio
cargarPaises();