<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name')->nullable(true);
            $table->string('last_name')->nullable(true);
            $table->string('position')->nullable(true);
            $table->string('contact_number')->nullable(true);
            $table->string('role')->nullable(true);
            $table->boolean('is_active')->default(true); 
            $table->boolean('new_opportunity_notification_enabled')->default(false);

            $table->unsignedBigInteger('reporting_to')->nullable(true);
            $table->unsignedBigInteger('branch_id')->nullable(true);

            // $table->unsignedBigInteger('executive_manager_id')->nullable(true); // manage countries
            // $table->unsignedBigInteger('country_manager_id')->nullable(true); // manage countries
            // $table->unsignedBigInteger('sales_manager_id')->nullable(true); // manage countries
            
            $table->foreign('branch_id')->references('id')->on('branches');
            $table->foreign('reporting_to')->references('id')->on('users');
            
            // $table->foreign('executive_manager_id')->references('id')->on('users');
            // $table->foreign('country_manager_id')->references('id')->on('users');
            // $table->foreign('sales_manager_id')->references('id')->on('users');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('first_name');
            $table->dropColumn('last_name');
            $table->dropColumn('position');
            $table->dropColumn('contact_number');
            $table->dropColumn('role');
        });
    }
}
