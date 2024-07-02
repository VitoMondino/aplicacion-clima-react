import { useState } from "react";


// Componente principal de la aplicación del clima
export const WeatherApp = () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = '7e4b8fb18e18489e49b956d4cbac65b4';

    const [ciudad, setCiudad] = useState('');
    const [dataClima, setDataClima] = useState(null);
    const [error, setError] = useState('');

    // Maneja el cambio en el input de la ciudad
    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value);
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (ciudad.trim()) {
            fetchClima();
        } else {
            setError('Por favor, ingrese una ciudad válida.');
        }
    };

    // Función para obtener los datos del clima de la API
    const fetchClima = async () => {
        try {
            setError(''); // Resetea el mensaje de error
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('Ciudad no encontrada');
            }
            const data = await response.json();
            setDataClima(data);
        } catch (error) {
            setError('Error al obtener los datos del clima. Intente nuevamente.');
            console.error("Error fetching the weather data:", error);
        }
    };

    return (
        <div className="container">
            <h1>Aplicación del Clima</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={ciudad} 
                    onChange={handleCambioCiudad} 
                    placeholder="Ingrese una ciudad"
                    aria-label="Ciudad"
                />
                <button type="submit">Buscar</button>
            </form>
            {error && <p className="error">{error}</p>}
            {dataClima && (
                <div className="weather-info">
                    <h2>Clima en {dataClima.name}</h2>
                    <p>Temperatura: {dataClima.main.temp}°C</p>
                    <p>Descripción: {dataClima.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};
