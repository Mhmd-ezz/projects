<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Opportunity extends Model
{
    public $timestamps = true;

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function tasks()
    {
        return $this->hasMany(OpportunityTask::class, 'opportunity_id', 'id');
    }

    public function tasksRel()
    {
        return $this->belongsToMany(OpportunityTask::class, 'opportunity_tasks', 'opportunity_id', 'id');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'opportunity_product');
    }

    public function files()
    {
        return $this->hasMany(File::class, 'opportunity_id', 'id');
    }

    public function country_manager()
    {
        return $this->belongsTo(User::class, 'country_manager_id', 'id');
    }

    public function executive_manager()
    {
        return $this->belongsTo(User::class, 'executive_manager_id', 'id');
    }

    public function syncTasks($tasks, $opp)
    {
        $tasks_ids = array();

        foreach ($tasks as $key => $value) {

            $id = isset($value['id']) ? $value['id'] : null;

            $object = OpportunityTask::findOrNew($id);
            $object->id = $id;
            $object->task = $value['task'];
            $object->deadline = $value['deadline'];
            $object->priority = $value['priority'];
            $object->completed = $value['completed'];
            $object->opportunity_id =  $opp->id;
            $object->user_id = $value['user_id'];

            $object->save();

            array_push($tasks_ids, $object->id);
        }

        $opp->tasksRel()->sync($tasks_ids); 
    }

    protected $dates = ['release_date', 'submission_date', 'subsidiary_date', 'reminder_date','demo_date'];
    protected $casts = [
        'release_date' => 'datetime:Y-m-d',
        'submission_date' => 'datetime:Y-m-d',
        'subsidiary_date' => 'datetime:Y-m-d',
        'reminder_date' => 'datetime:Y-m-d',
        'demo_date' => 'datetime:Y-m-d',
    ];    
}