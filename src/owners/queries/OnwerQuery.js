export const FETCH_OWNER_LIST = `
SELECT 
owner_id ,name as owner_name, city
FROM tbowner
`;

export const FETCH_OWNER_BY_ID = `
SELECT 
owner_id ,name as owner_name, city
FROM tbowner
WHERE owner_id = :owner_id
`;