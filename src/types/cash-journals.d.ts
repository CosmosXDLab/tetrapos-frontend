import { z } from "zod";

export interface CashJournals {
    id: string;
    opening_date: string;
    closing_date: string;
}

export type CreateCashJournals = z.infer<typeof CashJournals>;

export type UpdateCashJournals = z.infer<typeof CashJournals>;