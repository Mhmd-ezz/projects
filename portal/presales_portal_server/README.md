## References
https://www.toptal.com/laravel/passport-tutorial-auth-user-access
https://github.com/goldspecdigital/laravel-eloquent-uuid
https://remotestack.io/laravel-angular-jwt-password-reset-with-mailtrap-example/ 
https://www.w3adda.com/blog/laravel-8-angular-jwt-password-reset-with-mailtrap-example

## Links
- Exceptions : https://laraveldaily.com/laravel-api-errors-and-exceptions-how-to-return-responses/ 

## Packages
Roles and Permissions: https://docs.spatie.be/laravel-permission/v3/basic-usage/middleware/
Generate UUID : https://github.com/webpatser/laravel-uuid
Images : http://image.intervention.io/api/save

<!-- addedd by Mhmd ezz -->
## After Cloning the project
1- run composer install to generate depedencies in vendor folder 
<!--
  If it doesn't work try composer update 
  ++ Some packages need to be update the version in composer.json to be compatible with PHP V8
  ++ Package fzaninotto/faker is abandoned, you should avoid using it. No replacement was suggested.
  Package phpunit/php-token-stream is abandoned, you should avoid using it. No replacement was suggested.
  ++ Class App\Http\Resources\Transplant_OperationResource located in C:/xampp/htdocs/projects/new-presales-portal/presales_portal_server/app\Http\Resources\plant_OperationResource.php does not comply with psr-4 autoloading standard. Skipping.
-->
2- change .env.example to .env
3- run php artisan key:generate
4- configure .env
5- add DB to the Database you are using. ex: MySQL
6- after migration install passport : php artisan passport:install
<!-- END After Cloning the project -->


## Commands SERVE
- php artisan serve

## Commands MIGRATION
- php artisan migrate:status
- php artisan migrate
- php artisan migrate:rollback
- php artisan make:migration create_users_table

## Commands MAKE
- php artisan make:controller CustomersController --model=Customer --resource --api
- php artisan make:model MODELNAME
- php artisan make:request REQUESTNAME
- php artisan make:resource UserResource

## Commands CLEAINING
- composer dump-autoload
- php artisan config:cache
- php artisan route:cache

## Commands SEED
- php artisan db:seed --class=UserSeeder
- php artisan make:factory PatientFactory
- php artisan make:seeder PatientSeeder

## Custom Commands
- php artisan custom:resetdb
- php artisan command:CMDMigrateUsers

## Commands DEPLOY
1. php artisan storage:link
2. php artisan passport:client --password // Skip if database was imported from local to online
3. php artisan db:seed


## Commands OnDatabase Empty
- php artisan migrate
- php artisan passport:install
- php artisan passport:client --password ( USE THE NEW CLIENT id/secret )
- php artisan db:seed
- READY TO LOGIN

## for cmd user migration 
- composer dump-autoload
- php artisan config:cache
- php artisan route:cache

- php artisan command:CMDMigrateUser (CMDMigrateUsers bel app/console/commands)
