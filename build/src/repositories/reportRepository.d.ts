declare const _default: {
    whereConstructor: ({ category, period, molecule, product_name, cnpj }: {
        category?: string | undefined;
        period?: string | undefined;
        molecule?: string | undefined;
        product_name?: string | undefined;
        cnpj?: string | undefined;
    }) => string;
    orderConstructor: ({ orderField, orderSort }: {
        orderField: string;
        orderSort: string;
    }) => string;
    selectProductsFromRepository: (whereQuery: string, orderQuery: string, limit: number) => Promise<any[]>;
    selectLaboratoryByProductFromRepository: ({ limit, whereQuery }: {
        limit: number;
        whereQuery: string;
    }) => Promise<any[]>;
    getLastDate: (cnpj: string) => Promise<any[]>;
};
export default _default;
