<?php

use Illuminate\Database\Seeder;
use Database\Seeders\oauthClientsSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(PatientSeeder::class);
        $this->call(RolesSeeder::class);
        $this->call(BranchesSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ProductsSeeder::class);
        $this->call(ClientsSeeder::class);
        $this->call(OpportunitySeeder::class);
        $this->call(OpportunityTasksSeeder::class);
    }
}
