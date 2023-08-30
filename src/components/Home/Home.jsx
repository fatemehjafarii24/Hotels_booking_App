import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import LocationList from "../Location/LocationList";

function Home() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");
  if (isLoading) return <Loader />;
  return (
    <div className="nearbyLocation">
      <h2>Neayby Locations</h2>
      <LocationList locations={data} />
    </div>
  );
}

export default Home;
