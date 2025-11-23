<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'profile_picture' => 'nullable|image|max:2048',
        ]);

        $name = $request->first_name.' '.$request->last_name;
    
        $finalPath = null;
        
        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            
            // Generate filename: random(6) . original_name
            // Example: "Rx9z12.myphoto.jpg"
            $filename = Str::random(6) . '_' . $file->getClientOriginalName();
            
            // Define the destination path: public/storage/dp
            $destinationPath = public_path('storage/dp');
            
            // Move the file directly to the public directory
            $file->move($destinationPath, $filename);
            
            // Add the path to the user data for database insertion
            $finalPath = 'storage/dp/' . $filename;
        }
        
        $userData = [
            'name' => $name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'display_picture_url' => $finalPath
        ];

        $user = User::create($userData);

        $token = $user->createToken($user->id)->plainTextToken;

        $request->session()->put('auth_token', $token);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
