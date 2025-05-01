<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'company_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email',
            'phone_number' => 'required|string|max:20',
            'billing_address' => 'required|string',
            'shipping_address' => 'required|string',
            'vat_number' => 'nullable|string|max:255',
            'website' => 'nullable|url',
            'photo' => 'nullable|image|max:2048',
            'currency' => 'required|size:3',
        ];
    }
}