export interface IUser {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    role?: 'user' | 'admin';
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    image?: string;
}