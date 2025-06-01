import styles from "./CountryList.module.css";

import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

import { useCities } from "../contexts/CitiesContext";
function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return <Message message="Add a city by clicking on the map" />;
  }

  const uniqueCountries = cities.reduce((acc, city) => {
    if (!acc.some((item) => item.country === city.country)) {
      acc.push(city);
    }
    return acc;
  }, []);
  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country, index) => (
        <CountryItem key={index} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
