export type User = { roles: Role[]; id: string }

type Role = keyof typeof ROLES
type Permission = (typeof ROLES)[Role][number]

const ROLES = {
    customer: [
        "view:comments",
        "create:comments",
        "update:comments",
        "delete:comments",
    ],
    deliveryPartner: ["view:comments", "create:comments", "delete:comments"],
    businessPartner: ["view:comments", "create:comments"],
} as const

export function hasPermission(user: User, permission: Permission) {
    return user.roles.some(role =>
        (ROLES[role] as readonly Permission[]).includes(permission)
    )
}

// USAGE:
const user: User = { id: "1", roles: ["customer"] }

// Can create a comment
hasPermission(user, "create:comments")

// Can view all comments
hasPermission(user, "view:comments")