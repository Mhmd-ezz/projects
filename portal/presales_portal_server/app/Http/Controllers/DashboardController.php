<?php

namespace App\Http\Controllers;

use App\User;
use stdClass;
use Carbon\Carbon;
use App\Opportunity;
use App\OpportunityTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\OpportunityResource;

class DashboardController extends Controller
{

    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => '']);
    }

    function get(Request $request)
    {

        $user = User::find(Auth::user()->id);
        $user_roles = $user->getRoleNames();
        $user_role = $user_roles[0];

        // $from = date('Y-m-d', strtotime("-355 days"));
        $nextTenDays = date('Y-m-d', strtotime("+10 days"));
        $firstDayOfYear = date('Y-01-01');
        $today = date('Y-m-d');
        $from = $request->from;
        $to = $request->to;
        // $monthFrom = $request->monthFrom;
        // $monthTo = $request->monthTo;
        $monthFrom = $request->from;
        $monthTo = $request->to;
        $lastWorkingDay = $this->getLastWorkingDate($today);
        // -----------------------
        // Stats
        // -----------------------
        // $oppsStats = Opportunity::where('submission_date', '<=', $to)->where('submission_date', '>=', $from)
        //     // ->leftJoin('opportunity_tasks', 'opportunities.id', '=', 'opportunity_tasks.opportunity_id')
        //     ->select('opportunities.*', 'opportunity_tasks.*')
        //     ->select(array(
        //         DB::raw('IFNULL(SUM(rfp_status = "inprogress"),0) as inprogress'),
        //         // DB::raw('IFNULL(SUM(rfp_status = "submitted"),0) as submitted'),
        //         // DB::raw('IFNULL(SUM(status = "pending"),0) as pending'),
        //         // DB::raw('IFNULL(SUM(status = "lost"),0) as lost'),
        //         // DB::raw('IFNULL(SUM(status = "won"),0) as won'),
        //         // DB::raw('IFNULL(SUM(status = "cancelled"),0) as cancelled'),
        //     ),)
        //     ->get();
        $unassigned = Opportunity::
            where('rfp_status', '=', 'inprogress')
            ->where(function ($query) use ($user_role) {
                if (!empty($user_role) && $user_role == "executive_manager" || $user_role == "sales_manager")
                    $query->where('branch_id', Auth::user()->branch_id);
            })
            ->doesntHave('tasks')
            ->orWhereHas('tasks', function ($q) {
                $q->where('assigned_to', '=', NULL);
            })
            ->addSelect(DB::raw('IFNULL(count( Distinct id),0) as unassigned'))
            ->get();

        
            $oppStats = Opportunity::
            where(function ($query) use ($user_role) {
                if (!empty($user_role) && $user_role == "executive_manager" || $user_role == "sales_manager")
                    $query->where('branch_id', Auth::user()->branch_id);
            })
            // where('submission_date', '<=', $monthTo)
            //     ->where('submission_date', '>=', $monthFrom)
            // ->select('opportunities.rfp_status')
            ->select(array(
                DB::raw('IFNULL(SUM(submission_date >= "' . $monthFrom . '" AND submission_date <= "' . $monthTo . '" AND rfp_status = "inprogress"),0) as inprogress'),
                DB::raw('IFNULL(SUM(submission_date >= "' . $today . '" AND submission_date <= "' . $nextTenDays . '" AND rfp_status = "inprogress"),0) as nextTenDays'),
                DB::raw('IFNULL(SUM(submission_date >= "' . $today . '" AND rfp_status = "inprogress"),0) as overDue'),

                DB::raw('IFNULL(SUM(submission_date >= "' . $firstDayOfYear . '" AND rfp_status = "inprogress"),0) as yearlyInprogress'),
                DB::raw('IFNULL(SUM(submission_date >= "' . $firstDayOfYear . '" AND rfp_status = "submitted"),0) as yearlySubmitted'),
                DB::raw('IFNULL(SUM(submission_date >= "' . $firstDayOfYear . '" AND status = "pending"),0) as yearlyPending'),
                DB::raw('IFNULL(SUM(submission_date >= "' . $firstDayOfYear . '" AND status = "lost"),0) as yearlyLost'),
                DB::raw('IFNULL(SUM(submission_date >= "' . $firstDayOfYear . '" AND status = "won"),0) as yearlyWon'),
                DB::raw('IFNULL(SUM(submission_date >= "' . $firstDayOfYear . '" AND status = "cancelled"),0) as yearlyCancelled'),

                DB::raw('IFNULL(SUM(submission_date >= "' . $firstDayOfYear . '" AND category = "proposal"),0) as yearlyProposal'),
                DB::raw('IFNULL(SUM(submission_date >= "' . $firstDayOfYear . '" AND category = "demo"),0) as yearlyDemo'),
                DB::raw('IFNULL(SUM(submission_date >= "' . $firstDayOfYear . '" AND category = "rfp writing"),0) as yearlyRfpWriting'),
                DB::raw('IFNULL(SUM(submission_date >= "' . $firstDayOfYear . '" AND category = "presentation"),0) as yearlyPresentation'),


            ),)
            ->get();

        // @ Tasks Stats
        // $tasksStats = OpportunityTask::
        //     where('dueDate', '>=', $firstDayOfYear)
        //     // where('dueDate', '>=', $from)
        //     // ->addSelect(DB::raw('IFNULL(SUM(completed = 0),0) as dueTasks')) // due tasks
        //     // ->addSelect(DB::raw('IFNULL(SUM(dueDate < "' . $today . '" AND completed = 0),0) as highPriorityTasks')) // high Priority tasks

        //     // ->addSelect(DB::raw('IFNULL(SUM(dueDate < "' . $today . '" AND completed = 0),0) as overDueTasks')) // overdue tasks
        //     // ->addSelect(DB::raw('IFNULL(SUM(dueDate = "' . $lastWorkingDay . '" AND completed = 1),0) as completed')) // yesterday completed tasks 

        //     // ->addSelect(DB::raw('IFNULL(SUM(dueDate = "' . $today . '" AND completed = 1),0) as completedTodayTasks')) // Today completed  Tasks
        //     // ->addSelect(DB::raw('IFNULL(SUM(dueDate = "' . $today . '" AND completed = 0),0) as toDeliverTodayTasks')) // deliver today tasks

        //     ->addSelect(DB::raw('IFNULL(SUM(assigned_to IS NULL AND completed = 0),0) as unassignedTasks')) // unassigned Tasks
        //     // ->addSelect(DB::raw('IFNULL(SUM(assigned_to IS NOT NULL AND completed = 0),0) as assignedTasks')) // assigned Tasks
        //     ->get();

        $usersTasks = User::where(function ($query) {
            $query->whereHas('roles',  function ($q) {
                $roles = ['presales_consultant', 'presales_manager'];
                $q->whereIn('name', $roles);
            });
        })
            ->leftJoin('opportunity_tasks as tasks', 'tasks.assigned_to', '=', 'users.id')
            ->leftJoin('opportunities as opps', 'opps.id', '=', 'tasks.opportunity_id')
            ->leftJoin('branches as br', 'br.id', '=', 'opps.branch_id')
            ->leftJoin('clients as c', 'c.id', '=', 'opps.client_id')
            ->where(function ($query) use ($user_role) {
                if (!empty($user_role) && $user_role == "executive_manager" || $user_role == "sales_manager")
                    $query->where('opps.branch_id', Auth::user()->branch_id);
            })
            ->select(
                'users.*',
                'tasks.id as task_id',
                'tasks.completed as task_completed',
                'tasks.priority as task_priority',
                'tasks.dueDate as task_dueDate',
                'tasks.title as task_title',
                'tasks.opportunity_id as task_opportunity_id',
                'tasks.assigned_to as task_assigned_to',
                'tasks.updated_at as task_updated_at',
                'tasks.created_at as task_created_at',
                'opps.client_id as opp_client_id',
                'opps.rfp_status as opp_rfp_status',
                'c.name as opp_client_name',
                'c.country_code as opp_country_code',
                'br.country_code as br_country_code',
            )
            ->where('opps.rfp_status', '=', 'inprogress')
            // ->with('opportunityTasks.opportunity')

            ->get();

        // -----------------------
        // To be delivered
        // -----------------------
        $toBeDelivered = $this->getToBeDeliveredSQl($from, $to, $user_role);
        // $toBeDelivered = OpportunityResource::collection($toBeDelivered);

        // -----------------------
        // Demos
        // -----------------------
        $demos = $this->getDemosSQl($from, $to, $user_role);
        // $demos = OpportunityResource::collection($demos);

        // -----------------------
        // Users Tasks
        // -----------------------
        $res = json_decode('{}', true);
        foreach ($usersTasks as $key => $value) {
            $userId = $usersTasks[$key]['id'];
            if (!isset($res[$userId])) {
                $user = new stdClass;
                $user->id = $usersTasks[$key]->id;
                $user->name = $usersTasks[$key]->name;
                $user->email = $usersTasks[$key]->email;
                $user->first_name = $usersTasks[$key]->first_name;
                $user->last_name = $usersTasks[$key]->last_name;
                $user->tasks = [];
                $res[$userId] = $user;
            }
            if (!empty($usersTasks[$key]['task_id']) && isset($usersTasks[$key]['task_id'])) {
                $task = new stdClass;
                $task->id = $usersTasks[$key]->task_id;
                $task->completed = $usersTasks[$key]->task_completed;
                $task->priority = $usersTasks[$key]->task_priority;
                $task->title = $usersTasks[$key]->task_title;
                $task->dueDate = $usersTasks[$key]->task_dueDate;
                $task->opportunity_id = $usersTasks[$key]->task_opportunity_id;
                $task->opp_client_id = $usersTasks[$key]->opp_client_id;
                $task->opp_client_name = $usersTasks[$key]->opp_client_name;
                $task->opp_country_code = $usersTasks[$key]->opp_country_code;
                $task->br_country_code = $usersTasks[$key]->br_country_code;
                $task->assigned_to = $usersTasks[$key]->task_assigned_to;
                $task->completed = $usersTasks[$key]->task_completed;
                $task->updated_at = $usersTasks[$key]->task_updated_at;
                array_push($res[$userId]->tasks, $task);
            }
        }

        $result = new stdClass;
        // $result->oppsStats = $oppsStats[0];
        $result->stats = $oppStats[0];
        $unassigned_ = $unassigned[0]->unassigned;
        $result->stats->unassigned = $unassigned_;
        // $result->tasksStats = $tasksStats[0];

        $result->toBeDelivered = $toBeDelivered;
        $result->demos = $demos;
        $result->usersTasks = $res;

        return response()->json(['data' => $result], 200);

        // return $result;
    }
    function getDemos(Request $request)
    {
        $demos = $this->getDemosSQl($request->from, $request->to);
        $demos = OpportunityResource::collection($demos);
        return response()->json(['data' => $demos], 200);
    }

    function getToBeDelivered(Request $request)
    {
        $toBeDelivered = $this->getToBeDeliveredSQl($request->from, $request->to);
        // $toBeDelivered = OpportunityResource::collection($toBeDelivered);
        return response()->json(['data' => $toBeDelivered], 200);
    }

    private function getLastWorkingDate($date)
    {
        $exit = false;
        $result = null;
        $date_ = $date;
        while ($exit == false) {
            $date_ = Carbon::parse($date_)->subDays(1);
            $weekMap = [
                0 => 'SU',
                1 => 'MO',
                2 => 'TU',
                3 => 'WE',
                4 => 'TH',
                5 => 'FR',
                6 => 'SA',
            ];
            $dayOfTheWeek = Carbon::parse($date_)->dayOfWeek;
            $weekday = $weekMap[$dayOfTheWeek];

            if ($weekday == 'SU' || $weekday == 'SA') {
            } else {
                $result = $date_;
                $exit = true;
            }
        }
        return $result->format('Y-m-d');
    }
    private function getToBeDeliveredSQl($from, $to, $user_role = null)
    {
        $dataset = opportunity::with('client')
            ->with('user')
            ->with('branch')
            ->with('tasks.assignedTo')
            ->where(function ($query) use ($user_role) {
                if (!empty($user_role) && $user_role == "executive_manager" || $user_role == "sales_manager")
                    $query->where('branch_id', Auth::user()->branch_id);
            })
            ->where('submission_date', '<=', $to)
            ->where('submission_date', '>=', $from)
            // ->whereIn('category', ['proposal', 'rfp writing', 'presentation'])
            ->where('rfp_status', '=', 'inprogress')
            ->get();

        return $dataset;
    }
    private function getDemosSQl($from, $to, $user_role = null)
    {
        $demos = opportunity::with('client')
            ->with('user')
            ->with('branch')
            ->where(function ($query) use ($user_role) {
                if (!empty($user_role) && $user_role == "executive_manager" || $user_role == "sales_manager")
                    $query->where('branch_id', Auth::user()->branch_id);
            })
            ->where('demo_date', '<=', $to)
            ->where('demo_date', '>=', $from)
            ->where('category', '=', 'Demo')
            ->where('rfp_status', '=', 'inprogress')
            ->get();

        return $demos;
    }
}
