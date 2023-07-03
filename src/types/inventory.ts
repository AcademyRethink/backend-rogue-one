export type InventoryRecord = {
    id: number,
    cnpj: string,
    product_name: string,
    ean: string,
    quantity: number,
    min_quantity: number,
    category: string,
    date: Date     
}