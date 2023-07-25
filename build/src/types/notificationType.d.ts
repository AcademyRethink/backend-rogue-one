interface Product {
    id: number;
    cnpj: string;
    product_name: string;
    ean: string;
    quantity: number;
    min_quantity: number;
    category: string;
    date: Date;
}
interface NotificationCondition {
    ean: string;
    viewed?: boolean;
    resolved_notification?: boolean;
}
export { Product, NotificationCondition };
