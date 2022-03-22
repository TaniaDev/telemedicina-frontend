import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import BaseLayout from '../../layouts/BaseLayout'

export default function Perfil() {
  return (
    <div>
        <NavBar>
          <BaseLayout title='Perfil'>
            <h1>Perfil</h1>
          </BaseLayout> 
        </NavBar>
    </div>

  )
}
