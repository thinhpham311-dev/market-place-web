import session from 'express-session'
import ConnectMongoDBSession from 'connect-mongodb-session'
import { Admin } from '../models'


const MongoDBStore = ConnectMongoDBSession(session);
export const sessionStore = new MongoDBStore({
    uri: process.env.NEXT_PUBLIC_MONGODB_URI as string,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2,
})

sessionStore.on('connect', () => {
    console.log('Connected to MongoDB successfully!');
});

sessionStore.on('error', (error: string) => {
    console.log('Session store error', error)
})

export const authenticate = async (email: string, password: string) => {
    if (email && password) {
        const user = await Admin.findOne({ email })
        if (!user) {
            return null
        }

        if (user.password === password) {
            return Promise.resolve({ email, password })
        } else {
            return null
        }
    }
    return null
}

// export const authenticate = async (email: string, password: string) => {
//     if (email === "thinhpham67ag@gmail.com" && password === "thinhpham031198") {
//         return Promise.resolve({ email, password })
//     } else {
//         return null
//     }
// }


export const { NEXT_PUBLIC_COOKIE_PASSWORD } = process.env