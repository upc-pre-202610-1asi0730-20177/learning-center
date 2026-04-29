import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const categoriesEndpointPath    = import.meta.env.VITE_CATEGORIES_ENDPOINT_PATH;
const tutorialsEndpointPath     = import.meta.env.VITE_TUTORIALS_ENDPOINT_PATH;

/**
 * Infrastructure gateway for Publishing bounded-context endpoints.
 *
 * @class PublishingApi
 * @extends BaseApi
 */
export class PublishingApi extends BaseApi {
    /**
     * @type {BaseEndpoint}
     * @private
     */
    #categoriesEndpoint;
    /**
     * @type {BaseEndpoint}
     * @private
     */
    #tutorialsEndpoint;

    /** Creates endpoint clients for categories and tutorials. */
    constructor() {
        super();
        this.#categoriesEndpoint = new BaseEndpoint(this, categoriesEndpointPath);
        this.#tutorialsEndpoint = new BaseEndpoint(this, tutorialsEndpointPath);
    }

    /**
     * Fetches all categories.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the categories' response.
     */
    getCategories() {
        return this.#categoriesEndpoint.getAll();
    }

    /**
     * Fetches a category by its ID.
     * @param {number|string} id - The ID of the category.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the category response.
     */
    getCategoryById(id) {
        return this.#categoriesEndpoint.getById(id);
    }

    /**
     * Creates a category resource.
     * @param {Object} resource - Category resource payload.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the created category response.
     */
    createCategory(resource) {
        return this.#categoriesEndpoint.create(resource);
    }

    /**
     * Updates a category resource.
     * @param {Object} resource - Category resource payload (must include id).
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the updated category response.
     */
    updateCategory(resource) {
        return this.#categoriesEndpoint.update(resource.id, resource);
    }

    /**
     * Deletes a category by its ID.
     * @param {number|string} id - The ID of the category to delete.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the delete response.
     */
    deleteCategory(id) {
        return this.#categoriesEndpoint.delete(id);
    }

    /**
     * Fetches all tutorials.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the tutorials' response.
     */
    getTutorials() {
        return this.#tutorialsEndpoint.getAll();
    }

    /**
     * Fetches a tutorial by its ID.
     * @param {number|string} id - The ID of the tutorial.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the tutorial response.
     */
    getTutorialById(id) {
        return this.#tutorialsEndpoint.getById(id);
    }

    /**
     * Creates a tutorial resource.
     * @param {Object} resource - Tutorial resource payload.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the created tutorial response.
     */
    createTutorial(resource) {
        return this.#tutorialsEndpoint.create(resource);
    }

    /**
     * Updates a tutorial resource.
     * @param {Object} resource - Tutorial resource payload (must include id).
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the updated tutorial response.
     */
    updateTutorial(resource) {
        return this.#tutorialsEndpoint.update(resource.id, resource);
    }

    /**
     * Deletes a tutorial by its ID.
     * @param {number|string} id - The ID of the tutorial to delete.
     * @returns {Promise<import('axios').AxiosResponse>} Promise resolving to the delete response.
     */
    deleteTutorial(id) {
        return this.#tutorialsEndpoint.delete(id);
    }
}
