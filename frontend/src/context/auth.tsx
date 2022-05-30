import {createContext} from 'react';


interface User {
    username: string;
    is_authenticated: boolean;
    type: string;
}

interface AuthContextType {
    user: User;
    // signIn: (user: string, callback: VoidFunction) => void;
    // signOut: (callback: VoidFunction) => void;
  }

const AuthContext = createContext<AuthContextType>(null!);

export {AuthContext};
