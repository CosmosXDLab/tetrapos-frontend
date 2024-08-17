export interface CashRegister {
    id: string;
    opening_date: string;
    closing_date: string;
}

export type CreateCashRegister = z.infer<typeof CashRegister>;

export type UpdateCashRegister = z.infer<typeof CashRegister>;