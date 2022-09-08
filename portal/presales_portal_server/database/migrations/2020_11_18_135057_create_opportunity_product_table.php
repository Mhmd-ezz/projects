<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOpportunityProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('opportunity_product', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('opportunity_id');
            $table->unsignedBigInteger('product_id');

            $table->timestamps();

            $table->foreign('opportunity_id')->references('id')->on('opportunities');
            $table->foreign('product_id')->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('opportunity_product');
    }
}
