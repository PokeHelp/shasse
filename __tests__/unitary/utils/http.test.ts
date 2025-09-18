import { NextResponse } from 'next/server';
import { HttpStatusCode } from 'axios';
import {sendResponse} from "@utils";

jest.mock('next/server', () => {
    return {
        NextResponse: jest.fn().mockImplementation((body, init) => {
            return { body, status: init?.status, fromConstructor: true };
        }),
    };
});
describe('sendResponse', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return NextResponse(null, {status}) when status = NoContent', () => {
        const status = HttpStatusCode.NoContent;

        const result = sendResponse({}, status);

        // Vérifie qu'on a bien appelé le constructeur
        expect(NextResponse).toHaveBeenCalledWith(null, { status });
        expect(result).toEqual({ body: null, status, fromConstructor: true });
    });
});

(NextResponse).json = jest.fn().mockImplementation((message, opts) => {
    return { json: true, message, status: opts.status };
});
describe('sendResponse - json case', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call NextResponse.json with message and status when status != NoContent', () => {
        const message = { foo: 'bar' };
        const status = HttpStatusCode.Ok;

        const result = sendResponse(message, status);

        expect((NextResponse).json).toHaveBeenCalledWith(message, { status });
        expect(result).toEqual({ json: true, message, status });
    });

    it('should pass correct message and status to NextResponse.json', () => {
        const message = { hello: 'world' };
        const status = HttpStatusCode.Created;

        const result = sendResponse(message, status);

        expect((NextResponse).json).toHaveBeenCalledWith(message, { status });
        expect(result).toEqual({ json: true, message, status });
    });
});
