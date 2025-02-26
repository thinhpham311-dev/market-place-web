import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { User } from '@/admin/models';

const ACCESS_TOKEN_SECRET = process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET as string;

export interface ExtendedNextApiRequest extends NextApiRequest {
    user: typeof User;
}

export const verifyToken = (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Access token required' });
            }

            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as typeof User; // Cast to JwtUser

            // Attach the decoded user information to the request object
            (req as ExtendedNextApiRequest).user = decoded;

            // Call the next handler
            return handler(req, res);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars 
        catch (error: unknown) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
    };
};