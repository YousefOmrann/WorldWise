import { useCities } from "../contexts/CitiesContext";

import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

function CityItem({ city }) {
  const { cityName, date, position, id } = city;
  const { currentCity, cities, setCities, deleteCity } = useCities();
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

  // function handleDeleteCity() {
  //   setCities((prevCities) => prevCities.filter((city) => city.id !== id));
  // }

  // function handleDeleteCity(e) {
  //   e.preventDefault(); // علشان يمنع التنقل داخل <Link>
  //   setCities((prevCities) => prevCities.filter((city) => city.id !== id));
  //   deleteCity(city.id); // استدعاء الدالة من الـ context
  // }

  async function handleDeleteCity(e) {
    e.preventDefault(); // يمنع التنقل داخل <Link>

    try {
      await deleteCity(city.id); // الأول امسح من الـ API
      setCities(
        (prevCities) => prevCities.filter((c) => c.id !== city.id) // بعدين امسح من الواجهة
      );
    } catch (error) {
      console.error("Failed to delete the city:", error);
    }
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          {" "}
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
