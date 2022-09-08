<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class OpportunityTask extends Model
{

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to', 'id');
    }

    public function opportunity()
    {
        return $this->belongsTo(Opportunity::class, 'opportunity_id', 'id');
    }

    protected $attributes = [
        'priority' => 0,
        'order' => 0,
    ];

    protected $casts = [
        'priority' => 'integer',
        'dueDate' => 'date',
    ];
}
