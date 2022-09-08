<?php

namespace App\Helpers;

use App\User;
use App\Opportunity;
use Illuminate\Support\Facades\Mail;
use App\Http\Resources\OpportunityResource;
use App\Http\Resources\UserResource;

class MailHelper
{
    public static function sendOpportunityCreatedMail($opp, $send_to_addresses)
    {
        // $opp = Opportunity::find(1);
        $send_to = [];
        $data = new OpportunityResource($opp);
        $data->mailHeader = 'New Opportunity Added.';
        $dataInput = [
            'sender' => $data->user->name,
            'opportunity_id' => $data->id,
            'client' => $data->client->name,
            'client_country'=> $data->branch->country_code,
            'description' => $data->description,
            'release_date' => $data->release_date,
            'files' => $data->files,
            'subsidiary_date' => $data->subsidiary_date,
            'external_resources' => $data->external_resources,
            'submission_date' => $data->submission_date
        ];
      
        $arr = explode(' ',trim($data->descriptions));
        $desc = '';
        $desc =  isset($arr[0]) ? $desc.' '.$arr[0] : $desc;
        $desc =  isset($arr[1]) ? $desc.' '.$arr[1] : $desc;
        $desc =  isset($arr[2]) ? $desc.' '.$arr[2] : $desc;
        
        $subject = "Opportunity Created - ". $data->branch->country_code . " - " . $data->client->name . " - " . $desc;
       
        if (isset($send_to_addresses) && count($send_to_addresses->toArray()) > 0) {
            $send_to_addresses = $send_to_addresses->toArray();
            $send_to = $send_to_addresses;
        } else {
            $send_to =  User::get_admins()->toArray();
            $send_to = array_column($send_to, 'email');
            array_push($send_to, $data->user->email);
            $send_to = array_unique($send_to);
        }

        // return $data;
        $to_name = "Opportunity created.";
        $to_email = $send_to;
        Mail::send("opportunity_created_email_template", $dataInput, function ($message) use ($to_name, $to_email,$subject) {
            $message->to($to_email, $to_name)
                ->subject($subject);
            $message->from("no-reply@intalio.com", "Intalio Presales");
        });

        return 'OK';
    }

    public static function sendOpportunityNewUploadedFilesMail($opp, $send_to_addresses)
    {
        // $opp = Opportunity::find(1);
        $send_to = [];
        $data = new OpportunityResource($opp);
        $data->mailHeader = 'New files were uploaded.';
        $dataInput = [
            'sender' => $data->user->name,
            'opportunity_id' => $data->id,
            'client' => $data->client->name,
            'description' => $data->description,
            'release_date' => $data->release_date,
            'files' => $data->files,
            'subsidiary_date' => $data->subsidiary_date,
            'external_resources' => $data->external_resources,
            'submission_date' => $data->submission_date
        ];

        if (isset($send_to_addresses) && count($send_to_addresses->toArray()) > 0) {
            $send_to_addresses = $send_to_addresses->toArray();
            $send_to = $send_to_addresses;
        } else {
            $send_to =  User::get_admins()->toArray();
            $send_to = array_column($send_to, 'email');
            array_push($send_to, $data->user->email);
            $send_to = array_unique($send_to);
        }

        // return $data;
        $to_name = "";
        $to_email = $send_to;
        Mail::send("opportunity_new_uploaded_files_email_template", $dataInput, function ($message) use ($to_name, $to_email) {
            $message->to($to_email, $to_name)
                ->subject("New files were uploaded");
            $message->from("no-reply@intalio.com", "Intalio Presales");
        });

        return 'OK';
    }

    public static function sendAccountCreatedEmail(User $user, $password)
    {
        $data = new UserResource($user);
        $dataInput = [
            'email' => $data->email,
            'password' => $password,
        ];

        $to_name = $data->name;
        $to_email = $data->email;
        Mail::send("email_account_created_template", $dataInput, function ($message) use ($to_name, $to_email) {
            $message->to($to_email, $to_name)
                ->subject("Account created");
            $message->from("no-reply@intalio.com", "Intalio Presales");
        });

        if (Mail::failures()) {
            // return failed mails
            return "error";
        }

        return 'OK';
    }
}
