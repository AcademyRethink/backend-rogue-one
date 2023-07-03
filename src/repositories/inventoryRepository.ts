import knex from 'knex';
import config from '../../knexfile';

const knexInstance = knex(config);

interface Options {
  product_name: string;
  year: number;
  month: number;
  category: string;
}

function validateCNPJ(cnpj: string) {
  // cnpj = cnpj.replace(/[^\d]+/g, '');

  // if (cnpj == '') return false;

  // if (cnpj.length != 14) return false;

  // // Elimina CNPJs invalidos conhecidos
  // if (
  //   cnpj == '00000000000000' ||
  //   cnpj == '11111111111111' ||
  //   cnpj == '22222222222222' ||
  //   cnpj == '33333333333333' ||
  //   cnpj == '44444444444444' ||
  //   cnpj == '55555555555555' ||
  //   cnpj == '66666666666666' ||
  //   cnpj == '77777777777777' ||
  //   cnpj == '88888888888888' ||
  //   cnpj == '99999999999999'
  // )
  //   return false;

  // // Valida DVs
  // let length = cnpj.length - 2;
  // let numbers = cnpj.substring(0, length);
  // const digits = cnpj.substring(length);
  // let sum = 0;
  // let pos = length - 7;
  // for (let i = length; i >= 1; i--) {
  //   sum += Number(numbers.charAt(length - i)) * pos--;
  //   if (pos < 2) pos = 9;
  // }
  // let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  // if (result != Number(digits.charAt(0))) return false;

  // length = length + 1;
  // numbers = cnpj.substring(0, length);
  // sum = 0;
  // pos = length - 7;
  // for (let i = length; i >= 1; i--) {
  //   sum += Number(numbers.charAt(length - i)) * pos--;
  //   if (pos < 2) pos = 9;
  // }
  // result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  // if (result != Number(digits.charAt(1))) return false;

  return true;
}

/**
 * Get the inventory balance for the specif filtering if passed or totally otherwise.
 * @param cnpj User's CNPJ with no format . or -, just the numbers.
 * @param product_name (Optional) String containing the product name, completely or partially, for filtering (case insensitive).
 * @param year (Optional) Year in string form.
 * @param month (Optional) Month in string for (January = 1, February = 2, etc.)
 * @param category (Optional) Category string for filtering (case insensitive).
 * @returns {InventoryRecord[]}
 */
const selectInventory = async (
  cnpj: string,
  sortBy?: [string, 'asc' | 'desc'][],
  limit?: number,
  options?: Partial<Options>
) => {
  if (!validateCNPJ(cnpj)) throw new Error('Invalid CNPJ');

  return await knexInstance('inventory')
    .select('*')
    .where({ cnpj })
    .modify((query) => {
      query = options?.year
        ? query.whereRaw('EXTRACT(YEAR FROM date) = ?', options?.year)
        : query;
      query = options?.month
        ? query.whereRaw('EXTRACT(MONTH FROM date) = ?', options?.month)
        : query;
      query = options?.category
        ? query.whereILike('category', `%${options?.category}%`)
        : query;
      query = options?.product_name
        ? query.whereILike('product_name', `%${options?.product_name}%`)
        : query;
      query = sortBy
        ? sortBy.reduce(
            (acc, [column, mode]) => acc.orderBy(column, mode),
            query
          )
        : query;
      query = limit ? query.limit(limit) : query;
    });
};

/**
 * selectProducts - Return the products name list based on user's CNPJ matching product_name (using like clause) if passed.
 * @param {string} cnpj - The user's CNPJ
 * @param {string} [product_name] - String containg the products name (case insensitive).
 * @returns {string[]}
 */
const selectProducts = async (cnpj: string, product_name?: string) => {
  return await knexInstance('inventory')
    .distinct('product_name')
    .where({ cnpj })
    .modify((query) =>
      product_name
        ? query.whereILike('product_name', `%${product_name}%`)
        : query
    )
    .pluck('product_name');
};

export default { selectInventory, selectProducts };
