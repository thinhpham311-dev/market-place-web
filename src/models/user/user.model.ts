import { Role } from "@/types/user"

export interface IUserModel {
    _id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    role?: Role;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    image?: string;
} 