import { useEffect, useState } from 'react';
import './App.css';
import api from './services/api';

function Git() {
  const [user, setUser] = useState();

  useEffect(() => {
    api
      .get("/users/taniadev")
      .then((response) => setUser(response.data))
      .catch((err) => {console.error("ops! ocorreu um erro" + err);
    });
  }, []);

  /*
  useEffect(() => {
    api
      .post("https://minhaapi/novo-usuario",{
        nome: "Romulo",
        sobrenome: "Souza"  
      })
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);
  */

  return (
    <div className="App">
      <p>Usuário: {user?.login}</p>
      <p>Biografia: {user?.bio}</p>
    </div>
  );
}

export default Git;

