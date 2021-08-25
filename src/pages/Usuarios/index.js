import React, { useState } from 'react'
import './user.css'
import logo from "../../img/logoAzul.png"
import { MdEmail, MdLock, MdAccountCircle, MdChangeHistory, MdDateRange, MdTrendingFlat } from "react-icons/md"
import { BsBoxArrowInLeft } from "react-icons/bs"
import api from '../../services/api'
import {Link} from 'react-router-dom'

function User() {
    return (

        <div className="user">
            <div className="user-box">
                <button type="link" className= "botao-voltar">
                <BsBoxArrowInLeft/>
                </button>

                <h1>Listagem de usuario</h1>

                <button type="submit" className= "botao-atualizar">
                    Atualizar
                </button>

                <button type="submit" className= "botao-criar">
                    Criar
                </button>

                

            </div>
        </div>

    )
}

export default User