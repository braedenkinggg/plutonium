import session from 'express-session-types';

declare module 'express-session' {
    export interface SessionData {
        userId: { [key: string]: any };
    }
}