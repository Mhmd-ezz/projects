<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
{
    public static $wrap = '';

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $response = [
            'id' => $this->id,
            'name' => $this->name,
            'path' =>  asset(Storage::url('files/' . $this->name)),
            'original_name' => $this->original_name,
            'type' => $this->type,
            'size' => $this->size,
            'opportunity_id' => $this->opportunity_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        return $response;
    }
}
