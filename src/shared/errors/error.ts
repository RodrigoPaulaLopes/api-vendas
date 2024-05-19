class AppError {
    private readonly message: string;
    private readonly statusCode: number;

    constructor(message: string, statusCode: number = 400){
        this.message = message
        this.statusCode = statusCode
    }
}

export default AppError