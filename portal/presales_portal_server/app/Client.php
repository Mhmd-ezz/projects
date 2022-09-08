<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    // $fillable = []; // type fields that can be assignable.
    // $guarded = []; //type fields that can't be mass assignable.

    protected $fillable = ['name', 'country_code', 'email', 'contact_number', 'size', 'number_employees', 'industry', 'abbreviation'];

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }
}
