<?php

namespace App\Http\Controllers;

use App\User;
use Webpatser\Uuid\Uuid;
use App\Helpers\MailHelper;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\App;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;


use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\UpdateUserPasswordRequest;

class UsersController extends Controller
{

    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => '']);
    }

    // get user with role laravel
    // $users = User::whereHas(
    //     'roles', function($q){
    //         $q->where('name', 'ceo');
    //     }
    // )->get();

    public function getUser()
    {
        $user = User::find(Auth::user()->id);

        // return UserResource::customCollection($user, true);
        return new UserResource($user, true);
    }

    public function getUserById(User $user)
    {
        return new UserResource($user);
    }

    public function get(User $user)
    {
        if (Auth::user()->id !=  $user->id) {
            return response()->json(['error' => 'Unauthorized.'], 401);
        }
        return new UserResource($user);
    }

    public function filter(Request $request)
    {
        try {

            // @ page: string
            // @ By default paginator will intercept the request and handle page number

            // @ limit: string
            $limit = !empty($request->limit) ? $request->limit : 10;

            // @ filter: string
            // $filter = $request->filter ? [['name', 'like', '%' . $request->filter  . '%']] : [];

            $roles = !empty($request->roles) ? explode(',', $request->roles) : [];

            // @ sortBy: string
            $sortBy =  !empty($request->sortBy) ? $request->sortBy : 'name';

            // @ descending: Boolean
            $descending =  json_decode($request->descending)  ? "DESC" : 'ASC';

            //filter users by branch
            $branch_id = !empty($request->branch_id) ? explode(',', $request->branch_id) : [];

            $users = User::orderby($sortBy, $descending)
                // ->where($filter)
                ->where(function ($query) use ($request) {
                    $query->where('name', 'like', '%' . $request->filter  . '%');
                    // ->orWhere('mobile', 'like', '%' . $request->filter  . '%')
                })

                ->where(function ($query) use ($roles) {
                    if (!empty($roles))
                        $query->whereHas('roles',  function ($q) use ($roles) {
                            $q->whereIn('name', $roles);
                        });
                })

                ->where(function ($query) use ($branch_id) {
                    if (!empty($branch_id))
                        $query->whereHas('branch',  function ($q) use ($branch_id) {
                            $q->whereIn('branch_id', $branch_id);
                        });
                })

                ->paginate($limit);

            return UserResource::collection($users);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function create(CreateUserRequest $request)
    {
        try {

            $role = Role::findById($request->role);
            if (!$role) {
                return response(['data' => null, 'message' => 'Role was not found.', 'errors' => ['Role was not found.']], 404);
            }

            $user = User::create($request->all());

            $user->assignRole($role); // Assign the new role

            $user->email_verified_at = now();
            $user->password = bcrypt($request->password);

            $user->update();

            if (App::environment('production')) {
                MailHelper::sendAccountCreatedEmail($user, $request->password);
            }
            return response([
                'data' => new UserResource($user)
            ], 201);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function update(UpdateUserRequest $request)
    {
        try {

            $user  = User::findOrFail($request->id);

            // @ Find and attach role
            $role = Role::findById($request->role);
            if (!$role) {
                return response(['data' => null, 'message' => 'Role was not found.', 'errors' => ['Role was not found.']], 404);
            }
            $user->syncRoles(); // Remove all roles
            $user->assignRole($role); // Assign the new role

            $user->role = $request->role;
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->name = $request->first_name.' '.$request->last_name;
            $user->position = $request->position;
            $user->contact_number = $request->contact_number;
            $user->is_active = $request->is_active || null;
            $user->reporting_to = $request->reporting_to;
            $user->branch_id = $request->branch_id;

            $user->update();
            return response([
                'data' => new UserResource($user)
            ], 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function updateUserPassword(UpdateUserPasswordRequest $request)
    {
        $user = User::find($request->id);
        $user->password = bcrypt($request->password);
        $user->update();

        return response(['data' => null, 'message' => 'User password updated.', 'errors' => []], 200);
    }

    public function delete(User $user)
    {
        try {
            $user->delete();
            return response(['data' => null, 'message' => 'User deleted successfully.', 'errors' => []], 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function reset(Request $request)
    {
        $input = $request->only('email');
        $validator = Validator::make($input, [
            'email' => "required|email"
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $response = Password::sendResetLink($input);

        $message = $response == Password::RESET_LINK_SENT ? 'Mail send successfully' : "aasd";

        return response()->json($message);
    }



    public function images(Request $request, User $user)
    {

        //http://localhost:8000/storage/profiles/7b029bc0-d4b3-11ea-956a-1376751a518f-xs.jpeg
        try {
            $validator = Validator::make($request->all(), [
                'file' => 'required|image|max:2000',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $file = $request->file('file');
            $ext  = $file->extension();
            $filename = Uuid::generate()->string;
            $filename_xs =  $filename . "-xs." . $ext;
            $filename_default = $filename . "." . $ext;

            // @ Default image size
            Storage::putFileAs(
                'public/profiles',
                $file,
                $filename_default
            );

            // @ xs image
            $img = Image::make($request->file('file'))->fit(200);
            $img->save(storage_path() . "/app/public/profiles/" . $filename_xs, 30);

            $user->image = $filename_default;
            $user->image_xs = $filename_xs;
            $user->save();

            return response();
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function images2(Request $request, User $user)
    {

        //http://localhost:8000/storage/profiles/7b029bc0-d4b3-11ea-956a-1376751a518f-xs.jpeg
        try {
            $validator = Validator::make($request->all(), [
                'file' => 'required|image|max:2000',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }

            $file = $request->file('file');

            $ext  = $file->extension();
            $filename = Uuid::generate()->string;
            $filename_xs =  $filename . "-xs." . $ext;
            $filename_default = $filename . "." . $ext;

            // @ Default image size
            Storage::putFileAs(
                'public/profiles',
                $file,
                $filename_default
            );

            // @ xs image
            $img = Image::make($request->file('file'))->fit(200);
            $img->save(storage_path() . "/app/public/profiles/" . $filename_xs, 30);

            $user->image = $filename_default;
            $user->image_xs = $filename_xs;
            $user->save();
            echo $img;
            return;

            return response();
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function uploadSample(Request $request)
    {
        $files = $request->file('file');

        if ($request->hasFile('file')) {

            foreach ($files as $file) {

                $ext  = $file->extension();
                Storage::putFileAs(
                    'public/images',
                    $file,
                    Uuid::generate()->string . "." . $ext
                );
            }
        }
    }
}
