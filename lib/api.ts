const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ApiErrorValue = string | string[] | undefined;

export type ApiResponse<T = unknown> = {
    status?: boolean;
    status_code?: number;
    message?: string;
    data?: T;
    errors?: Record<string, ApiErrorValue>;
};

function getBaseUrl() {
    if (!BASE_URL) {
        throw new Error('NEXT_PUBLIC_API_BASE_URL is not configured.');
    }
    return BASE_URL;
}

export function getApiErrorMessage(response: ApiResponse | undefined, fallbackMessage: string) {
    if (typeof response?.message === 'string' && response.message.trim().length > 0) {
        return response.message;
    }

    if (response?.errors && typeof response.errors === 'object') {
        for (const value of Object.values(response.errors)) {
            if (typeof value === 'string' && value.trim().length > 0) {
                return value;
            }
            if (Array.isArray(value)) {
                const firstString = value.find(
                    (item): item is string => typeof item === 'string' && item.trim().length > 0
                );
                if (firstString) {
                    return firstString;
                }
            }
        }
    }

    return fallbackMessage;
}

export const api = {
    async post<TData = unknown>(path: string, data: Record<string, string>, token?: string): Promise<ApiResponse<TData>> {
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

        const response = await fetch(`${getBaseUrl()}${path}`, {
            method: 'POST',
            headers,
            body: formData,
        });

        return response.json();
    },

    async get<TData = unknown>(path: string, token?: string): Promise<ApiResponse<TData>> {
        const headers: Record<string, string> = {
            'Accept': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${getBaseUrl()}${path}`, {
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
