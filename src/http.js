import axios from 'axios'

const http = axios.create({
    baseURL: 'http://tojbackend.web.bobo.tj/api/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})
// hi

export default http
