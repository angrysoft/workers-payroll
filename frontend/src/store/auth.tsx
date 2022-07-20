export interface User {
    username: string;
    is_authenticated: boolean;
    is_coordinator: boolean;
    error?: string;
    id: number;
}
