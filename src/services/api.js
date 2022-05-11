import axios from 'axios'

export const api = axios.create({
  baseURL: "http://localhost:3333/api"
})

export const createSession = async (email, senha) => {
  return await api.post('/login', { email: email, senha: senha })
}

/*api.interceptors.request.use(async config => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }

  return config
})*/


export default api