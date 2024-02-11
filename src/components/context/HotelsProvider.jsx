import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const HotelContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";

function HotelsProvider({ children }) {
  // current hotel
  const [currentHotel, setCurrentHotel] = useState(null);
  // loading
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);


  const [SearchParams, SetSearchParams] = useSearchParams();
  const destination = SearchParams.get("destination");
  const room = JSON.parse(SearchParams.get("options"))?.room; //data of room

  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  async function getHotel(id) {
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrentHotel(false);

    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrentHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels,
        currentHotel,
        getHotel,
        isLoadingCurrentHotel,
      }}
    >
      {children}{" "}
    </HotelContext.Provider>
  );
}
export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContext);
}

