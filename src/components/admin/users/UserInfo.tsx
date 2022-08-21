import UserContext from "@store/users/UserContext";
import { useContext } from "react";


export default function UserInfo() {
  const [state] = useContext(UserContext);

  return (
    <>
      <p>Nombre: {state.name}</p>
      <p>Apellidos: {state.lastName}</p>
      <p>Edad: {state.age}</p>
    </>
  );
}