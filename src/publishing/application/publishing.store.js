/**
 * Application service store for the Publishing bounded context.
 * It coordinates category and tutorial use cases and keeps UI-facing state.
 *
 * @module usePublishingStore
 */
import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {PublishingApi} from "../infrastructure/publishing-api.js";
import {CategoryAssembler} from "../infrastructure/category.assembler.js";
import {TutorialAssembler} from "../infrastructure/tutorial.assembler.js";
import {Category} from "../domain/model/category.entity.js";
import {Tutorial} from "../domain/model/tutorial.entity.js";

const publishingApi = new PublishingApi();

/**
 * Reactive store that exposes Publishing commands and queries.
 *
 * @returns {Object} Store state and actions.
 */
const usePublishingStore = defineStore('publishing', () => {
    /**
     * List of category entities.
     * @type {import('vue').Ref<Category[]>}
     */
    const categories = ref([]);
    /**
     * List of tutorial entities.
     * @type {import('vue').Ref<Tutorial[]>}
     */
    const tutorials = ref([]);
    /**
     * List of errors encountered during API operations.
     * @type {import('vue').Ref<Error[]>}
     */
    const errors = ref([]);
    /**
     * Whether categories have been loaded from the API.
     * @type {import('vue').Ref<boolean>}
     */
    const categoriesLoaded = ref(false);
    /**
     * Whether tutorials have been loaded from the API.
     * @type {import('vue').Ref<boolean>}
     */
    const tutorialsLoaded = ref(false);
    /**
     * Number of loaded categories.
     * @type {import('vue').ComputedRef<number>}
     */
    const categoriesCount = computed(() => {
        return categoriesLoaded ? categories.value.length : 0;
    });
    /**
     * Number of loaded tutorials.
     * @type {import('vue').ComputedRef<number>}
     */
    const tutorialsCount = computed(() => {
        return tutorialsLoaded ? tutorials.value.length : 0;
    });

    /**
     * Loads categories from infrastructure and updates the application state.
     * @returns {void}
     */
    function fetchCategories() {
        publishingApi.getCategories().then(response => {
            categories.value = CategoryAssembler.toEntitiesFromResponse(response);
            categoriesLoaded.value = true;
            console.log(categoriesLoaded.value);
            console.log(categories.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Loads tutorials from infrastructure and updates the application state.
     * @returns {void}
     */
    function fetchTutorials() {
        publishingApi.getTutorials().then(response => {
            tutorials.value = TutorialAssembler.toEntitiesFromResponse(response);
            tutorialsLoaded.value = true;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Finds a category entity by identifier.
     * @param {number|string} id - Category identifier.
     * @returns {Category|undefined} Matching category, if available.
     */
    function getCategoryById(id) {
        let idNum = parseInt(id);
        return categories.value.find(category => category["id"] === idNum);
    }

    /**
     * Creates a category through infrastructure and appends it to local state.
     * @param {Category} category - Category entity to persist.
     * @returns {void}
     */
    function addCategory(category) {
        publishingApi.createCategory(category).then(response => {
            const resource = response.data;
            const newCategory = CategoryAssembler.toEntityFromResource(resource);
            categories.value.push(newCategory);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Updates an existing category and synchronizes local state.
     * @param {Category} category - Category entity with updated data.
     * @returns {void}
     */
    function updateCategory(category) {
        publishingApi.updateCategory(category).then(response => {
            const resource = response.data;
            const updatedCategory = CategoryAssembler.toEntityFromResource(resource);
            const index = categories.value.findIndex(c => c["id"] === updatedCategory.id);
            if (index !== -1) categories.value[index] = updatedCategory;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Deletes a category and removes it from local state.
     * @param {Category} category - Category entity to remove.
     * @returns {void}
     */
    function deleteCategory(category) {
        publishingApi.deleteCategory(category.id).then(() => {
            const index = categories.value.findIndex(c => c["id"] === category.id);
            if (index !== -1) categories.value.splice(index, 1);
        }).catch(error => {
            errors.value.push(error);
        });
    }


    /**
     * Finds a tutorial entity by identifier.
     * @param {number|string} id - Tutorial identifier.
     * @returns {Tutorial|undefined} Matching tutorial, if available.
     */
    function getTutorialById(id) {
        let idNum = parseInt(id);
        return tutorials.value.find(tutorial => tutorial["id"] === idNum);
    }

    /**
     * Creates a tutorial through infrastructure and appends it to local state.
     * @param {Tutorial} tutorial - Tutorial entity to persist.
     * @returns {void}
     */
    function addTutorial(tutorial) {
        publishingApi.createTutorial(tutorial).then(response => {
            const resource = response.data;
            const newTutorial = TutorialAssembler.toEntityFromResource(resource);
            tutorials.value.push(newTutorial);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Updates an existing tutorial and synchronizes local state.
     * @param {Tutorial} tutorial - Tutorial entity with updated data.
     * @returns {void}
     */
    function updateTutorial(tutorial) {
        publishingApi.updateTutorial(tutorial).then(response => {
            const resource = response.data;
            const updatedTutorial = TutorialAssembler.toEntityFromResource(resource);
            const index = tutorials.value.findIndex(t => t["id"] === updatedTutorial.id);
            if (index !== -1) tutorials.value[index] = updatedTutorial;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Deletes a tutorial and removes it from local state.
     * @param {Tutorial} tutorial - Tutorial entity to remove.
     * @returns {void}
     */
    function deleteTutorial(tutorial) {
        publishingApi.deleteTutorial(tutorial.id).then(() => {
            const index = tutorials.value.findIndex(t => t["id"] === tutorial.id);
            if (index !== -1) tutorials.value.splice(index, 1);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    return {
        categories,
        tutorials,
        errors,
        categoriesLoaded,
        tutorialsLoaded,
        categoriesCount,
        tutorialsCount,
        fetchCategories,
        fetchTutorials,
        getCategoryById,
        addCategory,
        updateCategory,
        deleteCategory,
        addTutorial,
        updateTutorial,
        deleteTutorial,
        getTutorialById
    }
});

export default usePublishingStore;

