/**
 * Category entity within the Publishing bounded context.
 *
 * @class Category
 */
export class Category {
    /**
     * @param {Object} params - Entity attributes.
     * @param {?number} [params.id=null] - Category identifier.
     * @param {string} [params.name=''] - Human-readable category name.
     */
    constructor({ id = null, name = ''}) {
        this.id = id;
        this.name = name;
    }

}