<?php

namespace App;

use App\Opportunity;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name'];

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }
}
