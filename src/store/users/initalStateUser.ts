
let initialStateUser = {
  name: "",
  age: 0,
  lastName: ""
};

localStorage.setItem("user",'')
if (localStorage.getItem("user")) {
  initialStateUser = JSON.parse(localStorage.getItem("user") as string);
}

export default initialStateUser