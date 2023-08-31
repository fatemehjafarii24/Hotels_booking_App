const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "./Loader/Loader";

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Bookmark() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [flag, setFlag] = useState("");

  useEffect(() => {
    async function fetchCityData() {
      try {
        setIsLoadingGeoCoding(true);
        const { data } = await axios.get(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setFlag(getFlagEmoji(data.countryCode));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  if (isLoadingGeoCoding) return <Loader />;

  return (
    <div>
      <h2>bookmar location</h2>
      <form className="form">
        <div className="formControl">
          <label htmlFor="city">City</label>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <span className="flag">{flag}</span>
        </div>
        <div className="buttons">
          <button className="btn btn--back">&larr; Back</button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}
export default Bookmark;
