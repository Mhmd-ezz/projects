<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OpportunityTaskResource extends JsonResource
{
    // @ Disable Wrapper
    public static $wrap = '';


    public function toArray($request)
    {

        return [
            'id' => $this->id,
            'order' => $this->order,
            'title' => $this->title,
            'priority' => $this->priority,
            'type' => $this->type,
            'dueDate' => $this->dueDate,
            'completed' => $this->completed,
            'notes' => $this->notes,
            'opportunity_id' => $this->opportunity_id,
            'created_by' => new UserResource($this->createdBy),
            'assigned_to' => new UserResource($this->assignedTo),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            // 'image' => asset(Storage::url('profiles/' . $this->image)),
            // 'image_xs' => asset(Storage::url('profiles/' . $this->image_xs))
        ];
    }
}
