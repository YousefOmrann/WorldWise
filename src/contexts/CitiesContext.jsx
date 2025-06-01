import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:9000";
function CitiesProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok)
          throw new Error("Something went wrong with fetching cities");
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("City Not Found");
        }

        setCities(data);
      } catch (err) {
        console.error(err.message);
        alert("There Was an error fetching data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error("Something went wrong with the city");
      const data = await res.json();
      if (data.Response === "False") {
        throw new Error("City Not Found");
      }
      // console.log(data);
      setCurrentCity(data);
    } catch (err) {
      console.error(err.message);
      alert("There Was an error fetching data");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Something went wrong with the city");
      const data = await res.json();
      if (data.Response === "False") {
        throw new Error("City Not Found");
      }
      setCities((cities) => [...cities, data]);
      console.log(data);
    } catch (err) {
      console.error(err.message);
      alert("There Was an error fetching data");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      await fetch(`http://localhost:9000/cities/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting city:", error);
      throw error; // علشان تقدر تعمل catch في الكومبوننت
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        getCity,
        createCity,
        setCities,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities Context was used outside the CitiesProvider");
  return context;
}
export { CitiesProvider, useCities };
