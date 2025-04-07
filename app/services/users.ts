export async function registerUser(username: string, password: string) {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })

    if (!res.ok) {
        throw new Error('Failed to register user')
    }

    return res.json()
}