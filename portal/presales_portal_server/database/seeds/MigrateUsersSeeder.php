<?php

namespace database\seeds;

use App\User;
use App\Branch;
use App\Helpers\MailHelper;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Symfony\Component\Console\Input\ArrayInput;

class MigrateUsersSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(ArrayInput $args)
    {
        $users =  [
            [
                "firstname" => "mohamad",
                "lastname" => "ezzedine",
                "country" => "Lebanon",
                "currency" => "USD",
                "email" => "mohamad.ezzedine@intalio.com",
                "role" => "presales_consultant"
            ],
            [
                "firstname" => "Antoine",
                "lastname" => "HRAOUI",
                "country" => "Lebanon",
                "currency" => "USD",
                "email" => "antoine.hraoui@intalio.com",
                "role" => "ceo"
            ],
            [
                "firstname" => "Stephanie",
                "lastname" => "AZARIAN",
                "country" => "Lebanon",
                "currency" => "LBP",
                "email" => "stephanie.azarian@intalio.com",
                "role" => 'vp'
            ],
            [
                "firstname" => "Mazen",
                "lastname" => "FARAH",
                "country" => "Lebanon",
                "currency" => "LBP",
                "email" => "mazen.farah@intalio.com",
                "role" => 'presales_manager'
            ],
            [
                "firstname" => "Hussein",
                "lastname" => "ABDALLAH",
                "country" => "Qatar",
                "currency" => "QAR",
                "email" => "hussein.abdallah@intalio.com",
                "role" => "country_manager"
            ],
            [
                "firstname" => "Ali",
                "lastname" => "SHARARA",
                "country" => "Qatar",
                "currency" => "QAR",
                "email" => "a.sharara@everteam-gs.com",
                "role" => "country_manager"
            ],
            [
                "firstname" => "Bilal",
                "lastname" => "HMEDEH",
                "country" => "Saudi Arabia",
                "currency" => "SAR",
                "email" => "b.hmedeh@everteam-gs.com",
                "role" => "country_manager"
            ],
            [
                "firstname" => "George",
                "lastname" => "MAALOUF",
                "country" => "Saudi Arabia",
                "currency" => "SAR",
                "email" => "g.maalouf@everteam-gs.com",
                "role" => "country_manager"
            ],
            [
                "firstname" => "Rony",
                "lastname" => "HONEIN",
                "country" => "France",
                "currency" => "EUR",
                "email" => "rony.honein@intalio.com",
                "role" => "country_manager"
            ],
            [
                "firstname" => "Georges",
                "lastname" => "ZORBA",
                "country" => "United Arab Emirates",
                "currency" => "AED",
                "email" => "g.zorba@everteam-gs.com",
                "role" => "country_manager"
            ],
            [
                "firstname" => "mohamed",
                "lastname" => "KHACHEB",
                "country" => "Kuwait",
                "currency" => "USD",
                "email" => "mohamed.khachab@intalio.com"
            ],
            [
                "firstname" => "ehab",
                "lastname" => "KAMEL",
                "country" => "Saudi Arabia",
                "currency" => "SAR",
                "email" => "ehab.kamel@everteam-gs.com"
            ],
            [
                "firstname" => "safia",
                "lastname" => "ALMOZAINI",
                "country" => "Saudi Arabia",
                "currency" => "SAR",
                "email" => "safia.almozaini@everteam-gs.com"
            ],
            [
                "firstname" => "MarieTherese",
                "lastname" => "AMMOUN",
                "country" => "Qatar",
                "currency" => "QAR",
                "email" => "mt.ammoun@everteam-gs.com",
                "role" => 'sales_manager'
            ],
            [
                "firstname" => "mohamed",
                "lastname" => "KHACHAB",
                "country" => "Kuwait",
                "currency" => "USD",
                "email" => "mohamed.khachab@everteam-gs.com"
            ],
            [
                "firstname" => "mai",
                "lastname" => "ABDULLAH",
                "country" => "United Arab Emirates",
                "currency" => "AED",
                "email" => "mai.abdallah@intalio.com"
            ],
            [
                "firstname" => "ahmed",
                "lastname" => "NASSAR",
                "country" => "United Arab Emirates",
                "currency" => "AED",
                "email" => "ahmed.nassar@intalio.com"
            ],
            [
                "firstname" => "yasser",
                "lastname" => "ELMOUSRI",
                "country" => "Qatar",
                "currency" => "QAR",
                "email" => "yasser.elmoursi@everteam-gs.com"
            ],
            [
                "firstname" => "Ahmed",
                "lastname" => "SAAD",
                "country" => "Egypt",
                "currency" => "EGP",
                "email" => "ahmed.saad@dts-egypt.com"
            ],
            [
                "firstname" => "Yassine",
                "lastname" => "ARRAB",
                "country" => "Algeria",
                "currency" => "USD",
                "email" => "yassine.aarab@intalio.com"
            ],
            [
                "firstname" => "Amer",
                "lastname" => "ZAINALABDIN",
                "country" => "Saudi Arabia",
                "currency" => "SAR",
                "email" => "a.abdin@comptechco.com"
            ],
            [
                "firstname" => "Wissam",
                "lastname" => "ROUHANA",
                "country" => "Algeria",
                "currency" => "USD",
                "email" => "wissam.rouhana@intalio.com"
            ],
            [
                "firstname" => "Karim",
                "lastname" => "BADR",
                "country" => "Egypt",
                "currency" => "EGP",
                "email" => "k.badr@everteam-gs.com"
            ],
            [
                "firstname" => "Ramez",
                "lastname" => "ALKARA",
                "country" => "Egypt",
                "currency" => "EGP",
                "email" => "r.alkarra@everteam-gs.com"
            ],
            [
                "firstname" => "Hadi",
                "lastname" => "ABDALLAH",
                "country" => "France",
                "currency" => "EUR",
                "email" => "hadi.abdallah@intalio.com"
            ],
            [
                "firstname" => "Mamar",
                "lastname" => "MERABI",
                "country" => "France",
                "currency" => "EUR",
                "email" => "mmar.merabi@intalio.com"
            ],
            [
                "firstname" => "Georges",
                "lastname" => "ARAMOUNY",
                "country" => "France",
                "currency" => "EUR",
                "email" => "g.aramouny@everteam-gs.com"
            ],
            [
                "firstname" => "Roland",
                "lastname" => "SALAMEH",
                "country" => "Lebanon",
                "currency" => "USD",
                "email" => "roland.salameh@intalio.com"
            ],
            [
                "firstname" => "Jean-Pierre",
                "lastname" => "LA-HAUSSE-DE-LALOUVIERE",
                "country" => "Mauritius",
                "currency" => "USD",
                "email" => "jp.delalouviere@intalio.com"
            ],
            [
                "firstname" => "Yassine",
                "lastname" => "ABOU-KADRI",
                "country" => "Morocco",
                "currency" => "USD",
                "email" => "yassine.aboukadri@intalio.com"
            ],
            [
                "firstname" => "Maram",
                "lastname" => "HUSSEIN",
                "country" => "Qatar",
                "currency" => "QAR",
                "email" => "m.hussein@everteam-gs.com"
            ],

            [
                "firstname" => "Hussein",
                "lastname" => "CHOKR",
                "country" => "Qatar",
                "currency" => "QAR",
                "email" => "h.chokr@everteam-gs.com"
            ],

            [
                "firstname" => "Adeel",
                "lastname" => "RAHMAN",
                "country" => "United Arab Emirates",
                "currency" => "AED",
                "email" => "a.rahman@everteam-gs.com"
            ],
            [
                "firstname" => "Karl",
                "lastname" => "MELKI",
                "country" => "Lebanon",
                "currency" => "USD",
                "email" => "k.melki@everteam-gs.com"
            ],
            [
                "firstname" => "Samer",
                "lastname" => "HOBEIKA",
                "country" => "Lebanon",
                "currency" => "USD",
                "email" => "s.hobeika@everteam-gs.com"
            ],
            [
                "firstname" => "Salam",
                "lastname" => "EID",
                "country" => "Kuwait",
                "currency" => "USD",
                "email" => "salam.eid@worldtek.co"
            ],

            [
                "firstname" => "Zeina",
                "lastname" => "ATRISSI",
                "country" => "Saudi Arabia",
                "currency" => "SAR",
                "email" => "z.atrissi@everteam-gs.com"
            ],
            [
                "firstname" => "Mansour",
                "lastname" => "HOBEIKA",
                "country" => "Ghana",
                "currency" => "GHS",
                "email" => "mansour.hobeika@intalio.com"
            ],

            [
                "firstname" => "Rita",
                "lastname" => "JAWHAR",
                "country" => "Qatar",
                "currency" => "QAR",
                "email" => "r.jawhar@everteam-gs.com"
            ],
            [
                "firstname" => "Wasfi",
                "lastname" => "ELLOUZE",
                "country" => "France",
                "currency" => "EUR",
                "email" => "wasfi.ellouze@intalio.com"
            ],
            [
                "firstname" => "Mohammad",
                "lastname" => "HASSAN",
                "country" => "Lebanon",
                "currency" => "USD",
                "email" => "m.hassan@everteam-gs.com"
            ],
            [
                "firstname" => "Karim",
                "lastname" => "THOMAS",
                "country" => "Qatar",
                "currency" => "QAR",
                "email" => "k.thomas@everteam-gs.com"
            ],
            [
                "firstname" => "Lara",
                "lastname" => "KANAAN",
                "country" => "Lebanon",
                "currency" => "LBP",
                "email" => "l.kanaan@everteam-gs.com"
            ],
            [
                "firstname" => "Mohammed",
                "lastname" => "Alkhamis",
                "country" => "Saudi Arabia",
                "currency" => "SAR",
                "email" => "m.Alkhamis@everteam-gs.com"
            ]
        ];

        $pass =  bcrypt('123456');
        $env = $args->getParameterOption(['env']); // Can be stg or prod
        dump($env);

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
            $user->role = $role->id;

            if ($env == 'stg') {
                // $item['password'] = $pass;
                $generatedPassword = $this->randomPassword();
                $user->position =  $generatedPassword;
                $item['password'] = bcrypt($generatedPassword);
            } else {
                $generatedPassword = $this->randomPassword();
                $user->position =  $generatedPassword;
                $item['password'] = bcrypt($generatedPassword);
            }
            $user->password =  $item['password'];

            $branch = Branch::where('name', $item['country'])->first();
            if ($branch) {
                $user->branch_id = $branch->id;
            } else {
                $user->branch_id = null;
            }

            $user->save();

            if ($env == 'prod') {
                MailHelper::sendAccountCreatedEmail($user, $generatedPassword);
            }
        }
        return $args;
    }

    private function randomPassword()
    {
        $alphabet = "abcdefghijklmnopqrstuwxyz0123456789";
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 8; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
    }
}
