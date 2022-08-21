import { updateAge, updateLastName, updateName } from "@store/users/actions";
import UserContext from "@store/users/UserContext";
import { useContext } from "react";



export default function UserForm() {
    const [state, dispatch] = useContext(UserContext);

    function saveUser(e: any) {
        e.preventDefault();
        saveUserToLocalStorage(state);
    }

    return (
        <form onSubmit={saveUser}>
            <label>
                Nombre:
                <input
                    type="text"
                    value={state.name}
                    onChange={(e) => dispatch(updateName(e.target.value))}
                />
            </label>

            <label>
                Apellidos:
                <input
                    type="text"
                    value={state.lastName}
                    onChange={(e) => dispatch(updateLastName(e.target.value))}
                />
            </label>

            <label>
                Edad:
                <input
                    type="number"
                    value={state.age}
                    onChange={(e) => dispatch(updateAge(parseInt(e.target.value)))}
                />
            </label>

            <button>Guardar en localStorage</button>
        </form>
    );
}

function saveUserToLocalStorage(state: any) {
    try {
        localStorage.setItem("user", JSON.stringify(state));
    } catch (error) {
        console.log(error);
    }
}
