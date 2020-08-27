# FoodMenu

Hello

In order to run the project, Please follow instructions bellow:-
1. Clone the project from git using command : "git clone https://github.com/AmitSingla0289/FoodMenu.git".
2. To install the required dependencies Run command "npm install -g".
3. Go to location, "Project Folder/src".
4. Edit "env.js", update the database parameters accordingle, please use same db name as mentioned.
5. Create Blank db with a mentioned name (food_menu) in mysql.
6. Go to location "Project Folder/src/migration", run following command "knex migrate:latest".
7. Go to to project folder and run the command "npm run build".
8. To deploy the project run the command "node index.js".


To get the data we need to execute create api for owner, recipe, owner_recipe, then you execute rest apis.
