<?php

use App\User;
use App\Opportunity;
use App\Helpers\MailHelper;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\OpportunityResource;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Route::get('opportunities/list', 'OpportunitiesController@list')->name('opportunity.list');

Route::get('/s', function () {

    $opp = Opportunity::find(73);
    // $data = new OpportunityResource($opp);

    return MailHelper::sendOpportunityCreatedMail($opp, ['hasan.ri25@gmail.com']);
    // return 'OK';

    // $data->mailHeader = 'New Opportunity Added.';
    
    // // return $data;
    // $to_name = "RECEIVER_NAME";
    // $to_email = "hasan.alrifaii@gmail.com";
    // $data = array("name"=>"Ogbonna Vitalis(sender_name)", "mailHeader" => "A test mail");
    // // Mail::send("email_template", $data, function($message) use ($to_name, $to_email) {
    // // $message->to($to_email, $to_name)
    // // ->subject("Laravel Test Mail");
    // // $message->from("hasan.ri25@gmail.com","Test Mail");
    // // });
    // return view('email_template', $data);
    // return view('email_template')->with(compact('data'));
    // return 'OK';
    // $to_name="hasan.alrifaii@gmail.com";
    // $to_email="hasan.alrifaii@gmail.com";
    // $data= array("name"=>$to_name, "body"=>"test mail");
    // Mail::send('email_template',$data, function($message) use ($to_name, $to_email){
    //     $message->to($to_email)
    //     ->subject("subject");
    // });

    // check for failed ones
    //  if (Mail::failures()) {
    //     // return failed mails
    //     return new Error(Mail::failures()); 
    // }
    // else{
    //     echo "mail is sent";
    // }

    // return view('welcome');
    // return view('email_template');
}
);


Route::get('/created', function () {

    // $user = User::find(1);
    // $data = new OpportunityResource($user);
    // $data->mailHeader = 'New Opportunity Added.';
    $password = "123456";
    $dataInput = [
        'email' => 'ee',
        'password' => '123456',
        'mailHeader' => 'New Opportunity Added.'
    ];

    $dataInput = [
        'sender' => 'Hasan rifaii',
        'client' => 'facebook',
        'release_date' => '12-12-2020',
        'submission_date' => '12-12-2020',
        'description' => 'description',
    ];
    // return $data;
    // $to_name = $data->name;
    // $to_email = 'hasan.ri25@gmail.com' || $data->email;
    // $data = array("name"=>"Ogbonna Vitalis(sender_name)", "body" => "A test mail");
    // Mail::send("email_template", $data, function($message) use ($to_name, $to_email) {
    // $message->to($to_email, $to_name)
    // ->subject("Laravel Test Mail");
    // $message->from("hasan.ri25@gmail.com","Test Mail");
    // });
    return view('opportunity_created_email_template',$dataInput);
    // return view('email_account_created_template',compact('dataInput'));
    // return 'OK';
    // $to_name="hasan.alrifaii@gmail.com";
    // $to_email="hasan.alrifaii@gmail.com";
    // $data= array("name"=>$to_name, "body"=>"test mail");
    // Mail::send('email_template',$data, function($message) use ($to_name, $to_email){
    //     $message->to($to_email)
    //     ->subject("subject");
    // });

    // check for failed ones
    //  if (Mail::failures()) {
    //     // return failed mails
    //     return new Error(Mail::failures()); 
    // }
    // else{
    //     echo "mail is sent";
    // }

    // return view('welcome');
    // return view('email_template');
}
);