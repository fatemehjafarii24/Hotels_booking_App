import { useParams } from "react-router-dom";

function Room() {
  const { id } = useParams();
  return <div>Room - {id}</div>;
}

export default Room;
