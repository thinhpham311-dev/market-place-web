import { Admin } from '../models'
import session from 'express-session';
import ConnectMongoDBSession from 'connect-mongodb-session';

// Initialize the MongoDB session store
const MongoDBStore = ConnectMongoDBSession(session);

// Create a session store instance
export const sessionStore = new MongoDBStore({
    uri: process.env.NEXT_PUBLIC_MONGODB_URI as string,
    collection: 'sessions',
    expires: Date.now() + (30 * 24 * 3600 * 1000)
});

sessionStore.on('error', (error: Error) => {
    console.log('Session store error:', error);
});

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