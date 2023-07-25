export declare const selectInventory: (cnpj: string, sortBy?: [string, 'asc' | 'desc'][], limit?: number, options?: Partial<{
    product_name: string;
    year: number;
    month: number;
    category: string;
}>) => Promise<any>;
/**
 * selectProducts - Return the products name list based on user's CNPJ matching product_name (using like clause) if passed.
 * @param {string} cnpj - The user's CNPJ
 * @param {string} [product_name] - String containg the products name (case insensitive).
 * @returns {string[]}
 */
export declare const selectProducts: (cnpj: string) => Promise<any[]>;
