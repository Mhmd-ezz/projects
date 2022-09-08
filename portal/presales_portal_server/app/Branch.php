<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    protected $fillable = ['name', 'country_code', 'currency_code'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }
}
