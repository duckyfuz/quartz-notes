#### Single Sign-On (SSO)
- allows users to authenticate once and gain access to multiple applications without needing to log in separately to each one.
- Ideal for organizations with multiple internal or third-party applications. SSO enhances the user experience by reducing login fatigue and boosts administrative control by centralizing user access management.
- Best used in corporate or enterprise environments where managing multiple passwords for different applications would be cumbersome. It's especially beneficial for reducing administrative overhead and improving workflow.
#### Multi-Factor Authentication
- requires users to provide two or more forms of authentication to access a service, significantly increasing security. These factors typically fall into three categories:
    - **Knowledge**: Something the user knows (e.g., a password).
    - **Possession**: Something the user has (e.g., a phone, hardware token).
    - **Inherence**: Something the user is (e.g., biometrics like fingerprints, facial recognition).
- Enhances security by making it much harder for attackers to gain access, even if they have obtained the user’s password.
- Necessary for high-security applications, such as banking, healthcare systems, and critical infrastructure, where unauthorized access could have severe consequences.
#### OAuth (Open Authorization)
- an authorization framework that allows third-party applications to access user data without exposing their passwords. OAuth issues access tokens, which third-party services can use to access user data without needing to store or use the user's credentials.
- Commonly used to allow users to log in to apps via their social media accounts (e.g., Google, Facebook) or to grant third-party applications limited access to APIs or services.
- Use OAuth when a third-party application needs access to user data but you don't want it to have access to the user's login credentials. OAuth is often used for integrations with third-party apps or APIs.
#### OpenID Connect (OIDC)
- is an authentication protocol built on top of OAuth 2.0. It adds an identity layer to OAuth, allowing applications to retrieve identity information about the user (e.g., name, email) along with the access tokens used for authorization.
- OIDC is commonly used for user authentication in modern web applications, particularly those in cloud-native environments.
- Use OpenID Connect when you need both **authentication** (verifying the user's identity) and **authorization** (granting the user access to resources). It’s often the preferred method for integrating social logins and managing user authentication across multiple services.

>[!tip] OAuth vs. OpenID Connect
> - **OAuth** is an **authorization** protocol, meaning it’s used to grant permissions for third-party services to access a user's data.
> - **OIDC** extends OAuth to provide **authentication** capabilities, meaning it helps verify the user’s identity and returns identity information like name, email, etc. It is often used in conjunction with OAuth to provide a complete authentication and authorization solution.
