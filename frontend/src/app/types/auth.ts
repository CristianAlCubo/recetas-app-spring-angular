export interface Login {
    username: string;
    password: string;
}

export interface TokenResponse {
    token: string;
}

export interface Register {
    username: string;
    password: string;
    passwordConfirmation: string;
}
