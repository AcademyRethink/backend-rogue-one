interface Options {
    product_name: string;
    year: number;
    month: number;
    category: string;
}
declare const _default: {
    selectInventory: (cnpj: string, sortBy?: [string, "asc" | "desc"][] | undefined, limit?: number | undefined, options?: Partial<Options> | undefined) => Promise<any>;
    selectProducts: (cnpj: string) => Promise<any[]>;
};
export default _default;
