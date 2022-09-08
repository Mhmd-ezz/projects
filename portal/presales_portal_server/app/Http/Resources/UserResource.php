<?php

namespace App\Http\Resources;

use App\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class UserResource extends JsonResource
{
    //https://github.com/laravel/framework/issues/23826#issuecomment-385627817
    public function __construct($resource, $detailed = false)
    {
        // Ensure you call the parent constructor
        parent::__construct($resource);
        $this->resource = $resource;

        $this->detailed = $detailed;
    }

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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'position' => $this->position,
            'contact_number' => $this->contact_number,
            'email' => $this->email,
            // 'role' => $this->role,
            'role' => $this->role ? new RoleResource(Role::findById(intval($this->role))) : null,
            'role_list' => $this->getRoleNames(),
            'reporting_to' => new UserResource($this->parents),
            'is_active' => $this->is_active,
            'new_opportunity_notification_enabled' => $this->new_opportunity_notification_enabled,
            // 'executive_manager_id' => $this->executive_manager_id,
            // 'country_manager_id' => $this->country_manager_id,
            // 'sales_manager_id' => $this->sales_manager_id,
            'branch' => new BranchResource($this->branch),
            'create_at' => $this->create_at,
            'updated_at' => $this->updated_at,
            'menu_permissions' => $this->detailed == true ? $this->menu_permission() : [],
            // 'menu_permissions' => $detailed == true ? $this->menu_permission() : [],
            // 'image' => asset(Storage::url('profiles/' . $this->image)),
            // 'image_xs' => asset(Storage::url('profiles/' . $this->image_xs))
        ];
    }

    private function menu_permission()
    {
        $user_roles = $this->getRoleNames();
        // $user = User::find($this->id);

        if (isset($user_roles[0])) {
            $user_role = $user_roles[0];
        } else {
            return [];
        }
        // $user_role =  isset($user_roles[0]) ? $user_roles[0] : false;;
        // $st = isset($stay[0]) ? $stay[0] : false;
        // if (!$st) {
        //    return [];
        // }
        $menu = [];
        if ($user_role == "ceo" || $user_role == "vp" || $user_role == "presales_manager") {
            $menu = ['opportunities', 'products', 'clients', 'branches', 'users', 'demos', 'reports'];
        } else if ($user_role == "executive_manager" || $user_role == "sales_manager") {
            $menu = ['opportunities', 'clients', 'dashboard', 'demos'];
        } else if ($user_role == "presales_consultant" || $user_role == "sales") {
            $menu = ['opportunities', 'demos'];
        }

        // @ temporarly adding dashboard to presales_manager until this page is done for testing
        if ($user_role == "presales_manager") {
            array_push($menu, 'dashboard');
        }

        return $menu;
    }


    // Role::create(['name' => 'ceo', 'alt_name' => 'CEO']);
    // Role::create(['name' => 'vp', 'alt_name' => 'VP']);
    // Role::create(['name' => 'presales_manager', 'alt_name' => 'Presales Manager']);
    // Role::create(['name' => 'presales_consultant', 'alt_name' => 'Presales Consultant']);
    // Role::create(['name' => 'executive_manager', 'alt_name' => 'Executive Manager']);
    // Role::create(['name' => 'country_manager', 'alt_name' => 'Country Manager']);
    // Role::create(['name' => 'sales_manager', 'alt_name' => 'Sales Manager']);
    // Role::create(['name' => 'sales', 'alt_name' => 'Sales']);
}
