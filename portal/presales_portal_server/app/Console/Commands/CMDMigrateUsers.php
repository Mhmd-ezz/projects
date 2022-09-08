<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use database\seeds\MigrateUsersSeeder;

class CMDMigrateUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:CMDMigrateUsers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Migrate users to the database=>');
        if ($this->confirm('Do you wish to continue? [y|n]')) {
            if ($this->confirm('Migrating to Production env? [y|n]')) {
                $this->call(MigrateUsersSeeder::class,['env' => 'prod']);
            } else {
                $this->call(MigrateUsersSeeder::class,['env' => 'stg']);
            }
        }
        return 0;
    }
}
