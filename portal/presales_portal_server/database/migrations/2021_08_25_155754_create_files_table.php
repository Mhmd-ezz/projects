<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {

            $table->id();
            $table->text('name')->nullable();
            $table->text('original_name')->nullable();
            $table->text('type')->nullable();
            $table->timestamps();
            
            // REL
            $table->unsignedBigInteger('user_id')->nullable(true);
            $table->unsignedBigInteger('opportunity_id')->nullable(true);

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('opportunity_id')->references('id')->on('opportunities')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('files');
    }
}
