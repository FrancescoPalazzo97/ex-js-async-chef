const dayjs = require('dayjs');
require('dayjs/locale/it');

const API_RECIPES = `https://dummyjsona.com/recipes/`;
const API_USER = `https://dummyjson.com/users/`;

async function getChefBirthday(id) {

    let recipe = {};

    try {
        const recipeResponse = await fetch(`${API_RECIPES}${id}`);
        recipe = await recipeResponse.json();
    } catch (e) {
        throw new Error(`Ci sono problematiche con il fetch per recuperare la ricetta ${id}`);
    }

    if (recipe.message) throw new Error(`Ricetta con id ${id} non trovata! \n ${recipe.message}`)

    let user = {};

    try {
        const userResponse = await fetch(`${API_USER}${recipe.userId}`);
        user = await userResponse.json();
    } catch (e) {
        throw new Error(`Ci sono problematiche con il fetch per recuperare l'utente ${recipe.userId}`);
    }

    if (user.message) throw new Error(`User con id ${id} non trovato! \n ${user.message}`)

    return user.birthDate;
}

(async () => {
    try {

        dayjs.locale('it');

        const chefBirthday = await getChefBirthday(1);
        console.log(`Data di nascita dello chef: ${dayjs(chefBirthday).format('dddd, MMMM D, YYYY')}`);

    } catch (e) {
        console.error(e);
    } finally {
        console.log(`Codice finito`)
    }
})();