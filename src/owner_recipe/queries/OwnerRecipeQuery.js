export const FETCH_OWNER_RECIPE_LIST = `
SELECT tbowner.owner_id, tbowner.name as owner_name, tbowner.age, tbowner.city,
tbrecipe.recipe_id, tbrecipe.recipe, tbowner_recipe.price, tbowner_recipe.owner_recipe_id
FROM tbowner
LEFT OUTER JOIN tbowner_recipe on tbowner.owner_id = tbowner_recipe.owner_id1
LEFT OUTER JOIN tbrecipe on tbowner_recipe.recipe_id1 = tbrecipe.recipe_id;
`;

export const FETCH_OWNER_RECIPES_LIST_BY_OWNER_ID = `
SELECT tbrecipe.recipe_id, tbrecipe.recipe, tbowner_recipe.price, tbowner_recipe.owner_recipe_id
FROM tbowner_recipe
LEFT OUTER JOIN tbrecipe on tbowner_recipe.recipe_id1 = tbrecipe.recipe_id
WHERE tbowner_recipe.owner_id1 = :owner_id
`;