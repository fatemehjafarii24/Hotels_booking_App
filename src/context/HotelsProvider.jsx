import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const HotelsContext = createContext();

export default function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const hostLocation = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { isLoading, data: hotels } = useFetch(
    "http://localhost:5000/hotels",
    `name_like=${hostLocation || ""}&accommodates_gte=${room || 1}`
  );

  return (
    <HotelsContext.Provider value={{ hotels, isLoading }}>
      {children}
    </HotelsContext.Provider>
  );
}

export function useHotels() {
  return useContext(HotelsContext);
}
