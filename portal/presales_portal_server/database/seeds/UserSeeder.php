<?php

namespace Database\seeds;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\User;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = 'ceo';
        $user->first_name = 'ceo';
        $user->last_name = 'ceo';
        $user->email = 'ceo@gmail.com';
        $user->email_verified_at = now();
        $user->password = bcrypt('123456');
        $role = Role::findByName('ceo');
        $user->assignRole($role);
        $user->save();

        $user = new User();
        $user->name = 'presales manager';
        $user->first_name = 'presales manager';
        $user->last_name = 'presales manager';
        $user->email = 'presales_manager@gmail.com';
        $user->email_verified_at = now();
        $user->password = bcrypt('123456');
        $role = Role::findByName('presales_manager');
        $user->assignRole($role);
        $user->save();

        $user = new User();
        $user->name = 'presales consultant';
        $user->first_name = 'presales consultant';
        $user->last_name = 'presales consultant';
        $user->email = 'presales_consultant@gmail.com';
        $user->email_verified_at = now();
        $user->password = bcrypt('123456');
        $role = Role::findByName('presales_consultant');
        $user->assignRole($role);
        $user->save();

        $user = new User();
        $user->name = 'executive manager';
        $user->first_name = 'executive manager';
        $user->last_name = 'executive manager';
        $user->email = 'executive_manager@gmail.com';
        $user->email_verified_at = now();
        $user->password = bcrypt('123456');
        $user->save();
        $role = Role::findByName('executive_manager');
        $user->assignRole($role);
        $user->update();
        $uexId = $user->id;

        $user = new User();
        $user->name = 'country manager';
        $user->first_name = 'country manager';
        $user->last_name = 'country manager';
        $user->email = 'country_manager@gmail.com';
        $user->email_verified_at = now();
        $user->password = bcrypt('123456');
        $user->reporting_to = $uexId;
        $user->save();
        $role = Role::findByName('country_manager');
        $user->assignRole($role);
        $user->update();
        $coId = $user->id;

        $user = new User();
        $user->name = 'Sales Manager';
        $user->first_name = 'Sales Manager';
        $user->last_name = 'Manager';
        $user->email = 'sales_manager@gmail.com';
        $user->email_verified_at = now();
        $user->password = bcrypt('123456');
        $user->reporting_to = $coId;
        $user->save();
        $role = Role::findByName('sales_manager');
        $user->assignRole($role);
        $user->update();
        $smId = $user->id;

        $user = new User();
        $user->name = 'sales man';
        $user->first_name = 'sales man';
        $user->last_name = 'sales man';
        $user->email = 'sales@gmail.com';
        $user->reporting_to = 'sales@gmail.com';
        $user->email_verified_at = now();
        $user->reporting_to = $smId;
        $user->password = bcrypt('123456');
        $role = Role::findByName('sales');
        $user->assignRole($role);
        $user->save();
    }
}
