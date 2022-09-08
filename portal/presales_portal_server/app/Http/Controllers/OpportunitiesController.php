<?php

namespace App\Http\Controllers;

use App\File;
use App\User;
use App\Branch;
use Carbon\Carbon;
use App\Opportunity;
use App\OpportunityTask;
use Webpatser\Uuid\Uuid;
use App\Helpers\MailHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\App;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\OpportunityResource;
use App\Http\Resources\OpportunityCsvResource;
use App\Http\Requests\CreateOpportunityRequest;
use App\Http\Requests\UpdateOpportunityRequest;
use App\Http\Resources\OpportunityTaskResource;

class OpportunitiesController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => 'upload']);
        // Auth::user();
    }

    public function get(Opportunity $opp)
    {
        return new OpportunityResource($opp);
    }

    public function list(Request $request)
    {

        // $user = User::find(426); //for local test
        $user = User::find(Auth::user()->id);

        $user_roles = $user->getRoleNames();
        $user_role = $user_roles[0];
        // $user_branch_id = $user->branch_id; for local test ++ change user auth in query

        if ($user_role == "executive_manager" || $user_role == "sales_manager") {
            // @ if user role match one of these roles
            // @ then user branch should match opportunity 

            // DB::enableQueryLog();
            // dd(DB::getQueryLog());

            // @ page: string
            // @ By default paginator will intercept the request and handle page number

            // @ limit: string
            $limit = !empty($request->limit) ? $request->limit : 10;

            $releaseFrom = !empty($request->release_from) ? Carbon::parse($request->release_from) : null;
            $releaseTo = !empty($request->release_to) ? Carbon::parse($request->release_to) : null;

            $submissionFrom = !empty($request->submission_from) ? Carbon::parse($request->submission_from)->toDateString() : null;
            $submissionTo = !empty($request->submission_to) ? Carbon::parse($request->submission_to)->toDateString() : null;

            // @ sortBy: string
            $sortBy =  !empty($request->sortBy) ? $request->sortBy : 'id';

            $user_id = !empty($request->user_id) ? explode(',', $request->user_id) : [];
            $branch_id = !empty($request->branch_id) ? explode(',', $request->branch_id) : [];
            $tasks_users = !empty($request->tasks_users) ? explode(',', $request->tasks_users) : [];

            $status = !empty($request->status) ? explode(',', $request->status) : [];
            $rfp_status = !empty($request->rfp_status) ? explode(',', $request->rfp_status) : [];
            $category = !empty($request->category) ? explode(',', $request->category) : [];

            // @ descending: Boolean
            $descending =  json_decode($request->descending)  ? "DESC" : 'ASC';

            // DB::enableQueryLog();

            // $records = Opportunity::orderby($sortBy, $descending)
            $records = Opportunity
                ::with('tasks')
                ->with('files')
                ->with('user')
                ->with('client')
                ->with('branch')
                ->with('country_manager')
                ->with('executive_manager')

                ->where('branch_id', Auth::user()->branch_id)

                ->where(function ($query) use ($tasks_users) {
                    if (!empty($tasks_users))
                        $query->whereHas('tasks',  function ($q) use ($tasks_users) {
                            $q->whereIn('opportunity_tasks.assigned_to', $tasks_users);
                        });
                })

                ->where(function ($query) use ($branch_id) {
                    if (!empty($branch_id))
                        $query->whereHas('branch',  function ($q) use ($branch_id) {
                            $q->whereIn('opportunities.branch_id', $branch_id);
                        });
                })

                ->where(function ($query) use ($request) {
                    if (!empty($request->filter))
                        $query
                            ->where('description', 'like', '%' . $request->filter  . '%')
                            ->orWhere('observation', 'like', '%' . $request->filter  . '%')
                            ->orWhere('contact_name', 'like', '%' . $request->filter  . '%')
                            ->orWhere('rfp_status', 'like', '%' . $request->filter  . '%')
                            ->orWhere('status', 'like', '%' . $request->filter  . '%')
                            ->orWhere('required_technology', 'like', '%' . $request->filter  . '%')
                            ->orWhere('winning_chance', 'like', '%' . $request->filter  . '%')
                            ->orWhereHas('client', function ($q) use ($request) {
                                $q->where('name', 'LIKE', '%' . $request->filter . '%');
                            });
                    if (!empty($request->filter) && str_starts_with(strtolower($request->filter), 'p-')) {
                        $query->orWhere('id', '=',  substr($request->filter, 2));
                    }
                })

                // @ winning_chance & rfp_status
                // ->where(function ($query) use ($request) {
                //     if (!empty($request->chanceFilter))
                //         $query->where('winning_chance', '=',  $request->chanceFilter);

                //     if (!empty($request->rfp_status))
                //         $query->where('rfp_status', '=', $request->rfp_status);
                // })

                // @ status
                ->where(function ($q) use ($status) {
                    if (!empty($status))
                        $q->whereIn('opportunities.status',  $status);
                })

                // @ rfp_status
                ->where(function ($q) use ($rfp_status) {
                    if (!empty($rfp_status))
                        $q->whereIn('opportunities.rfp_status',  $rfp_status);
                })

                ->where(function ($q) use ($category) {
                    if (!empty($category))
                        $q->whereIn('opportunities.category',  $category);
                })

                // @ users
                ->where(function ($q) use ($user_id) {
                    if (!empty($user_id))
                        $q->whereIn('opportunities.user_id', $user_id);
                })

                // @ releaseFrom
                ->where(function ($q) use ($releaseFrom) {
                    if (!empty($releaseFrom))
                        $q->whereDate('opportunities.release_date', '>=', $releaseFrom);
                })

                // @ releaseTo
                ->where(function ($q) use ($releaseTo) {
                    if (!empty($releaseTo))
                        $q->whereDate('opportunities.release_date', '<=', $releaseTo);
                })

                // @ submissionFrom
                ->where(function ($q) use ($submissionFrom) {
                    if (!empty($submissionFrom))
                        $q->whereDate('submission_date', '>=', $submissionFrom);
                })

                // @ submissionTo
                ->where(function ($q) use ($submissionTo) {
                    if (!empty($submissionTo))
                        $q->whereDate('submission_date', '<=', $submissionTo);
                });
            // ->paginate($limit)

            if ($sortBy == 'client') {
                $records = $records->with(['client' => function ($query) use ($descending) {
                    $query->orderBy('name', $descending);
                }]);
            } else if ($sortBy == 'user') {
                $records = $records->with(['user' => function ($query) use ($descending) {
                    $query->orderBy('name', $descending);
                }]);
            } else if ($sortBy == 'branch') {
                $records = $records->with(['branch' => function ($query) use ($descending) {
                    $query->orderBy('name', $descending);
                }]);
            } else {
                $records = $records->orderby($sortBy, $descending);
            }

            $records = $records->paginate($limit);
            return OpportunityResource::collection($records);
            // dd(DB::getQueryLog());
        } else if ($user_role == "sales") {
            $limit = !empty($request->limit) ? $request->limit : 10;

            $releaseFrom = !empty($request->release_from) ? Carbon::parse($request->release_from) : null;
            $releaseTo = !empty($request->release_to) ? Carbon::parse($request->release_to) : null;

            $submissionFrom = !empty($request->submission_from) ? Carbon::parse($request->submission_from)->toDateString() : null;
            $submissionTo = !empty($request->submission_to) ? Carbon::parse($request->submission_to)->toDateString() : null;

            // @ sortBy: string
            $sortBy =  !empty($request->sortBy) ? $request->sortBy : 'id';

            $user_id = !empty($request->user_id) ? explode(',', $request->user_id) : [];
            $branch_id = !empty($request->branch_id) ? explode(',', $request->branch_id) : [];
            $tasks_users = !empty($request->tasks_users) ? explode(',', $request->tasks_users) : [];

            $status = !empty($request->status) ? explode(',', $request->status) : [];
            $rfp_status = !empty($request->rfp_status) ? explode(',', $request->rfp_status) : [];
            $category = !empty($request->category) ? explode(',', $request->category) : [];

            // @ descending: Boolean
            $descending =  json_decode($request->descending)  ? "DESC" : 'ASC';

            // DB::enableQueryLog();

            // $records = Opportunity::orderby($sortBy, $descending)
            $records = Opportunity::with('tasks')
                ->with('files')
                ->with('user')
                ->with('client')
                ->with('branch')
                ->with('country_manager')
                ->with('executive_manager')
                ->where('user_id', Auth::user()->id)

                ->where(function ($query) use ($tasks_users) {
                    if (!empty($tasks_users))
                        $query->whereHas('tasks',  function ($q) use ($tasks_users) {
                            $q->whereIn('opportunity_tasks.assigned_to', $tasks_users);
                        });
                })

                ->where(function ($query) use ($branch_id) {
                    if (!empty($branch_id))
                        $query->whereHas('branch',  function ($q) use ($branch_id) {
                            $q->whereIn('opportunities.branch_id', $branch_id);
                        });
                })

                ->where(function ($query) use ($request) {
                    if (!empty($request->filter))
                        $query
                            ->where('description', 'like', '%' . $request->filter  . '%')
                            ->orWhere('observation', 'like', '%' . $request->filter  . '%')
                            ->orWhere('contact_name', 'like', '%' . $request->filter  . '%')
                            ->orWhere('rfp_status', 'like', '%' . $request->filter  . '%')
                            ->orWhere('status', 'like', '%' . $request->filter  . '%')
                            ->orWhere('required_technology', 'like', '%' . $request->filter  . '%')
                            ->orWhere('winning_chance', 'like', '%' . $request->filter  . '%')
                            ->orWhereHas('client', function ($q) use ($request) {
                                $q->where('name', 'LIKE', '%' . $request->filter . '%');
                            });
                    if (!empty($request->filter) && str_starts_with(strtolower($request->filter), 'p-')) {
                        $query->orWhere('id', '=',  substr($request->filter, 2));
                    }
                    // ->orWhereHas('branch',  function ($q) use ($request) {
                    //     $q->whereIn('name', 'LIKE', '%'.$request->filter.'%');
                    // });
                })

                // @ winning_chance & rfp_status
                // ->where(function ($query) use ($request) {
                //     if (!empty($request->chanceFilter))
                //         $query->where('winning_chance', '=',  $request->chanceFilter);

                //     if (!empty($request->rfp_status))
                //         $query->where('rfp_status', '=', $request->rfp_status);
                // })

                // @ status
                ->where(function ($q) use ($status) {
                    if (!empty($status))
                        $q->whereIn('opportunities.status',  $status);
                })

                // @ rfp_status
                ->where(function ($q) use ($rfp_status) {
                    if (!empty($rfp_status))
                        $q->whereIn('opportunities.rfp_status',  $rfp_status);
                })

                ->where(function ($q) use ($category) {
                    if (!empty($category))
                        $q->whereIn('opportunities.category',  $category);
                })

                // @ users
                ->where(function ($q) use ($user_id) {
                    if (!empty($user_id))
                        $q->whereIn('opportunities.user_id', $user_id);
                })

                // @ releaseFrom
                ->where(function ($q) use ($releaseFrom) {
                    if (!empty($releaseFrom))
                        $q->whereDate('release_date', '>=', $releaseFrom);
                })

                // @ releaseTo
                ->where(function ($q) use ($releaseTo) {
                    if (!empty($releaseTo))
                        $q->whereDate('release_date', '<=', $releaseTo);
                })

                // @ submissionFrom
                ->where(function ($q) use ($submissionFrom) {
                    if (!empty($submissionFrom))
                        $q->whereDate('submission_date', '>=', $submissionFrom);
                })

                // @ submissionTo
                ->where(function ($q) use ($submissionTo) {
                    if (!empty($submissionTo))
                        $q->whereDate('submission_date', '<=', $submissionTo);
                });
            // ->paginate($limit)

            if ($sortBy == 'client') {
                $records = $records->with(['client' => function ($query) use ($descending) {
                    $query->orderBy('name', $descending);
                }]);
            } else if ($sortBy == 'user') {
                $records = $records->with(['user' => function ($query) use ($descending) {
                    $query->orderBy('name', $descending);
                }]);
            } else if ($sortBy == 'branch') {
                $records = $records->with(['branch' => function ($query) use ($descending) {
                    $query->orderBy('name', $descending);
                }]);
            } else {
                $records = $records->orderby($sortBy, $descending);
            }

            $records = $records->paginate($limit);
            return OpportunityResource::collection($records);
            // dd(DB::getQueryLog());
        } else {
            //other roles who see all opportunities

            DB::enableQueryLog();
            // dd(DB::getQueryLog());

            // @ page: string
            // @ By default paginator will intercept the request and handle page number

            // @ limit: string
            $limit = !empty($request->limit) ? $request->limit : 10;

            $releaseFrom = !empty($request->release_from) ? Carbon::parse($request->release_from) : null;
            $releaseTo = !empty($request->release_to) ? Carbon::parse($request->release_to) : null;

            $submissionFrom = !empty($request->submission_from) ? Carbon::parse($request->submission_from)->toDateString() : null;
            $submissionTo = !empty($request->submission_to) ? Carbon::parse($request->submission_to)->toDateString() : null;

            // @ sortBy: string
            $sortBy =  !empty($request->sortBy) ? $request->sortBy : 'id';

            $user_id = !empty($request->user_id) ? explode(',', $request->user_id) : [];
            $branch_id = !empty($request->branch_id) ? explode(',', $request->branch_id) : [];

            // @ explod return [''] if no value in
            $tasks_users = strlen($request->tasks_users) ? explode(',', $request->tasks_users) : [];

            $status = !empty($request->status) ? explode(',', $request->status) : [];
            $rfp_status = !empty($request->rfp_status) ? explode(',', $request->rfp_status) : [];
            $category = !empty($request->category) ? explode(',', $request->category) : [];
            $USER_ID = Auth::user()->id;
            // $USER_ID = 426;

            // return $tasks_users;
            // @ descending: Boolean
            $descending =  json_decode($request->descending)  ? "DESC" : 'ASC';
            $notAssignedFilter =  isset($request->notAssignedFilter) ? $request->notAssignedFilter : null;

            // $records = Opportunity::orderby($sortBy, $descending)
            $records = Opportunity::with('tasks')
                ->with('files')
                ->with('user')
                ->with('client')
                ->with('branch')
                ->with('country_manager')
                ->with('executive_manager')

                // ---------------------------------
                // @ If Presales consultant
                // ---------------------------------
                ->where(function ($query) use ($user_role, $USER_ID) {
                    if ($user_role == "presales_consultant")
                        $query->orWhereHas('tasks', function ($q) use ($USER_ID) {
                            $q->where('assigned_to', '=', $USER_ID);
                        });
                })

                ->where(function ($query) use ($tasks_users, $notAssignedFilter) {
                    if (!empty($tasks_users))
                        $query->orWhereHas('tasks',  function ($q) use ($tasks_users) {
                            $q->whereIn('opportunity_tasks.assigned_to', $tasks_users);
                        });

                    if ($notAssignedFilter == 1) {
                        $query->orWhereHas('tasks',  function ($q) {
                            $q->where('opportunity_tasks.assigned_to', '=', NULL);
                        });
                        $query->orWhereDoesntHave('tasks');
                    }
                })

                ->where(function ($query) use ($branch_id) {
                    if (!empty($branch_id))
                        $query->whereHas('branch',  function ($q) use ($branch_id) {
                            $q->whereIn('opportunities.branch_id', $branch_id);
                        });
                })

                ->where(function ($query) use ($request) {
                    if (!empty($request->filter))
                        $query
                            ->where('description', 'like', '%' . $request->filter  . '%')
                            ->orWhere('observation', 'like', '%' . $request->filter  . '%')
                            ->orWhere('contact_name', 'like', '%' . $request->filter  . '%')
                            ->orWhere('rfp_status', 'like', '%' . $request->filter  . '%')
                            ->orWhere('category', 'like', '%' . $request->filter  . '%')
                            ->orWhere('status', 'like', '%' . $request->filter  . '%')
                            ->orWhere('required_technology', 'like', '%' . $request->filter  . '%')
                            ->orWhere('winning_chance', 'like', '%' . $request->filter  . '%')
                            ->orWhereHas('client', function ($q) use ($request) {
                                $q->where('name', 'LIKE', '%' . $request->filter . '%');
                            });

                    if (!empty($request->filter) && str_starts_with(strtolower($request->filter), 'p-')) {
                        $query->orWhere('id', '=',  substr($request->filter, 2));
                    }

                    //Client, client, clients,,, whereIn, where//
                    // ->whereHas('Profile', function($q){  
                    //     $q->where('gender', 'Male');
                    // ->orWhere('clients.name', 'like', '%' . function ($q) use ($request) {
                    //         $q->whereIn('clients.name', $request);
                    //     } . '%');

                })

                // @ winning_chance & rfp_status
                // ->where(function ($query) use ($request) {
                //     if (!empty($request->chanceFilter))
                //         $query->where('winning_chance', '=',  $request->chanceFilter);

                //     if (!empty($request->rfp_status))
                //         $query->where('rfp_status', '=', $request->rfp_status);
                // })

                // @ status
                ->where(function ($q) use ($status) {
                    if (!empty($status))
                        $q->whereIn('opportunities.status',  $status);
                })

                // @ rfp_status
                ->where(function ($q) use ($rfp_status) {
                    if (!empty($rfp_status))
                        $q->whereIn('opportunities.rfp_status',  $rfp_status);
                })
                ->where(function ($q) use ($category) {
                    if (!empty($category))
                        $q->whereIn('opportunities.category',  $category);
                })

                // @ users
                ->where(function ($q) use ($user_id) {
                    if (!empty($user_id))
                        $q->whereIn('opportunities.user_id', $user_id);
                })

                // @ releaseFrom
                ->where(function ($q) use ($releaseFrom) {
                    if (!empty($releaseFrom))
                        $q->whereDate('release_date', '>=', $releaseFrom);
                })

                // @ releaseTo
                ->where(function ($q) use ($releaseTo) {
                    if (!empty($releaseTo))
                        $q->whereDate('release_date', '<=', $releaseTo);
                })

                // @ submissionFrom
                ->where(function ($q) use ($submissionFrom) {
                    if (!empty($submissionFrom))
                        $q->whereDate('submission_date', '>=', $submissionFrom);
                })

                // @ submissionTo
                ->where(function ($q) use ($submissionTo) {
                    if (!empty($submissionTo))
                        $q->whereDate('submission_date', '<=', $submissionTo);
                });

            if ($sortBy == 'client') {
                $records = $records->leftJoin('clients', 'opportunities.client_id', '=', 'clients.id')
                    ->select('opportunities.*')
                    ->orderBy('clients.name', $descending);
            } else if ($sortBy == 'user') {
                $records = $records->leftJoin('users', 'opportunities.user_id', '=', 'users.id')
                    ->select('opportunities.*')
                    ->orderBy('users.name', $descending);
            } else if ($sortBy == 'Branch') {
                $records =
                    $records->leftJoin('branches', 'opportunities.branch_id', '=', 'branches.id')
                    ->select('opportunities.*')
                    ->orderBy('branches.name', $descending);
            } else {
                $records = $records->orderBy($sortBy, $descending);
            }

            $records = $records->paginate($limit);
            // dd(DB::getQueryLog());
            return OpportunityResource::collection($records);
        }
    }

    public function create(CreateOpportunityRequest $request)
    {

        // $opp = Opportunity::find(2);

        //------------------------------------------
        // Prepare Opportunity
        //------------------------------------------
        $opp = new Opportunity();

        $opp->user_id = $request->user_id;
        $opp->client_id = $request->client_id;
        $opp->branch_id = $request->branch_id;
        $opp->executive_manager_id = $request->executive_manager_id;
        $opp->country_manager_id = $request->country_manager_id;
        $opp->sales_manager_id = $request->sales_manager_id;
        $opp->release_date = $request->release_date;
        $opp->submission_date = $request->submission_date;
        $opp->subsidiary_date = $request->subsidiary_date;
        $opp->description = $request->description;
        $opp->external_resources = $request->external_resources;
        $opp->duration = $request->duration;
        $opp->winning_chance = $request->winning_chance;
        $opp->learned = $request->learned;
        $opp->competitors = $request->competitors;
        $opp->budget = $request->budget;
        $opp->currency_code = $request->currency_code;
        $opp->submission_type = $request->submission_type;
        $opp->category = $request->category;
        $opp->demo_date = $request->demo_date;

        $opp->rfp_status = $request->rfp_status;
        $opp->status = $request->status;

        $opp->contact_name = $request->contact_name;
        $opp->contact_title = $request->contact_title;
        $opp->contact_email = $request->contact_email;
        $opp->contact_number = $request->contact_number;

        // $user = User::find(Auth::user()->id);
        // $is_presales_dmin = $user->isPresalesManager($user);
        // if ($is_presales_dmin) {
        //     $opp->department_manager_action = $request->department_manager_action;
        //     $opp->reminder_date = $request->reminder_date;
        //     $opp->proposed_value = $request->proposed_value;
        //     $opp->awarded_amount = $request->awarded_amount;
        //     $opp->status = $request->status;
        //     $opp->rfp_status = $request->rfp_status;
        // }

        $opp->save();

        //------------------------------------------
        // Prepare tasks
        //------------------------------------------
        // if (isset($request->tasks)) {
        //     $opp->syncTasks($request->tasks, $opp);
        // }

        //------------------------------------------
        // Prepare products
        //------------------------------------------
        // @ Set products -> MANY TO MANY
        if (isset($request->products)) {
            $opp->products()->sync($request->products);
        }

        if (App::environment('production')) {
            // The environment is production
            MailHelper::sendOpportunityCreatedMail($opp, null);
        }

        return new OpportunityResource($opp);
    }

    public function update(UpdateOpportunityRequest $request)
    {
        $opp = Opportunity::find($request->id);

        $opp->user_id = $request->user_id;
        $opp->client_id = $request->client_id;
        $opp->branch_id = $request->branch_id;
        $opp->executive_manager_id = $request->executive_manager_id;
        $opp->country_manager_id = $request->country_manager_id;
        $opp->release_date = $request->release_date;
        $opp->submission_date = $request->submission_date;
        $opp->subsidiary_date = $request->subsidiary_date;
        $opp->description = $request->description;
        $opp->external_resources = $request->external_resources;
        $opp->duration = $request->duration;
        $opp->winning_chance = $request->winning_chance;
        $opp->learned = $request->learned;
        $opp->competitors = $request->competitors;
        $opp->budget = $request->budget;
        $opp->currency_code = $request->currency_code;
        $opp->submission_type = $request->submission_type;

        $opp->contact_name = $request->contact_name;
        $opp->contact_title = $request->contact_title;
        $opp->contact_email = $request->contact_email;
        $opp->contact_number = $request->contact_number;
        $opp->category = $request->category;
        $opp->demo_date = $request->demo_date;

        //------------------------------------------
        // Updating manager props 
        //------------------------------------------
        // $user = User::find(Auth::user()->id);
        // $is_presales_dmin = $user->isPresalesManager($user);
        // if ($is_presales_dmin) {
        //     $opp->department_manager_action = $request->department_manager_action;
        //     $opp->reminder_date = $request->reminder_date;
        //     $opp->proposed_value = $request->proposed_value;
        //     $opp->awarded_amount = $request->awarded_amount;
        //     $opp->status = $request->status;
        //     $opp->rfp_status = $request->rfp_status;
        // }

        $opp->save();

        //------------------------------------------
        // Prepare tasks
        //------------------------------------------
        // $opp->syncTasks($request->tasks, $opp);

        //------------------------------------------
        // Prepare products
        //------------------------------------------
        $opp->products()->sync($request->products);

        return new OpportunityResource($opp);
    }

    public function manage(UpdateOpportunityRequest $request)
    {

        $opp = Opportunity::find($request->id);
        $old_rfp_status = $opp->rfp_status;
        $opp->rfp_status = $request->rfp_status;
        $opp->status = $request->status;
        $opp->proposed_value = $request->proposed_value;
        $opp->awarded_amount = $request->awarded_amount;
        $opp->solution = $request->solution;
        $opp->lost_reason = $request->lost_reason;

        $opp->save();

        if (strtolower($opp->rfp_status) == 'submitted' && strtolower($old_rfp_status) != strtolower($opp->rfp_status)) {
            OpportunityTask::where('opportunity_id', '=', $opp->id)->update(['completed'=> 1]);
        }

        return new OpportunityResource($opp);
    }

    public function delete(Opportunity $opp)
    {
        Opportunity::destroy($opp->id);

        return response()->json(['message' => "Opportunity deleted."], 200);
    }

    public function download_file(File $file)
    {
        $filePath = Storage::disk('public')->get('files/' . $file->name);
        return (new Response($filePath, 200))
            ->header('Content-Disposition', 'attachment; filename="' . $file->original_name . '"')
            ->header('Content-Type', $file->type);
    }

    public function delete_file(File $file)
    {
        Storage::delete('public/files/' . $file->name);
        File::destroy($file->id);
        return response()->json(['message' => "File deleted."], 200);
    }

    public function upload(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'file' => 'required|file',
                'opportunity_id' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $original_name =  $request->name;
            $type =  $request->type;
            $opportunity_id = $request->opportunity_id;
            $file = $request->file('file');
            $ext  = $file->extension();
            $filename = Uuid::generate()->string;
            $name = $filename . "." . $ext;

            Storage::putFileAs(
                'public/files',
                $file,
                $name
            );

            $file = new File();
            $file->name = $name;
            $file->original_name = $original_name;
            $file->opportunity_id = $opportunity_id;
            $file->type = $type;

            $file->save();
        } catch (\Throwable $th) {
            return $th->getMessage();
        }

        return response()->json(['data' =>  $file], 201);
    }

    public function publish(Request $request, Opportunity $opp)
    {
        MailHelper::sendOpportunityCreatedMail($opp, $request);
        return response()->json(['message' => "Email sent successfully."], 200);
    }

    private function jsonToCsv($json, $csvFilePath = false, $boolOutputFile = false)
    {

        // See if the string contains something
        if (empty($json)) {
            die("The JSON string is empty!");
        }

        // If passed a string, turn it into an array
        if (is_array($json) === false) {
            $json = json_decode($json, true);
        }

        // If a path is included, open that file for handling. Otherwise, use a temp file (for echoing CSV string)
        if ($csvFilePath !== false) {
            $f = fopen($csvFilePath, 'w+');
            if ($f === false) {
                die("Couldn't create the file to store the CSV, or the path is invalid. Make sure you're including the full path, INCLUDING the name of the output file (e.g. '../save/path/csvOutput.csv')");
            }
        } else {
            $boolEchoCsv = true;
            if ($boolOutputFile === true) {
                $boolEchoCsv = false;
            }
            $strTempFile = 'storage/reports/opportunities-report' . date("U") . ".csv";
            $f = fopen($strTempFile, "w+");
        }

        $firstLineKeys = false;
        foreach ($json as $line) {
            if (empty($firstLineKeys)) {
                $firstLineKeys = array_keys($line);
                fputcsv($f, $firstLineKeys);
                $firstLineKeys = array_flip($firstLineKeys);
            }

            // Using array_merge is important to maintain the order of keys acording to the first element
            fputcsv($f, array_merge($firstLineKeys, $line));
        }
        fclose($f);


        // Take the file and put it to a string/file for output (if no save path was included in function arguments)
        if ($boolOutputFile === true) {
            if ($csvFilePath !== false) {
                $file = $csvFilePath;
            } else {
                $file = $strTempFile;
            }

            // Output the file to the browser (for open/save)
            if (file_exists($file)) {
                header('Content-Type: text/csv');
                header('Content-Disposition: attachment; filename=' . basename($file));
                header('Content-Length: ' . filesize($file));
                readfile($file);
            }
        } elseif ($boolEchoCsv === true) {
            if (($handle = fopen($strTempFile, "r")) !== FALSE) {
                while (($data = fgetcsv($handle)) !== FALSE) {
                    echo implode(",", $data);
                    echo "<br />";
                }
                fclose($handle);
            }
        }

        // Delete the temp file
        unlink($strTempFile);
        // return  basename($file);
    }

    public function downloadReport(Request $request)
    {
        $limit = !empty($request->limit) ? $request->limit : 10;

        $releaseFrom = !empty($request->release_from) ? Carbon::parse($request->release_from) : null;
        $releaseTo = !empty($request->release_to) ? Carbon::parse($request->release_to) : null;

        $submissionFrom = !empty($request->submission_from) ? Carbon::parse($request->submission_from)->toDateString() : null;
        $submissionTo = !empty($request->submission_to) ? Carbon::parse($request->submission_to)->toDateString() : null;

        // @ sortBy: string
        $sortBy =  !empty($request->sortBy) ? $request->sortBy : 'id';

        $user_id = !empty($request->user_id) ? explode(',', $request->user_id) : [];
        $branch_id = !empty($request->branch_id) ? explode(',', $request->branch_id) : [];
        $tasks_users = !empty($request->tasks_users) ? explode(',', $request->tasks_users) : [];

        $status = !empty($request->status) ? explode(',', $request->status) : [];
        $rfp_status = !empty($request->rfp_status) ? explode(',', $request->rfp_status) : [];

        // @ descending: Boolean
        $descending =  json_decode($request->descending)  ? "DESC" : 'ASC';
        $notAssignedFilter =  isset($request->notAssignedFilter) ? $request->notAssignedFilter : null;

        // $records = Opportunity::orderby($sortBy, $descending)
        $records = Opportunity::with('user')
            ->with(['tasks.assignedTo'])
            // ->with('tasks')
            ->with('files')
            ->with('client')
            ->with('branch')
            ->with('country_manager')
            ->with('executive_manager')
            // ->leftJoin('opportunity_tasks as t', 'opportunities.id', '=', 't.opportunity_id')
            // ->leftJoin('users as u', 't.assigned_to', '=', 'u.id')
            // ->select('opportunities.*')

            // ->where(function ($query) use ($tasks_users) {
            //     if (!empty($tasks_users))
            //         $query->whereHas('tasks',  function ($q) use ($tasks_users) {
            //             $q->whereIn('user_id', $tasks_users);
            //         });
            // })
            ->where(function ($query) use ($tasks_users, $notAssignedFilter) {
                if (!empty($tasks_users))
                    $query->orWhereHas('tasks',  function ($q) use ($tasks_users) {
                        $q->whereIn('opportunity_tasks.assigned_to', $tasks_users);
                    });
                if ($notAssignedFilter == 1) {
                    $query->orWhereHas('tasks',  function ($q) {
                        $q->where('opportunity_tasks.assigned_to', '=', NULL);
                    });
                    $query->orWhereDoesntHave('tasks');
                }
            })

            ->where(function ($query) use ($branch_id) {
                if (!empty($branch_id))
                    $query->whereHas('branch',  function ($q) use ($branch_id) {
                        $q->whereIn('branch_id', $branch_id);
                    });
            })

            ->where(function ($query) use ($request) {
                if (!empty($request->filter))
                    $query
                        ->where('description', 'like', '%' . $request->filter  . '%')
                        ->orWhere('observation', 'like', '%' . $request->filter  . '%')
                        ->orWhere('contact_name', 'like', '%' . $request->filter  . '%')
                        ->orWhere('rfp_status', 'like', '%' . $request->filter  . '%')
                        ->orWhere('status', 'like', '%' . $request->filter  . '%')
                        ->orWhere('required_technology', 'like', '%' . $request->filter  . '%')
                        ->orWhere('winning_chance', 'like', '%' . $request->filter  . '%');
                if (!empty($request->filter) && str_starts_with(strtolower($request->filter), 'p-')) {
                    $query->orWhere('id', '=',  substr($request->filter, 2));
                }
            })

            // @ status
            ->where(function ($q) use ($status) {
                if (!empty($status))
                    $q->whereIn('status',  $status);
            })

            // @ rfp_status
            ->where(function ($q) use ($rfp_status) {
                if (!empty($rfp_status))
                    $q->whereIn('rfp_status',  $rfp_status);
            })

            // @ users
            ->where(function ($q) use ($user_id) {
                if (!empty($user_id))
                    $q->whereIn('user_id', $user_id);
            })

            // @ releaseFrom
            ->where(function ($q) use ($releaseFrom) {
                if (!empty($releaseFrom))
                    $q->whereDate('release_date', '>=', $releaseFrom);
            })

            // @ releaseTo
            ->where(function ($q) use ($releaseTo) {
                if (!empty($releaseTo))
                    $q->whereDate('release_date', '<=', $releaseTo);
            })

            // @ submissionFrom
            ->where(function ($q) use ($submissionFrom) {
                if (!empty($submissionFrom))
                    $q->whereDate('submission_date', '>=', $submissionFrom);
            })

            // @ submissionTo
            ->where(function ($q) use ($submissionTo) {
                if (!empty($submissionTo))
                    $q->whereDate('submission_date', '<=', $submissionTo);
            });

        if ($sortBy == 'client') {
            $records = $records->leftJoin('clients', 'opportunities.client_id', '=', 'clients.id')
                ->select('opportunities.*')
                ->orderBy('clients.name', $descending);
        } else if ($sortBy == 'user') {
            $records = $records->leftJoin('users', 'opportunities.user_id', '=', 'users.id')
                ->select('opportunities.*')
                ->orderBy('users.name', $descending);
        } else if ($sortBy == 'Branch') {
            $records =
                $records->leftJoin('branches', 'opportunities.branch_id', '=', 'branches.id')
                ->select('opportunities.*')
                ->orderBy('branches.name', $descending);
        } else {
            $records = $records->orderBy($sortBy, $descending);
        }
        // $records = $records->paginate($limit);
        $records = $records->get();
        $data = $records;
        $res = [];

        for ($i = 0; $i < count($data); $i++) {

            $tsks = '';
            // $d = json_decode($data[$i]['tasks']);
            for ($c = 0; $c <= count($data[$i]['tasks']) - 1; $c++) {
                $t = new OpportunityTaskResource($data[$i]['tasks'][$c]);
                $t = json_decode($t->toJson());
                $taskUsername = isset($t->assigned_to->name) ? $t->assigned_to->name : '';
                $tsks  =  $tsks . $taskUsername . ' , '; //
            }

            $res[] = [
                // 'tasks' =>  count($data[$i]['tasks']) > 0 ? new OpportunityTaskResource($data[$i]['tasks'][0]) : null ,
                'id' => $data[$i]->id,
                'Assigned Tasks' =>  $tsks,
                // 'name' => $data[$i]->name,
                'release_date' => isset($data[$i]->release_date) ? $data[$i]->release_date->format('Y-m-d') : '',
                'submission_date' => isset($data[$i]->submission_date) ?  $data[$i]->submission_date->format('Y-m-d') : '',
                'subsidiary_date' => isset($data[$i]->subsidiary_date)  ? $data[$i]->subsidiary_date->format('Y-m-d') : '',
                'description' => $data[$i]->description,
                'observation' => $data[$i]->observation,
                'external_resources' => $data[$i]->external_resources,
                'duration' => $data[$i]->duration,
                'required_technology' => $data[$i]->required_technology,
                'winning_chance' => $data[$i]->winning_chance,
                'learned' => $data[$i]->learned,
                'competitors' => $data[$i]->competitors,
                'budget' => $data[$i]->budget,
                'currency_code' => $data[$i]->currency_code,
                'submission_type' => $data[$i]->submission_type,
                'contact_name' => $data[$i]->contact_name,
                'contact_title' => $data[$i]->contact_title,
                'contact_email' => $data[$i]->contact_email,
                'contact_number' => $data[$i]->contact_number,
                'demo_date' => $data[$i]->demo_date,
                'category' => $data[$i]->category,
                'create_at' => isset($data[$i]->create_at) ?  $data[$i]->create_at->format('Y-m-d') : '',
                'client' => $data[$i]->client && $data[$i]->client ? $data[$i]->client->name : $data[$i]->client,
                'user' => $data[$i]->user->name,
                'branch' => $data[$i]->branch->name,
                'status' => $data[$i]->status,
                'rfp_status' => $data[$i]->rfp_status,
                'solution' => $data[$i]->solution,
            ];
        }

        // return $res;

        $this->jsonToCsv($res, false, true);
        // $filePath = explode("storage/", $file)[1];;

        // $fff = Storage::disk('public')->get($filePath);
        // return (new Response($fff, 200))
        //     ->header('Content-Disposition', 'attachment; filename="' . $filePath . '"')
        //     // ->header('Content-Type', 'text/csv')
        //     ;

        //         $request = [{
        //             created_at: "2022-04-10T13:15:26.000000Z"
        // id: 4
        // name: "49818570-b8d0-11ec-9e74-a5799c8e8a26.pdf"
        // opportunity_id: "2"
        // original_name: "IMA - RFP - CIMA Annexe 04 - Demande agrÃ©ment type.pdf"

        //         }]
    }

    public function notifyUploadedFiles(Request $request, Opportunity $opp)
    {

        MailHelper::sendOpportunityNewUploadedFilesMail($opp, $request);
        return response()->json(['message' => "Email sent successfully."], 200);
    }
}
