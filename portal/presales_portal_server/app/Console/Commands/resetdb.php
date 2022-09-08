<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class resetdb extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'custom:resetdb';

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
        $this->info('Reset Database=>');
        if ($this->confirm('Do you wish to continue? [yes|no]'))
        {

            $this->call('migrate:reset');
            $this->call('migrate');
            // $this->call('db:seed',['--class' => 'UserSeeder']);
            // $this->call('db:seed',['--class' => 'PatientSeeder']);
        }
        return 0;
    }
}
