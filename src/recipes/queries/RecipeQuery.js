export const FETCH_RECIPE_LIST = `
SELECT 
recipe_id as id ,recipe as recipe
FROM tbrecipe
`;

export const FETCH_RECIPE_BY_ID = `
SELECT 
recipe_id as id ,recipe as recipe
FROM tbrecipe
WHERE recipe_id = :recipe_id
`;