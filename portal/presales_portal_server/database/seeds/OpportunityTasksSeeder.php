<?php

use App\OpportunityTask;
use Illuminate\Database\Seeder;

class OpportunityTasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $opp_task_1 = new OpportunityTask();
        $opp_task_1->order = "1";
        $opp_task_1->title = "task 1";
        $opp_task_1->priority = "Important";
        $opp_task_1->type = "Happy";
        $opp_task_1->dueDate = '2020-02-09';
        $opp_task_1->completed = false;
        $opp_task_1->notes = '';
        $opp_task_1->opportunity_id = 1;
        $opp_task_1->created_by = 1;
        $opp_task_1->assigned_to = 2;
        $opp_task_1->save();


        $opp_task_1 = new OpportunityTask();
        $opp_task_1->order = "2";
        $opp_task_1->title = "task 2";
        $opp_task_1->priority = "Standard";
        $opp_task_1->type = "Good";
        $opp_task_1->dueDate = '2020-02-10';
        $opp_task_1->completed = false;
        $opp_task_1->notes = '';
        $opp_task_1->opportunity_id = 1;
        $opp_task_1->created_by = 2;
        $opp_task_1->assigned_to = 3;
        $opp_task_1->save();
    }
}
