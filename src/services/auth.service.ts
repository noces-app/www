import { UserManager, User, WebStorageStateStore, Log } from 'oidc-client-ts';

// Configure logging for debugging (remove in production)
Log.setLogger(console);
Log.setLevel(Log.DEBUG);

class AuthService {
	private userManager: UserManager;
	private user: User | null = null;

	constructor() {
		const settings = {
			authority: import.meta.env.VITE_OIDC_AUTHORITY || 'http://localhost:8080/realms/noces',
			client_id: import.meta.env.VITE_OIDC_CLIENT_ID || 'noces-frontend',
			redirect_uri: `${window.location.origin}/auth/callback`,
			post_logout_redirect_uri: window.location.origin,
			response_type: 'code',
			scope: 'openid profile email',
			loadUserInfo: true,
			revokeTokensOnSignout: true,
			automaticSilentRenew: true,
			silent_redirect_uri: `${window.location.origin}/auth/silent-refresh.html`,
			userStore: new WebStorageStateStore({ store: window.localStorage }),
		};

		this.userManager = new UserManager(settings);

		// Events
		this.userManager.events.addUserLoaded((user) => {
			this.user = user;
			console.log('User loaded:', user);
		});

		this.userManager.events.addUserUnloaded(() => {
			this.user = null;
			console.log('User unloaded');
		});

		this.userManager.events.addSilentRenewError((error) => {
			console.error('Silent renew error:', error);
		});

		this.userManager.events.addAccessTokenExpiring(() => {
			console.log('Access token expiring');
		});

		this.userManager.events.addAccessTokenExpired(() => {
			console.log('Access token expired');
			this.signinSilent();
		});
	}

	/**
	 * Initialize authentication state
	 */
	public async initializeAuth(): Promise<User | null> {
		try {
			this.user = await this.userManager.getUser();
			return this.user;
		} catch (error) {
			console.error('Error initializing auth:', error);
			return null;
		}
	}

	/**
	 * Redirect to login page
	 */
	public async login(): Promise<void> {
		try {
			await this.userManager.signinRedirect();
		} catch (error) {
			console.error('Error during login redirect:', error);
			throw error;
		}
	}

	/**
	 * Handle the OIDC callback
	 */
	public async handleCallback(): Promise<User> {
		try {
			const user = await this.userManager.signinRedirectCallback();
			this.user = user;
			return user;
		} catch (error) {
			console.error('Error handling callback:', error);
			throw error;
		}
	}

	/**
	 * Silent sign-in (token renewal)
	 */
	public async signinSilent(): Promise<User | null> {
		try {
			const user = await this.userManager.signinSilent();
			this.user = user;
			return user;
		} catch (error) {
			console.error('Silent sign-in error:', error);
			return null;
		}
	}

	/**
	 * Logout
	 */
	public async logout(): Promise<void> {
		try {
			await this.userManager.signoutRedirect();
		} catch (error) {
			console.error('Error during logout:', error);
			throw error;
		}
	}

	/**
	 * Get the current user
	 */
	public getUser(): User | null {
		return this.user;
	}

	/**
	 * Check if the user is authenticated
	 */
	public isAuthenticated(): boolean {
		return this.user != null && !this.user.expired;
	}

	/**
	 * Get the access token
	 */
	public getAccessToken(): string | null {
		return this.user?.access_token || null;
	}

	/**
	 * Get user roles from the ID token
	 */
	public getUserRoles(): string[] {
		if (!this.user) {
			return [];
		}

		// Extract roles from Keycloak token (adjust according to your token structure)
		const realmAccess = this.user.profile?.realm_access;
		return realmAccess?.roles || [];
	}
}

// Create a singleton instance
const authService = new AuthService();
export default authService;
