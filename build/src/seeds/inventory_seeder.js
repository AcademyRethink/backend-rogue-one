"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex('inventory').truncate();
        const report = yield knex('report')
            .select('cnpj', 'product_name', 'ean', 'category', 'month_year', 'sale_competitors_month', 'sale_pharmacy_month')
            .where('sale_pharmacy_month', '>', 0);
        //   const dateIterator: {
        //     year: number;
        //     month: number;
        //     endYear: number;
        //     endMonth: number;
        //     done: boolean;
        //     next: () => void;
        //   } = {
        //     year: 2022,
        //     month: 7,
        //     endYear: 2023,
        //     endMonth: 7,
        //     done: false,
        //     next: () => {
        //       [dateIterator.year, dateIterator.month] =
        //         dateIterator.month + 1 == 13
        //           ? [dateIterator.year + 1, 1]
        //           : [dateIterator.year, dateIterator.month + 1];
        //       dateIterator.done =
        //         dateIterator.year == dateIterator.endYear &&
        //         dateIterator.month == dateIterator.endMonth;
        //     }
        //   };
        const inventory = report.map(({ cnpj, product_name, ean, category, month_year, sale_pharmacy_month }) => {
            const index = 0;
            const op = Math.round(Math.random()) ? 1 : -1;
            const deltaQuantity = Math.random() * op * report[index]['sale_pharmacy_month'];
            const deltaMinQuantity = Math.random() * op * report[index]['sale_pharmacy_month'];
            return {
                cnpj,
                product_name,
                ean,
                category,
                date: new Date(month_year.setMonth(month_year.getMonth() - 5)),
                quantity: Math.ceil(sale_pharmacy_month + deltaQuantity < 0
                    ? 2
                    : sale_pharmacy_month + deltaQuantity),
                min_quantity: Math.floor(sale_pharmacy_month + deltaMinQuantity >
                    sale_pharmacy_month + deltaQuantity
                    ? sale_pharmacy_month + deltaQuantity < 0
                        ? 0
                        : sale_pharmacy_month + deltaQuantity
                    : sale_pharmacy_month + deltaMinQuantity < 0
                        ? 0
                        : sale_pharmacy_month + deltaMinQuantity)
            };
        });
        for (let index = 0; index <= inventory.length - 500; index += 500) {
            yield knex('inventory').insert(inventory.slice(index, index + 500));
        }
    });
}
exports.seed = seed;
