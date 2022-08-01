import axios from 'axios'

let service = axios.create({
    // baseURL: 'http://localhost:3000/',
    baseURL: 'http://neteasecloud.bandao.ltd/',
    timeout: 5000,
})
export default service