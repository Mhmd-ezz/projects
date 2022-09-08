<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateTaskRequest extends FormRequest
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
            // 'title' => 'required|string',
            // 'dueDate' => 'required|date',
            // 'opportunity_id' => 'required|exists:App\Opportunity,id',
            // 'created_by' => 'required|exists:App\User,id',
            // 'assigned_to' => 'required|exists:App\User,id',
        ];
    }
}
