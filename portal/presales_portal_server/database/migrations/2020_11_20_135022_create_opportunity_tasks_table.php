<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOpportunityTasksTable extends Migration
{

    public function up()
    {
        Schema::create('opportunity_tasks', function (Blueprint $table) {

            $table->id();

            $table->integer('order')->nullable(true);
            $table->text('title')->nullable(true);
            $table->string('priority')->nullable(true);
            $table->string('type')->nullable(true);
            $table->date('dueDate')->nullable(true);
            $table->boolean('completed')->nullable(true)->default(0);
            $table->text('notes')->nullable(true);

            $table->unsignedBigInteger('opportunity_id')->nullable(true);
            $table->unsignedBigInteger('created_by')->nullable(true); //user create task
            $table->unsignedBigInteger('assigned_to')->nullable(true); //user task created to

            $table->timestamps();

            $table->foreign('opportunity_id')->references('id')->on('opportunities');
            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('assigned_to')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('opportunity_tasks');
    }
    
}
