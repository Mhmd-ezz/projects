<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use App\OpportunityTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\OpportunityTaskResource;

class TasksController extends Controller
{

    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => '']);
    }
    
    public function get(OpportunityTask $task)
    {
        return new OpportunityTaskResource($task);
    }


    public function list(Request $request)
    {
        // $user = User::find(Auth::user()->id);
        // $userId = Auth::user()->id;
       
        // return 'done';
        $limit = !empty($request->limit) ? $request->limit : 10;

        $dueDate = !empty($request->dueDate) ? Carbon::parse($request->dueDate) : [];

        $created_by = !empty($request->created_by) ? $request->created_by : [];

        $assigned_to = !empty($request->assigned_to) ? $request->assigned_to : [];
        $priority = !empty($request->priority) ? $request->priority : null;
        $completed = !empty($request->completed) ? $request->completed : null;

        $opportunity_id = !empty($request->opportunity_id) ? explode(',', $request->opportunity_id) : [];

        // @ sortBy: string
        $sortBy =  !empty($request->sortBy) ? $request->sortBy : 'id';

        // @ descending: Boolean
        $descending =  json_decode($request->descending)  ? "DESC" : 'ASC';

        DB::enableQueryLog();

        // $records = Opportunity::orderby($sortBy, $descending)
        $records = OpportunityTask
            ::with('createdBy')
            ->with('assignedTo')
            ->with('opportunity')

            ->where(function ($query) use ($request) {
                if (!empty($request->filter))
                    $query
                        ->where('title', 'like', '%' . $request->filter  . '%')
                        ->where('notes', 'like', '%' . $request->filter  . '%');
            })

            // @ dueDate
            ->where(function ($q) use ($dueDate) {
                if (!empty($dueDate))
                    $q->whereDate('dueDate', '>=', $dueDate);
            })

            // @ created_by
            ->where(function ($q) use ($created_by) {
                if (!empty($created_by))
                    $q->whereIn('created_by', $created_by);
            })

            // @ assigned_to
            ->where(function ($q) use ($assigned_to) {
                if (!empty($assigned_to))
                    $q->whereDate('assigned_to', '>=', $assigned_to);
            })

            // @ priority
            ->where(function ($q) use ($priority) {
                if (!empty($priority))
                    $q->whereDate('priority', '>=', $priority);
            })

            // @ priority
            ->where(function ($q) use ($completed) {
                if (!empty($completed))
                    $q->whereDate('completed', '>=', $completed);
            })

            ->where(function ($query) use ($opportunity_id) {
                if (!empty($opportunity_id))
                    $query->whereHas('opportunity',  function ($q) use ($opportunity_id) {
                        $q->whereIn('opportunity_id', $opportunity_id);
                    });
            });
            

        if ($sortBy == 'opportunity') {
            $records = $records->with(['opportunity' => function ($query) use ($descending) {
                $query->orderBy('id', $descending);
            }]);
        } else if ($sortBy == 'user') {
            $records = $records->with(['user' => function ($query) use ($descending) {
                $query->orderBy('name', $descending);
            }]);
        }  else {
            $records = $records->orderby($sortBy, $descending);
        }
    
        $records = $records->paginate($limit);

        return OpportunityTaskResource::collection($records);

    }


    public function create(CreateTaskRequest $request)
    {

        //------------------------------------------
        // Prepare Opportunity Task
        //------------------------------------------
        $task = new OpportunityTask();

        $task->created_by = Auth::user()->id;
        $task->order = $request->order;
        $task->title = $request->title;
        $task->priority = $request->priority;
        $task->type = $request->type;
        $task->dueDate = $request->dueDate;
        $task->completed = $request->completed;
        $task->notes = $request->notes;
        $task->opportunity_id = $request->opportunity_id;
        $task->assigned_to = $request->assigned_to;

        // $user = User::find(Auth::user()->id);
        // $is_presales_admin = $user->isPresalesManager($user);
        // if ($is_presales_admin) {
        //     $task->department_manager_action = $request->department_manager_action;
        //     $task->reminder_date = $request->reminder_date;
        //     $task->proposed_value = $request->proposed_value;
        //     $task->awarded_amount = $request->awarded_amount;
        //     $task->status = $request->status;
        //     $task->rfp_status = $request->rfp_status;
        // }

        $task->save();

        return new OpportunityTaskResource($task);
    }


    public function update(UpdateTaskRequest $request)
    {
        $task = OpportunityTask::find($request->id);
        
        $task->created_by = $request->created_by;
        $task->order = $request->order;
        $task->title = $request->title;
        $task->priority = $request->priority;
        $task->type = $request->type;
        $task->dueDate = $request->dueDate;
        $task->completed = $request->completed;
        $task->notes = $request->notes;
        $task->opportunity_id = $request->opportunity_id;
        $task->assigned_to = $request->assigned_to;

        //------------------------------------------
        // Updating manager props 
        //------------------------------------------
        // $user = User::find(Auth::user()->id);
        // $is_presales_dmin = $user->isPresalesManager($user);
        // if ($is_presales_dmin) {
        //     $task->department_manager_action = $request->department_manager_action;
        //     $task->reminder_date = $request->reminder_date;
        //     $task->proposed_value = $request->proposed_value;
        //     $task->awarded_amount = $request->awarded_amount;
        //     $task->status = $request->status;
        //     $task->rfp_status = $request->rfp_status;
        // }

        $task->save();

        return new OpportunityTaskResource($task);
    }


    public function delete(OpportunityTask $task)
    {
        $task->delete();
        // OpportunityTask::destroy($task->id);

        return response()->json(['message' => "Task deleted."], 200);
    }


    // public function upload(Request $request)
    // {
    //     try {

    //         $validator = Validator::make($request->all(), [
    //             'file' => 'required|file',
    //             'opportunity_id' => 'required',
    //         ]);

    //         if ($validator->fails()) {
    //             return response()->json(['error' => $validator->errors()], 400);
    //         }

    //         $original_name =  $request->name;
    //         $type =  $request->type;
    //         $opportunity_id = $request->opportunity_id;
    //         $file = $request->file('file');
    //         $ext  = $file->extension();
    //         $filename = Uuid::generate()->string; 
    //         $name = $filename . "." . $ext;

    //         Storage::putFileAs(
    //             'public/files',
    //             $file,
    //             $name
    //         );

    //         $file = new File();
    //         $file->name = $name;
    //         $file->original_name = $original_name;
    //         $file->opportunity_id = $opportunity_id;
    //         $file->type = $type;

    //         $file->save();
    //     } catch (\Throwable $th) {
    //         return $th->getMessage();
    //     }
    //     return $request;
    //     return response()->json(['message' => "uploaded."], 201);
    // }


}
