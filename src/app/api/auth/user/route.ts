import UserService from "@/admin/domains/user/user.services";

export async function POST(req: Request) {
    try {
        const { userId, role, token } = await req.json(); // Properly parse request body
        if (!userId) {
            return new Response(
                JSON.stringify({ message: "User ID is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        if (!role) {
            return new Response(
                JSON.stringify({ message: "Role is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const UserResponse = await UserService.GetUserProfile({ userId, role, token });

        if (!UserResponse || !UserResponse.data) {
            throw new Error("Invalid response from User Profile");
        }

        return new Response(JSON.stringify(UserResponse.data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: (error as Error).message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}