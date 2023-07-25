declare const _default: {
    selectProductsFromService: ({ limit, orderSort, orderField, category, period, cnpj }: {
        limit?: string | undefined;
        orderSort?: string | undefined;
        orderField?: string | undefined;
        category?: string | undefined;
        period?: string | undefined;
        cnpj?: string | undefined;
    }) => Promise<any[]>;
    selectLaboratoryByProductFromService: ({ limit, category, period, molecule, product_name, cnpj }: {
        limit: string | undefined;
        category: string | undefined;
        period: string | undefined;
        molecule: string | undefined;
        product_name: string | undefined;
        cnpj: string | undefined;
    }) => Promise<any[]>;
    getLastDate: (cnpj: string) => Promise<any[]>;
};
export default _default;
