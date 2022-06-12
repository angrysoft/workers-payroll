export interface User {
    username: string;
    is_authenticated: boolean;
    type: string;
    error?: string;
    userId: number;
}
