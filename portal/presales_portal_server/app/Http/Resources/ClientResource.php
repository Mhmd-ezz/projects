<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
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
            'country_code' => $this->country_code,
            'email' => $this->email,
            'contact_number' => $this->contact_number,
            'size' => $this->size,
            'number_employees' => $this->number_employees,
            'industry' => $this->industry,
            'abbreviation' => $this->abbreviation,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        return $response;
    }
}
