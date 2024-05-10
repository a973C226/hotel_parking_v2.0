/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
];

/**
 * An array of routes that are accessible to the protected
 * These routes require authentication
 * @type {string[]}
 */
export const protectedRoutes: string[] = [
    '/protected/:path*'
];
  
/**
 * An array of routes that are used for authentication
 * @type {string[]}
 */
export const authRoutes = [
    "/api/auth/sign-in",
    "/api/auth/sing-up",
];

/**
 * An array of routes that are used for admin
 * @type {string[]}
 */
export const adminRoutes = [
    "/api/admin",
];

/**
 * An array of routes that are used for business user
 * @type {string[]}
 */
export const businessUserRoutes = [
    "/api/business",
];

/**
 * The default redirect path after logging in
 * @type {string}
 */