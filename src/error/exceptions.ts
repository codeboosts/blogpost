import { STATUS_CODES } from "../constants/status-codes";

export class HttpException extends Error {
    public status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class BadRequestException extends HttpException {
    constructor(message = "Bad Request") {
        super(message, STATUS_CODES.BAD_REQUEST);
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message = "Unauthorized") {
        super(message, STATUS_CODES.UNAUTHORIZED);
    }
}

export class NotFoundException extends HttpException {
    constructor(message = "Not Found") {
        super(message, STATUS_CODES.NOT_FOUND);
    }
}

export class ConflictException extends HttpException {
    constructor(message = "Conflict") {
        super(message, STATUS_CODES.CONFLICT);
    }
}

export class InValidCredentials extends HttpException {
    constructor(message = "InValid Credentials") {
        super(message, STATUS_CODES.BAD_REQUEST);
    }
}
