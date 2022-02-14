class ErrorHandler {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(message: any, statusCode: number) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

export default ErrorHandler;