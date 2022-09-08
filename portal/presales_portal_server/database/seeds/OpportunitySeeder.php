<?php

use App\Opportunity;
use Illuminate\Database\Seeder;

class OpportunitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $op = new Opportunity();

        $op->user_id = 4;
        $op->executive_manager_id = 6;
        $op->country_manager_id = 5;
        $op->branch_id = 1;
        $op->client_id = 1;

        $op->release_date = '2020-02-02';
        $op->submission_date = '2020-02-02';
        $op->subsidiary_date = '2020-02-02';
        $op->reminder_date = '2020-02-09';
        $op->description = 'desc';
        $op->observation = 'observation';
        $op->external_resources = 'external resources';
        $op->duration = '12 months';
        $op->required_technology = 'oracle';
        $op->winning_chance = 'high';
        $op->learned = 'direct';
        $op->competitors = 'sqs';
        $op->budget = '200 - 2000';
        $op->currency_code = 'USD';
        $op->submission_type = 'email';

        $op->department_action = 'normal action';
        $op->department_manager_action = 'normal action';
        $op->status = 'won';
        $op->rfp_status = 'submitted';
        $op->proposed_value = '200000';
        $op->awarded_amount = '100000';

        $op->save();

        // @ Set products -> MANY TO MANY
        $op->products()->sync([1,2]);
    }
}
