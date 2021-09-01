import React, {useState, useEffect} from 'react';
import api from '../../services/api';

function Listagem({match}){
    const [users, setUsers] = useState([]);

    async function loadUsers(){
        await api.get('/index')
        .then(response => {
            setUsers(response.data)
        })
    }

    async function remove(id){
        const res = window.confirm('Deseja realmente excluir?')
        if(res){
            await api.delete(`/usuario/${id}`)
            .then(response => {
                setUsers(response.data)
            })
        }
    }

    useEffect(() => {
        loadUsers();
    })

    return (
        <table border="1">
            <tr>
                <th>ID</th>
                <th>NOME</th>
                <th>DATA NASCIMENTO</th>
                <th>GENERO</th>
                <th>E-MAIL</th>
                <th>AÇÕERS</th>
            </tr>
            
            {
                users.map(u => (
                    <tr>
                        <td>{u.id}</td>
                        <td>{u.nome}</td>
                        <td>{u.dt_nascimento}</td>
                        <td>{u.genero}</td>
                        <td>{u.email}</td>
                        <td>
                            {/* DELETE ESTÁ FUNCIONANDO PORÉM CHAMA A FUNÇÃO AO REENDERIZAR */}
                            {/* <button OnClick={remove(u.id)}>EXCLUIR</button> */}
                        
                        </td>
                    </tr>
                ))
            }
                
        </table>
        
    )
}

export default Listagem;

