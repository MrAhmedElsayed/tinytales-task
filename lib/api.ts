const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = {
    async post(path: string, data: Record<string, string>, token?: string) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const headers: Record<string, string> = {
            'Accept': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}${path}`, {
            method: 'POST',
            headers,
            body: formData,
        });

        return response.json();
    },

    async get(path: string, token?: string) {
        const headers: Record<string, string> = {
            'Accept': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${BASE_URL}${path}`, {
            method: 'GET',
            headers,
        });

        return response.json();
    },

    saveToken(token: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('tinytales_token', token);
        }
    },

    getToken() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('tinytales_token');
        }
        return null;
    },

    removeToken() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('tinytales_token');
        }
    },

    saveUser(user: unknown) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('tinytales_user', JSON.stringify(user));
        }
    },

    getUser<T = unknown>() {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('tinytales_user');
            return user ? (JSON.parse(user) as T) : null;
        }
        return null;
    }
};
