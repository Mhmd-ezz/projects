<?php

namespace App;

// use Illuminate\Http\Request;

use App\User;
use App\Branch;
use App\Opportunity;

use App\Helpers\MailHelper;
use database\etl\OpportunitiesEtl;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\App;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
// use Spatie\Permission\Models\Role;
// use Spatie\Permission\Models\Permission;

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/email_opp/{opp}', function (Opportunity $opp) {

//     return MailHelper::sendOpportunityCreatedMail($opp);
// });


// Route::get('/email/{user}', function (User $user) {

//     $data = new UserResource($user);
//     $mail_header = 'We have created a new account for you.';

//     $password = '123456';
//     $dataInput = [
//         'email' => $data->email,
//         'password' => $password,
//     ];

//     $to_name = $data->name;
//     // $to_email = $data->email;
//     // $to_email = 'h.elrifaii@smartechbay.com';
//     //  $to_email = 'h.elrifaii@smartechbay.com';
//     $to_email = 'hasan.ri25@gmail.com';

//     Mail::send("email_account_created_template", $dataInput, function ($message) use ($to_name, $to_email) {
//         $message->to($to_email, $to_name)
//             ->subject("Presales portal account created");
//         $message->from("presales.everteam@gmail.com", "Presales Portal");
//     });

//     // if( count(Mail::failures()) > 0 ) {

//     //   echo "There was one or more failures. They were: <br />";

//     //   foreach(Mail::failures() as $email_address) {
//     //       echo " - $email_address <br />";
//     //     }

//     // } else {
//     //     echo "No errors, all sent successfully!";
//     // }

//     return 'OK';
// });

Route::get('/csv', function () {
    /*
    * 
    * Based on (forked from) the work by https://gist.github.com/Kostanos
    *
    * This revision allows the PHP file to be included/required in another PHP file and called as a function, rather than focusing on command line usage.
    * 
    * Convert JSON file to CSV and output it.
    *
    * JSON should be an array of objects, dictionaries with simple data structure
    * and the same keys in each object.
    * The order of keys it took from the first element.
    *
    * Example:
    * json:
    * [
    *  { "key1": "value", "kye2": "value", "key3": "value" },
    *  { "key1": "value", "kye2": "value", "key3": "value" },
    *  { "key1": "value", "kye2": "value", "key3": "value" }
    * ]
    *
    * The csv output: (keys will be used for first row):
    * 1. key1, key2, key3
    * 2. value, value, value
    * 3. value, value, value
    * 4. value, value, value
    *
    * Usage:
    * 
    *     require '/path/to/json-to-csv.php';
    *     
    *     // echo a JSON string as CSV
    *     jsonToCsv($strJson);
    *     
    *     // echo an arrayJSON string as CSV
    *     jsonToCsv($arrJson);
    *     
    *     // save a JSON string as CSV file
    *     jsonToCsv($strJson,"/save/path/csvFile.csv");
    *     
    *     // save a JSON string as CSV file through the browser (no file saved on server)
    *     jsonToCsv($strJson,false,true);
    *     
    *     
  */

    function jsonToCsv($json, $csvFilePath = false, $boolOutputFile = false)
    {

        // See if the string contains something
        if (empty($json)) {
            die("The JSON string is empty!");
        }

        // If passed a string, turn it into an array
        if (is_array($json) === false) {
            $json = json_decode($json, true);
        }

        // If a path is included, open that file for handling. Otherwise, use a temp file (for echoing CSV string)
        if ($csvFilePath !== false) {
            $f = fopen($csvFilePath, 'w+');
            if ($f === false) {
                die("Couldn't create the file to store the CSV, or the path is invalid. Make sure you're including the full path, INCLUDING the name of the output file (e.g. '../save/path/csvOutput.csv')");
            }
        } else {
            $boolEchoCsv = true;
            if ($boolOutputFile === true) {
                $boolEchoCsv = false;
            }
            $strTempFile = 'opportunity-report' . date("U") . ".csv";
            $f = fopen($strTempFile, "w+");
        }

        $firstLineKeys = false;
        foreach ($json as $line) {
            if (empty($firstLineKeys)) {
                $firstLineKeys = array_keys($line);
                fputcsv($f, $firstLineKeys);
                $firstLineKeys = array_flip($firstLineKeys);
            }

            // Using array_merge is important to maintain the order of keys acording to the first element
            fputcsv($f, array_merge($firstLineKeys, $line));
        }
        fclose($f);

        // Take the file and put it to a string/file for output (if no save path was included in function arguments)
        if ($boolOutputFile === true) {
            if ($csvFilePath !== false) {
                $file = $csvFilePath;
            } else {
                $file = $strTempFile;
            }

            // Output the file to the browser (for open/save)
            if (file_exists($file)) {
                // header('Content-Type: text/csv');
                // header('Content-Disposition: attachment; filename=' . basename($file));
                // header('Content-Length: ' . filesize($file));
                // readfile($file);
            }
        } elseif ($boolEchoCsv === true) {

            if (($handle = fopen($strTempFile, "r")) !== FALSE) {
                while (($data = fgetcsv($handle)) !== FALSE) {
                    echo implode(",", $data);
                    echo "<br />";
                }
                fclose($handle);
            }
        }

        // Delete the temp file
        unlink($strTempFile);
    }
    $data = '[
    { "key1": "value", "kye2": "value", "key3": "value" },
    { "key1": "value", "kye2": "value", "key3": "value" },
    { "key1": "value", "kye2": "value", "key3": "value" }
  ]';
    return jsonToCsv($data, false, true);
});

Route::get('/etl', function () {
    return OpportunitiesEtl::pushOpportunities();
});

Route::get('/a', function () {

    return url('user/');
    // if (App::environment('production')) {
    //     // The environment is production
    //     return "prod";
    // }else if (App::environment('local')){
    //     return "local";
    // }

    return 0;
    // $users =  [
    //     [
    //         "firstname" => "Antoine",
    //         "lastname" => "HRAOUI",
    //         "country" => "Lebanon",
    //         "currency" => "USD",
    //         "email" => "a.hraoui@everteam-gs.com",
    //         "role" => "ceo"
    //     ],
    //     [
    //         "firstname" => "Stephanie",
    //         "lastname" => "AZARIAN",
    //         "country" => "Lebanon",
    //         "currency" => "LBP",
    //         "email" => "s.azarian@everteam-gs.com",
    //         "role" => 'vp'
    //     ],
    //     [
    //         "firstname" => "Mazen",
    //         "lastname" => "FARAH",
    //         "country" => "Lebanon",
    //         "currency" => "LBP",
    //         "email" => "m.farah@everteam-gs.com",
    //         "role" => 'presales_manager'
    //     ],
    //     [
    //         "firstname" => "Hussein",
    //         "lastname" => "ABDALLAH",
    //         "country" => "Qatar",
    //         "currency" => "QAR",
    //         "email" => "h.abdallah@everteam-gs.com",
    //         "role" => "country_manager"
    //     ],
    //     [
    //         "firstname" => "Ali",
    //         "lastname" => "SHARARA",
    //         "country" => "Qatar",
    //         "currency" => "QAR",
    //         "email" => "a.sharara@everteam-gs.com",
    //         "role" => "country_manager"
    //     ],
    //     [
    //         "firstname" => "Bilal",
    //         "lastname" => "HMEDEH",
    //         "country" => "Saudi Arabia",
    //         "currency" => "SAR",
    //         "email" => "b.hmedeh@everteam-gs.com",
    //         "role" => "country_manager"
    //     ],
    //     [
    //         "firstname" => "George",
    //         "lastname" => "MAALOUF",
    //         "country" => "Saudi Arabia",
    //         "currency" => "SAR",
    //         "email" => "g.maalouf@everteam-gs.com",
    //         "role" => "country_manager"
    //     ],
    //     [
    //         "firstname" => "Rony",
    //         "lastname" => "HONEIN",
    //         "country" => "France",
    //         "currency" => "EUR",
    //         "email" => "r.honein@ebsgs-fr.com",
    //         "role" => "country_manager"
    //     ],
    //     [
    //         "firstname" => "Georges",
    //         "lastname" => "ZORBA",
    //         "country" => "United Arab Emirates",
    //         "currency" => "AED",
    //         "email" => "g.zorba@everteam-gs.com",
    //         "role" => "country_manager"
    //     ],
    //     [
    //         "firstname" => "mohamed",
    //         "lastname" => "KHACHEB",
    //         "country" => "Kuwait",
    //         "currency" => "USD",
    //         "email" => "mohamed.khachab@intalio.com"
    //     ],
    //     [
    //         "firstname" => "ehab",
    //         "lastname" => "KAMEL",
    //         "country" => "Saudi Arabia",
    //         "currency" => "SAR",
    //         "email" => "ehab.kamel@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "safia",
    //         "lastname" => "ALMOZAINI",
    //         "country" => "Saudi Arabia",
    //         "currency" => "SAR",
    //         "email" => "safia.almozaini@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "MarieTherese",
    //         "lastname" => "AMMOUN",
    //         "country" => "Qatar",
    //         "currency" => "QAR",
    //         "email" => "mt.ammoun@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "mohamed",
    //         "lastname" => "KHACHAB",
    //         "country" => "Kuwait",
    //         "currency" => "USD",
    //         "email" => "mohamed.khachab@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "mai",
    //         "lastname" => "ABDULLAH",
    //         "country" => "United Arab Emirates",
    //         "currency" => "AED",
    //         "email" => "mai.abdallah@intalio.com"
    //     ],
    //     [
    //         "firstname" => "ahmed",
    //         "lastname" => "NASSAR",
    //         "country" => "United Arab Emirates",
    //         "currency" => "AED",
    //         "email" => "ahmed.nassar@intalio.com"
    //     ],
    //     [
    //         "firstname" => "yasser",
    //         "lastname" => "ELMOUSRI",
    //         "country" => "Qatar",
    //         "currency" => "QAR",
    //         "email" => "yasser.elmoursi@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Ahmed",
    //         "lastname" => "SAAD",
    //         "country" => "Egypt",
    //         "currency" => "EGP",
    //         "email" => "ahmed.saad@dts-egypt.com"
    //     ],
    //     [
    //         "firstname" => "Yassine",
    //         "lastname" => "ARRAB",
    //         "country" => "Algeria",
    //         "currency" => "USD",
    //         "email" => "y.aarab@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Amer",
    //         "lastname" => "ZAINALABDIN",
    //         "country" => "Saudi Arabia",
    //         "currency" => "SAR",
    //         "email" => "a.abdin@comptechco.com"
    //     ],
    //     [
    //         "firstname" => "Wissam",
    //         "lastname" => "ROUHANA",
    //         "country" => "Algeria",
    //         "currency" => "USD",
    //         "email" => "w.rouhana@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Karim",
    //         "lastname" => "BADR",
    //         "country" => "Egypt",
    //         "currency" => "EGP",
    //         "email" => "k.badr@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Ramez",
    //         "lastname" => "ALKARA",
    //         "country" => "Egypt",
    //         "currency" => "EGP",
    //         "email" => "r.alkarra@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Hadi",
    //         "lastname" => "ABDALLAH",
    //         "country" => "France",
    //         "currency" => "EUR",
    //         "email" => "hadi.abdallah@ebsgs-fr.com"
    //     ],
    //     [
    //         "firstname" => "Mamar",
    //         "lastname" => "MERABI",
    //         "country" => "France",
    //         "currency" => "EUR",
    //         "email" => "m.merabi@ebsgs-fr.com"
    //     ],
    //     [
    //         "firstname" => "Georges",
    //         "lastname" => "ARAMOUNY",
    //         "country" => "France",
    //         "currency" => "EUR",
    //         "email" => "g.aramouny@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Roland",
    //         "lastname" => "SALAMEH",
    //         "country" => "Lebanon",
    //         "currency" => "USD",
    //         "email" => "r.salameh@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "MarieTherese",
    //         "lastname" => "AMMOUN",
    //         "country" => "Lebanon",
    //         "currency" => "USD",
    //         "email" => "m.ammoun@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Jean-Pierre",
    //         "lastname" => "LA-HAUSSE-DE-LALOUVIERE",
    //         "country" => "Mauritius",
    //         "currency" => "USD",
    //         "email" => "jplhl@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Yassine",
    //         "lastname" => "ABOU-KADRI",
    //         "country" => "Morocco",
    //         "currency" => "USD",
    //         "email" => "y.aboukadri@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Maram",
    //         "lastname" => "HUSSEIN",
    //         "country" => "Qatar",
    //         "currency" => "QAR",
    //         "email" => "m.hussein@everteam-gs.com"
    //     ],

    //     [
    //         "firstname" => "Hussein",
    //         "lastname" => "CHOKR",
    //         "country" => "Qatar",
    //         "currency" => "QAR",
    //         "email" => "h.chokr@everteam-gs.com"
    //     ],

    //     [
    //         "firstname" => "Adeel",
    //         "lastname" => "RAHMAN",
    //         "country" => "United Arab Emirates",
    //         "currency" => "AED",
    //         "email" => "a.rahman@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Karl",
    //         "lastname" => "MELKI",
    //         "country" => "Lebanon",
    //         "currency" => "USD",
    //         "email" => "k.melki@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Samer",
    //         "lastname" => "HOBEIKA",
    //         "country" => "Lebanon",
    //         "currency" => "USD",
    //         "email" => "s.hobeika@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Salam",
    //         "lastname" => "EID",
    //         "country" => "Kuwait",
    //         "currency" => "USD",
    //         "email" => "salam.eid@worldtek.co"
    //     ],

    //     [
    //         "firstname" => "Zeina",
    //         "lastname" => "ATRISSI",
    //         "country" => "Saudi Arabia",
    //         "currency" => "SAR",
    //         "email" => "z.atrissi@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Mansour",
    //         "lastname" => "HOBEIKA",
    //         "country" => "Ghana",
    //         "currency" => "GHS",
    //         "email" => "mansour.hobeika@intalio.com"
    //     ],

    //     [
    //         "firstname" => "Rita",
    //         "lastname" => "JAWHAR",
    //         "country" => "Qatar",
    //         "currency" => "QAR",
    //         "email" => "r.jawhar@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Wasfi",
    //         "lastname" => "ELLOUZE",
    //         "country" => "France",
    //         "currency" => "EUR",
    //         "email" => "w.ellouze@ebsgs-fr.com"
    //     ],
    //     [
    //         "firstname" => "Mohammad",
    //         "lastname" => "HASSAN",
    //         "country" => "Lebanon",
    //         "currency" => "USD",
    //         "email" => "m.hassan@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Karim",
    //         "lastname" => "THOMAS",
    //         "country" => "Qatar",
    //         "currency" => "QAR",
    //         "email" => "k.thomas@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Lara",
    //         "lastname" => "KANAAN",
    //         "country" => "Lebanon",
    //         "currency" => "LBP",
    //         "email" => "l.kanaan@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Yahya",
    //         "lastname" => "ABIHAIDAR",
    //         "country" => "Lebanon",
    //         "currency" => "LBP",
    //         "email" => "y.abihaidar@everteam-gs.com"
    //     ],
    //     [
    //         "firstname" => "Mohammed",
    //         "lastname" => "Alkhamis",
    //         "country" => "Saudi Arabia",
    //         "currency" => "SAR",
    //         "email" => "m.Alkhamis@everteam-gs.com"
    //     ]
    // ];
    $users = [];
    $pass =  bcrypt('123456');
    $res = [];
    foreach ($users as $item) {


        $user = new User();

        $user->name = $item['firstname'] . " " . $item['lastname'];
        $user->first_name = $item['firstname'];
        $user->last_name = $item['lastname'];
        $user->email =  $item['email'];
        $user->email_verified_at = now();
        if (!isset($item['role'])) {
            $item['role'] = "sales";
        }

        $role = Role::findByName($item['role']);
        $user->assignRole($role);

        $branch = Branch::where('name', $item['country'])->first();
        if ($branch) {
            $user->branch_id = $branch->id;
        } else {
            $user->branch_id = null;
        }

        $user->password =  $pass;

        array_push($res, $user);
        // $user->save();
    }
    return $res;
    return 'Hello World';
});

// ------------------------------------------------------------------------------
//  Opportunities
// ------------------------------------------------------------------------------
Route::group(['prefix' => 'dashboard'], function () {
    Route::group(['middleware' => ['cors', 'json.response']], function () {
        Route::get('/get', 'DashboardController@get')->name('dashboard.get');
        Route::get('/demos', 'DashboardController@getDemos')->name('dashboard.getDemos');
        Route::get('/to_be_delivered', 'DashboardController@getToBeDelivered')->name('dashboard.getToBeDelivered');
    });
});

// ------------------------------------------------------------------------------
//  Opportunities
// ------------------------------------------------------------------------------
Route::group(['prefix' => 'opportunities'], function () {
    Route::group(['middleware' => ['cors', 'json.response']], function () {
        Route::get('/download_report', 'OpportunitiesController@downloadReport')->name('opportunity.downloadReport');
        Route::post('/', 'OpportunitiesController@create')->name('opportunity.create');
        Route::post('/upload', 'OpportunitiesController@upload')->name('opportunity.upload');
        Route::post('/notify_uploaded_files/{opp}', 'OpportunitiesController@notifyUploadedFiles')->name('opportunity.notifyUploadedFiles');
        Route::post('/publish/{opp}', 'OpportunitiesController@publish')->name('opportunity.publish');
        Route::put('manage/{opp}', 'OpportunitiesController@manage')->name('opportunity.manage');
        Route::put('/{opp}', 'OpportunitiesController@update')->name('opportunity.update');
        Route::get('/download_file/{file}', 'OpportunitiesController@download_file')->name('opportunity.download_file');
        Route::delete('/delete_file/{file}', 'OpportunitiesController@delete_file')->name('opportunity.delete_file');
        Route::get('/list', 'OpportunitiesController@list')->name('opportunity.list');
        Route::get('/{opp}', 'OpportunitiesController@get')->name('opportunity.get');
        Route::delete('/{opp}', 'OpportunitiesController@delete')->name('opportunity.delete');
    });
});

Route::group(['prefix' => 'tasks'], function () {
    Route::group(['middleware' => ['cors', 'json.response']], function () {
        Route::get('/list', 'TasksController@list')->name('task.list');
        Route::get('/{task}', 'TasksController@get')->name('task.get');
        Route::post('/', 'TasksController@create')->name('task.create');
        Route::put('/', 'TasksController@update')->name('task.update');
        Route::post('/upload', 'TasksController@upload')->name('task.upload');
        Route::delete('/{task}', 'TasksController@delete')->name('task.delete');
    });
});

Route::group(['prefix' => 'branches'], function () {
    Route::group(['middleware' => ['cors', 'json.response']], function () {
        Route::get('/list', 'BranchesController@list')->name('branch.list');
        Route::get('/{branch}', 'BranchesController@get')->name('branch.get');
        Route::post('/', 'BranchesController@create')->name('branch.create');
        Route::put('/{branch}', 'BranchesController@update')->name('branch.update');
        Route::delete('/{branch}', 'BranchesController@delete')->name('branch.delete');
    });
});

Route::group(['prefix' => 'products'], function () {
    Route::group(['middleware' => ['cors', 'json.response']], function () {
        Route::post('/', 'ProductController@create')->name('product.create');
        Route::get('/list', 'ProductController@list')->name('product.list');
        Route::get('/{product}', 'ProductController@get')->name('product.get');
        Route::post('/', 'ProductController@create')->name('product.create');
        Route::put('/{product}', 'ProductController@update')->name('product.update');
        Route::delete('/{product}', 'ProductController@delete')->name('product.delete');
    });
});

Route::group(['prefix' => 'clients'], function () {
    Route::group(['middleware' => ['cors', 'json.response']], function () {
        Route::get('/list', 'ClientsController@list')->name('clients.list');
        Route::get('/{client}', 'ClientsController@get')->name('clients.get');
        Route::post('/', 'ClientsController@create')->name('clients.create');
        Route::put('/{client}', 'ClientsController@update')->name('clients.update');
        Route::delete('/{client}', 'ClientsController@delete')->name('clients.delete');
    });
});

Route::group(['prefix' => 'users'], function () {
    Route::group(['middleware' => ['cors', 'json.response']], function () {
        Route::post('/reset', 'UsersController@reset')->name('user.reset');
        Route::get('/info', 'UsersController@getUser')->name('user.getUser');
        Route::get('/', 'UsersController@filter')->name('user.filter');
        // Route::get('/info', 'UsersController@getUser')->name('user.getUser');
        Route::get('/{user}', 'UsersController@get')->name('user.get');
        Route::get('/{user}', 'UsersController@getUserById')->name('user.getUserById');
        Route::post('/', 'UsersController@create')->name('user.create');
        Route::put('/update_password/{user}', 'UsersController@updateUserPassword')->name('user.updateUserPassword');
        Route::put('/{user}', 'UsersController@update')->name('user.update');
        Route::delete('/{user}', 'UsersController@delete')->name('user.delete');
    });
});

Route::group(['prefix' => 'roles'], function () {
    Route::group(['middleware' => ['cors', 'json.response']], function () {
        Route::get('/', 'RolesController@getAll')->name('role.all');
        Route::get('/{role}', 'UsersController@get')->name('role.get');
    });
});



// Route::group(['middleware' => ['cors', 'json.response', 'auth:api', 'role:writer']], function () {

//     Route::get('/tests', function (Request $request) {
//         return "Hello world";
//     });


//     Route::get('/create-role', function (Request $request) {
//         $role = Role::create(['name' => 'writer']);
//         return $role;
//     });


//     Route::get('/assign-role', function (Request $request) {

//         $user = $request->user();
        // $writerRole = Role::findByName('writer');
//         // $user->assignRole($writerRole);
//         $res =  $user->hasRole('writer');
//         return $user;
//     });
// });
