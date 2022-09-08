<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use App\Http\Resources\UserResource;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasRoles;

    protected $fillable = [
        'name', 'email', 'password', 'first_name', 'last_name', 'branch_id', 'reporting_to',
        'contact_number', 'position', 'role', //what about the other fields..
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }

    public function opportunityTasks()
    {
        return $this->hasMany(OpportunityTask::class);
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }

    public function children()
    {
        return $this->hasMany(self::class, 'id');
    }

    public function parents()
    {
        return $this->belongsTo(self::class, 'reporting_to');
    }

    public static function get_admins()
    {

        $roles = ['presales_manager', 'vp'];
        $users = User::orderby('name', 'asc')
            ->where(function ($query) use ($roles) {
                if (!empty($roles))
                    $query->whereHas('roles',  function ($q) use ($roles) {
                        $q->whereIn('name', $roles);
                    });
            })->get();
        return $users;
        //   return UserResource::collection($users);
    }

    // public function countryManager()
    // {
    //     return $this->belongsTo(User::class);
    // }

    // public function executiveManager()
    // {
    //     return $this->belongsTo(User::class);
    // }

    // public function salesManager()
    // {
    //     return $this->belongsTo(User::class);
    // }

    public function isPresalesManager(User $user)
    {
        $user_roles = $user->getRoleNames();
        $decoded_user_roles = json_decode(json_encode($user_roles));
        $is_presales_manager = !empty(array_intersect(array_values(User::PRESALES_MANAGERS_ROLES), array_values($decoded_user_roles)));
        return $is_presales_manager;
    }

    public const PRESALES_MANAGERS_ROLES = [
        'ceo' => 'ceo',
        'presales_manager' => 'presales_manager',
        'vp' => 'vp',
    ];
}
