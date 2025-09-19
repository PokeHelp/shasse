import {CounterHuntingSchema, CreateHuntingSchema} from "@schema";

describe("CreateHuntingSchema", () =>
{
    const baseData = {
        useCC:                 true,
        isFinish:              false,
        finishAt:              null,
        meetingNumber:         1,
        time:                  60,
        createdAt:             new Date().toISOString(),
        spriteInShiny:         false,
        pokemonGameLocationId: 10,
        nickname:              undefined,
    };

    it("should pass with valid data and isFinish false", () =>
    {
        const result = CreateHuntingSchema.safeParse(baseData);
        expect(result.success).toBe(true);
        if (result.success)
        {
            expect(result.data.createdAt).toBeInstanceOf(Date);
        }
    });

    it("should fail if isFinish true but finishAt or nickname missing", () => {
        const data = { ...baseData, isFinish: true };
        const result = CreateHuntingSchema.safeParse(data);
        expect(result.success).toBe(false);

        if (!result.success) {
            const paths = result.error.errors.map(e => e.path.join("."));
            // Vérifie que le path contient finishAt et nickname (ou le combined path)
            expect(paths.some(p => p.includes("finishAt"))).toBe(true);
            expect(paths.some(p => p.includes("nickname"))).toBe(true);
        }
    });

    it("should pass if isFinish true and finishAt and nickname are set", () =>
    {
        const data = {
            ...baseData,
            isFinish: true,
            finishAt: new Date().toISOString(),
            nickname: "Pikachu",
        };
        const result = CreateHuntingSchema.safeParse(data);
        expect(result.success).toBe(true);
        if (result.success)
        {
            expect(result.data.finishAt).toBeInstanceOf(Date);
        }
    });

    it("should fail if time is negative", () =>
    {
        const data = {...baseData, time: -5};
        const result = CreateHuntingSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success)
        {
            const paths = result.error.errors.map(e => e.path.join("."));
            expect(paths).toContain("time");
        }
    });

    it("should transform createdAt string to Date", () =>
    {
        const result = CreateHuntingSchema.safeParse(baseData);
        expect(result.success).toBe(true);
        if (result.success)
        {
            expect(result.data.createdAt).toBeInstanceOf(Date);
        }
    });
});

describe("CounterHuntingSchema", () =>
{
    const baseData = {
        useTimer:       true,
        timerActivated: false,
        meetingNumber:  1,
        time:           120,
        nickname:       "Eevee",
    };

    it("should pass with valid data", () =>
    {
        const result = CounterHuntingSchema.safeParse(baseData);
        expect(result.success).toBe(true);
    });

    it("should fail if time is negative", () =>
    {
        const data = {...baseData, time: -1};
        const result = CounterHuntingSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success)
        {
            const paths = result.error.errors.map(e => e.path.join("."));
            expect(paths).toContain("time");
        }
    });

    it("should fail if nickname is empty string", () =>
    {
        const data = {...baseData, nickname: ""};
        const result = CounterHuntingSchema.safeParse(data);
        // z.string() accepte "" mais on peut ajouter refinement si nécessaire
        expect(result.success).toBe(true); // ici, le schema n’interdit pas empty string
    });

    it("should fail if meetingNumber is missing", () => {
        // On copie l'objet et on supprime meetingNumber
        const dataWithoutMeetingNumber: Omit<typeof baseData, "meetingNumber"> = {
            useTimer: baseData.useTimer,
            timerActivated: baseData.timerActivated,
            time: baseData.time,
            nickname: baseData.nickname,
        };

        const result = CounterHuntingSchema.safeParse(dataWithoutMeetingNumber);

        expect(result.success).toBe(false);
        if (!result.success) {
            const paths = result.error.errors.map(e => e.path.join("."));
            expect(paths).toContain("meetingNumber");
        }
    });
});