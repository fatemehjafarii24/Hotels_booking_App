import ReactCountryFlag from "react-country-flag";
import Loader from "../Loader/Loader";
import { useBookmark } from "../context/BookmarkListContext";

function Bookmark() {
  const { bookmarks, isLoading } = useBookmark();
  if (isLoading) return <Loader />;
  return (
    <div>
      <h2>Bookmarklist</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <>
              <div className="current-bookmark bookmarkItem" key={item.id}>
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp; <strong>{item.cityName}</strong> &nbsp;{" "}
                <span>{item.country}</span>
              </div>
              <div className="bookmarkItem" key={item.id}>
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp; <strong>{item.cityName}</strong> &nbsp;{" "}
                <span>{item.country}</span>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
export default Bookmark;
