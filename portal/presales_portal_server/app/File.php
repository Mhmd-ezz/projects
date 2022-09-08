<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    //
    public function opportunity()
    {
        return $this->belongsTo(Opportunity::class);
    }
}
