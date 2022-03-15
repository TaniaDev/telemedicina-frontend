import React, { useState, useEffect } from 'react'
import api from '../services/api'

const useRefreshSelectDoctors = id_especialidade => {
        const response = await api.get('/medico/getDoctors', {id_especialidade})
}

export default useRefreshSelectDoctors