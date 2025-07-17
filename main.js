const dayjs = require('dayjs')

const API_RECIPES = `https://dummyjson.com/recipes/`;
const API_USER = `https://dummyjson.com/users/`

async function getChefBirthday(id) {
    const recipeResponse = await fetch(`${API_RECIPES}${id}`);
    const recipe = await recipeResponse.json();
    const userResponse = await fetch(`${API_USER}${recipe.userId}`);
    const user = await userResponse.json();
    return user.birthDate;
}

(async () => {
    const chefBirthday = await getChefBirthday(1);
    console.log(dayjs(chefBirthday).format('dddd, MMMM D, YYYY'));
})();