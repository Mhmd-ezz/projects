<?php

use App\Client;
use Illuminate\Database\Seeder;

class ClientsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $client = new Client();

        $client->name = "facebook";
        $client->country_code = "QA";
        $client->email = "facebook@email.com";
        $client->contact_number = "961 3 090987";
        $client->size = "large interprise";
        $client->number_employees = "200 - 500";
        $client->industry = "Other";
        $client->abbreviation = "fb";

        $client->save();
    }
}
