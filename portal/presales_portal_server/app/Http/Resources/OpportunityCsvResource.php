<?php

namespace App\Http\Resources;

use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class OpportunityCsvResource extends JsonResource
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

        $response = [
            // 'tasks' =>  array_column((array) collect(OpportunityTaskResource::collection($this->tasks)),'opportunity_id'),
            'tasks' =>  $this->getTasks($this->tasks),
            // 'id' => $this->id,
            // 'name' => $this->name,
            // 'release_date' => $this->release_date,
            // 'submission_date' => $this->submission_date,
            // 'subsidiary_date' => $this->subsidiary_date,
            // 'description' => $this->description,
            // 'observation' => $this->observation,
            // 'external_resources' => $this->external_resources,
            // 'duration' => $this->duration,
            // 'required_technology' => $this->required_technology,
            // 'winning_chance' => $this->winning_chance,
            // 'learned' => $this->learned,
            // 'competitors' => $this->competitors,
            // 'budget' => $this->budget,
            // 'currency_code' => $this->currency_code,
            // 'submission_type' => $this->submission_type,

            // 'contact_name' => $this->contact_name,
            // 'contact_title' => $this->contact_title,
            // 'contact_email' => $this->contact_email,
            // 'contact_number' => $this->contact_number,
            // 'demo_date' => $this->demo_date,
            // 'category' => $this->category,

            // // 'files' => FileResource::collection($this->files),

            // 'create_at' => $this->create_at,
            // 'updated_at' => $this->updated_at,
            // 'client' => $this->client->name,
            // 'user' => $this->user->name,
            // 'branch' => $this->branch->name,
            // 'status' => $this->status,
            // 'rfp_status' => $this->rfp_status,
            // 'products' =>  ProductResource::collection($this->products),
        ];



        // @ ADMIN ROLES
        if (Auth::check() && Auth::user()->id) {
            $user = User::find(Auth::user()->id);
            $is_presales_dmin = $user->isPresalesManager($user);
            if ($is_presales_dmin) {
                $res = [
                    'department_action' => $this->department_action,
                    'department_manager_action' => $this->department_manager_action,
                    'reminder_date' => $this->reminder_date,
                    'proposed_value' => $this->proposed_value,
                    'awarded_amount' => $this->awarded_amount,
                ];
                $response = $response + $res;
            }
        }
        return $response;
    }
    public function getTasks($tasks)
    {
        dd($tasks);
        $res = [];
        for ($i = 0; $i < count($tasks); $i++) {
            // $a = new UserResource(+);
            // $a = ;
            // echo json_encode($user);
            $aa =  $tasks[$i];
            dd($aa);
            array_push($res, $aa);
        }
        return $res;
    }
}
