// lib/session.js
import { withIronSessionApiRoute } from 'next-iron-session';

export function withSession(handler) {
  return withIronSessionApiRoute(handler, {
    password: process.env.SESSION_SECRET, // Secret for encrypting session
    cookieName: 'auth_session',          // Name of the cookie
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
      maxAge: 60 * 60 * 24 * 7,  // 1 week expiration
    },
  });
}
