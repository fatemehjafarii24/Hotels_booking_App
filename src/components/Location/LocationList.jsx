import { Link } from "react-router-dom";

function LocationList({ locations }) {
  return (
    <div className="locationList">
      {locations.map((item) => {
        return (
          <Link to={`/rooms/${item.id}`} key={item.id}>
            <div className="locationItem">
              <img src={item.picture_url.url} alt={item.name} />
              <div className="locationItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €&nbsp;{item.price}&nbsp;
                  <span>night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default LocationList;
