import {Tutorial} from "../domain/model/tutorial.entity.js";

/**
 * Maps publishing tutorial resources into domain entities.
 *
 * @class TutorialAssembler
 */
export class TutorialAssembler {
    /**
     * @param {Object} resource - Tutorial resource payload.
     * @returns {Tutorial} Tutorial entity.
     */
    static toEntityFromResource(resource) {
        return new Tutorial({...resource})
    }

    /**
     * Parses tutorial resources from a response and maps them into entities.
     *
     * @param {import('axios').AxiosResponse<Array<Object>|Object>} response - HTTP response with tutorial resources.
     * @returns {Tutorial[]} Tutorial entities.
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['tutorials'];

        return resources.map(resource => this.toEntityFromResource(resource));
    }
}