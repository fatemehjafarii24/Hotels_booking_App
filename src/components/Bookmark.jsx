const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "./Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useHotels } from "./context/HotelsProvider";

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
  const [countryCode, setCountryCode] = useState("");
  const [geocodingError, setGeocodingError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchCityData() {
      try {
        setGeocodingError(null);
        setIsLoadingGeoCoding(true);
        const { data } = await axios.get(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        console.log(data);
        if (!data.countryCode) throw new Error("this location is not a city");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cityName || !country) return;

    const newHotel = {
      cityName,
      country,
      countryCode,
      position: {
        lat,
        lng,
      },
    };
  };

  if (isLoadingGeoCoding) return <Loader />;

  if (geocodingError) return <p>{geocodingError}</p>;

  return (
    <div>
      <h2>bookmark location</h2>
      <form className="form" onSubmit={handleSubmit}>
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
          <ReactCountryFlag svg className="flag" countryCode={countryCode} />
          {/* <span className="flag">{flag}</span> */}
        </div>
        <div className="buttons">
          <button
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}
export default Bookmark;
