<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    // @ Disable Wrapper
    public static $wrap = '';

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'mobile' => $this->mobile,
            'gender' => $this->gender,
            'entry_date' => $this->entry_date ? $this->entry_date->format('d/m/Y') : null,
            'last_visit' => $this->last_visit ? $this->last_visit->format('d/m/Y') : null,
            'birthdate' => $this->birthdate ? $this->birthdate->format('d/m/Y') : null,
            'country' => $this->country,
            'city' => $this->city,
            'blood_type' => $this->blood_type,
            'email' => $this->email,
            'emergancy_contact' => $this->emergancy_contact,
            'file_number' => $this->file_number,
            'marital_status' => $this->marital_status,
            'spouse' => $this->spouse,
            'identity_number' => $this->identity_number,
            'occupation' => $this->occupation,
            'referral' => $this->referral,
            'image' => asset(Storage::url('profiles/' . $this->image)),
            'image_xs' => asset(Storage::url('profiles/' . $this->image_xs))
        ];
    }
}
