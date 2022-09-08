<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(true);
            $table->string('country_code')->nullable(true);
            $table->string('email')->nullable(true);
            $table->string('contact_number')->nullable(true);
            $table->string('size')->nullable(true); //small, medium, large
            $table->string('number_employees')->nullable(true);
            $table->string('industry')->nullable(true);
            $table->string('abbreviation')->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clients');
    }
}
