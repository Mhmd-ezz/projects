<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOpportunityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('opportunities', function (Blueprint $table) {
            $table->id();

            // REL
            $table->unsignedBigInteger('user_id')->nullable(true);
            $table->unsignedBigInteger('client_id')->nullable(true);
            $table->unsignedBigInteger('branch_id')->nullable(true);
            $table->unsignedBigInteger('executive_manager_id')->nullable(true);
            $table->unsignedBigInteger('country_manager_id')->nullable(true);
            $table->unsignedBigInteger('sales_manager_id')->nullable(true);

            // SCALAR
            $table->timestamp('release_date')->nullable(true);
            $table->timestamp('submission_date')->nullable(true);
            $table->timestamp('subsidiary_date')->nullable(true);
            $table->text('description')->nullable(true);
            $table->text('observation')->nullable(true);
            $table->string('external_resources')->nullable(true); //ex: links
            $table->string('duration')->nullable(true); //text
            $table->string('required_technology')->nullable(true); //the product
            $table->string('winning_chance')->nullable(true);
            $table->string('learned')->nullable(true); //how the client know the company
            $table->string('competitors')->nullable(true);
            $table->string('budget')->nullable(true);
            $table->string('currency_code')->nullable(true);
            $table->string('submission_type')->nullable(true);

            $table->string('contact_name')->nullable(true);
            $table->string('contact_title')->nullable(true);
            $table->string('contact_email')->nullable(true);
            $table->string('contact_number')->nullable(true);

            // @ SUBMISSION
            $table->string('department_action')->nullable(true); //??
            $table->string('department_manager_action')->nullable(true);
            $table->timestamp('reminder_date')->nullable(true);
            $table->string('status')->nullable(true); // [won,lost,pending, cancelled, retender]
            $table->string('rfp_status')->nullable(true); // [ inprogress, submitted, no_go]
            $table->string('proposed_value')->nullable(true);
            $table->string('awarded_amount')->nullable(true);

            $table->string('category')->nullable(true); //[Proposal , Demo , Rfp writing , Presentation]
            $table->timestamp('demo_date')->nullable(true);
            $table->string('solution')->nullable(true); // Product ,Product initiative,  Presales solution,  Portal intranet, Portal internet, Digital transformation

            // @ INDEX
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('executive_manager_id')->references('id')->on('users');
            $table->foreign('country_manager_id')->references('id')->on('users');
            $table->foreign('sales_manager_id')->references('id')->on('users');
            $table->foreign('client_id')->references('id')->on('clients');
            $table->foreign('branch_id')->references('id')->on('branches');

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
        Schema::dropIfExists('opportunities');
    }
}
