export class TokenExchangeError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class GithubAPIError extends Error {
    statusCode: number = 0;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}