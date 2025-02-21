export const dynamic = 'force-dynamic'; // API routes should be dynamic

export async function POST() {
    try {
        const res = await fetch('http://localhost:3000/api/v1/product/list', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });

    } catch (error) {
        return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
}
