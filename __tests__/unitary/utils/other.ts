import {formatSecondsToHMS, useZodForm} from "@utils";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

jest.mock('react-hook-form', () => ({
    useForm: jest.fn(),
}));

jest.mock('@hookform/resolvers/zod', () => ({
    zodResolver: jest.fn(),
}));

describe('useZodForm', () => {
    const schema = z.object({
        name: z.string(),
        age: z.number(),
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call useForm with resolver and schema', () => {
        const fakeReturn = { form: true };
        (useForm as jest.Mock).mockReturnValue(fakeReturn);
        (zodResolver as jest.Mock).mockReturnValue('mockResolver');

        const result = useZodForm(schema);

        expect(zodResolver).toHaveBeenCalledWith(schema);
        expect(useForm).toHaveBeenCalledWith({ resolver: 'mockResolver' });
        expect(result).toBe(fakeReturn);
    });

    it('should merge options with resolver', () => {
        const fakeReturn = { form: true };
        (useForm as jest.Mock).mockReturnValue(fakeReturn);
        (zodResolver as jest.Mock).mockReturnValue('mockResolver');

        const options = { defaultValues: { name: 'Alice', age: 30 } };
        const result = useZodForm(schema, options);

        expect(useForm).toHaveBeenCalledWith({
            resolver: 'mockResolver',
            defaultValues: { name: 'Alice', age: 30 },
        });
        expect(result).toBe(fakeReturn);
    });
});

describe('formatSecondsToHMS', () => {
    it('should format less than a minute', () => {
        expect(formatSecondsToHMS(5)).toBe('00:00:05');
        expect(formatSecondsToHMS(59)).toBe('00:00:59');
    });

    it('should format minutes correctly', () => {
        expect(formatSecondsToHMS(60)).toBe('00:01:00');
        expect(formatSecondsToHMS(125)).toBe('00:02:05');
    });

    it('should format hours correctly', () => {
        expect(formatSecondsToHMS(3600)).toBe('01:00:00');
        expect(formatSecondsToHMS(3661)).toBe('01:01:01');
    });

    it('should handle double-digit hours', () => {
        expect(formatSecondsToHMS(10 * 3600 + 5)).toBe('10:00:05');
    });

    it('should pad with zeros correctly', () => {
        expect(formatSecondsToHMS(0)).toBe('00:00:00');
        expect(formatSecondsToHMS(7)).toBe('00:00:07');
        expect(formatSecondsToHMS(70)).toBe('00:01:10');
    });
});

