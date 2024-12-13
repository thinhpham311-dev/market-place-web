import axios from 'axios'
import appConfig from '@/configs/app.config'
// import { TOKEN_TYPE, REQUEST_HEADER_AUTH_KEY } from '@/constants/api/api.constant'
// import { PERSIST_STORE_NAME } from '@/constants/app/app.constant'
// import deepParseJson from '@/utils/deepParseJson'
import store from '../store'
import { onSignOutSuccess } from '@/store/auth/sessionSlice'

const unauthorizedCode = [401]
const host_API = process.env.base_url

const baseURL = `${host_API}${appConfig.apiPrefix}`


const BaseService = axios.create({
    timeout: 60000,
    baseURL,
})

BaseService.interceptors.request.use(config => {
    // const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
    // const persistData = deepParseJson(rawPersistData) as any

    // const accessToken = persistData.auth.session.token

    // if (accessToken) {
    //     config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`
    // }

    return config
}, error => {
    return Promise.reject(error)
})

BaseService.interceptors.response.use(
    response => response,
    error => {

        const { response } = error

        if (response && unauthorizedCode.includes(response.status)) {
            store.dispatch(onSignOutSuccess())
        }

        return Promise.reject(error)
    }
)

export default BaseService