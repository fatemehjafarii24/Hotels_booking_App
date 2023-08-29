import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import LocationList from "../Location/LocationList";
import Loader from "../Loader/Loader";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const hostLocation = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options")).room;
  const { isLoading, data } = useFetch(
    "http://localhost:5000/hotels",
    `name_like=${hostLocation}&accommodates_gte=${room}`
  );

  if (isLoading) return <Loader />;

  return (
    <div className="searchList">
      <h2>Search Results:</h2>
      <LocationList locations={data} />
    </div>
  );
}

export default Hotels;
