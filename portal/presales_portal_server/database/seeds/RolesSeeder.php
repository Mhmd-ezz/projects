<?php

use Illuminate\Database\Seeder;
use Illuminate\Foundation\Auth\User;
use Spatie\Permission\Models\Role;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create(['name' => 'ceo', 'alt_name' => 'CEO']);
        Role::create(['name' => 'vp', 'alt_name' => 'VP']);
        Role::create(['name' => 'presales_manager', 'alt_name' => 'Presales Manager']);
        Role::create(['name' => 'presales_consultant', 'alt_name' => 'Presales Consultant']);
        Role::create(['name' => 'executive_manager', 'alt_name' => 'Executive Manager']);
        Role::create(['name' => 'country_manager', 'alt_name' => 'Country Manager']);
        Role::create(['name' => 'sales_manager', 'alt_name' => 'Sales Manager']);
        Role::create(['name' => 'sales', 'alt_name' => 'Sales']);
    }
}
