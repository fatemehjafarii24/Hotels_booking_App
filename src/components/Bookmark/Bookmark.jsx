import useUrlPositioin from "../../hooks/useUrlPosition";

function Bookmark() {
  const [lat, lng] = useUrlPositioin();
  
  return <div>Bookmark</div>;
}

export default Bookmark;
