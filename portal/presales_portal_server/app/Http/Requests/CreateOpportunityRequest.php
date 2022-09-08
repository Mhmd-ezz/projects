<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateOpportunityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            // 'products' => 'present|array',
            // 'tasks' => 'present|array',
            'client_id' => 'required|exists:App\Client,id',
            'user_id' => 'required|exists:App\User,id',
            // 'country_manager_id' => 'required|exists:App\User,id',
            // 'executive_manager_id' => 'required|exists:App\User,id',
            'release_date' => 'required|date',
            'submission_date' => 'required|date',
            'subsidiary_date' => 'required|date',
            'submission_type' => 'required',
            // 'tasks.*.task' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'client_id.required' => "Client is required",
            'user_id.required' => "User is required",
            'submission_type.required' => "Submission type is required",
            'subsidiary_date.required' => "Subsidiary date type is required",
            'submission_type.required' => "Submission type is required",
            'country_manager_id.required' => "Country manager is required",
            'executive_manager_id.required' => "Executive manager is required",
        ];
    }
}
