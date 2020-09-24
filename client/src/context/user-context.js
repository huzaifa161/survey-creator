import { createContext } from 'react';

export default createContext({
    user: {},
    isAuthenticated: undefined,
    initAuth: () => { },
    clearAuth: () => { }
});