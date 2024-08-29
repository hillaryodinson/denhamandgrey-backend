/**
 * These routes can be accessed without authentication
 * @type string[]
 */
export const publicRoutes = ["/"];
/**
 * These routes can be accessed by unauthenticated users
 * @type string[]
 */
export const authRoutes = ["/login"];
/**
 * Only authenticated users can access routes prefixed with these.
 * @type string[]
 */
export const protectedRoutes = ["/admin"];
/**
 * Base url for the authenticated user
 * @type string
 */
export const BASE_REDIRECT_URL = "/admin";
