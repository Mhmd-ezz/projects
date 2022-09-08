<?php

use App\Branch;
use Illuminate\Database\Seeder;

class BranchesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $branch = new Branch();
        // $branch->id = 100;
        $branch->name = "Ghana";
        $branch->country_code = "GH";
        $branch->currency_code = "GHS";
        $branch->save();

        $branch = new Branch();
        // $branch->id = 101;
        $branch->name = "Morocco";
        $branch->country_code = "MA";
        $branch->currency_code = "MAD";
        $branch->save();

        $branch = new Branch();
        // $branch->id = 102;
        $branch->name = "Algeria";
        $branch->country_code = "DZ";
        $branch->currency_code = "DZD";
        $branch->save();

        $branch = new Branch();
        // $branch->id = 103;
        $branch->name = "Egypt";
        $branch->country_code = "EG";
        $branch->currency_code = "EGP";
        $branch->save();

        $branch = new Branch();
        // $branch->id = 104;
        $branch->name = "Kuwait";
        $branch->country_code = "KW";
        $branch->currency_code = "KWD";
        $branch->save();

        $branch = new Branch();
        // $branch->id = 105;
        $branch->name = "United Arab Emirates";
        $branch->country_code = "AE";
        $branch->currency_code = "AED";
        $branch->save();

        $branch = new Branch();
        // $branch->id = 106;
        $branch->name = "France";
        $branch->country_code = "FR";
        $branch->currency_code = "EUR";
        $branch->save();

        $branch = new Branch();
        // $branch->id = 107;
        $branch->name = "Saudi Arabia";
        $branch->country_code = "SA";
        $branch->currency_code = "SAR";
        $branch->save();

        $branch = new Branch();
        // $branch->id = 108;
        $branch->name = "Lebanon";
        $branch->country_code = "LB";
        $branch->currency_code = "LBP";
        $branch->save();

        $branch = new Branch();
        // $branch->id = 109;
        $branch->name = "Qatar";
        $branch->country_code = "QA";
        $branch->currency_code = "QAR";
        $branch->save();
        
    }
}
