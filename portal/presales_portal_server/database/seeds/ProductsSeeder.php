<?php

use App\Product;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $product_1 = new Product();
        $product_1->name = "CTS";
        $product_1->save();

        $product_2 = new Product();
        $product_2->name = "Case";
        $product_2->save();

    }
}
