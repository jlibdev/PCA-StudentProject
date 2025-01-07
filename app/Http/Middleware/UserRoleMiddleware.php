<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Middleware\error;
use Illuminate\Support\Facades\Request as FacadesRequest;

class UserRoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // if (!Auth::check()) {
        //     return redirect()->route('login')->withErrors(['access_denied' => 'Unauthorized access']);
        // }
        if (Auth::check() && Auth::user()->user_level === $role) {
            return $next($request);
        }

        if (Auth::check() && Auth::user()->user_level === "admin") {
            return redirect()->route('admin.dashboard');
        }

        if (Auth::check() && Auth::user()->user_level === "employee") {
            return redirect()->route('employee.dashboard');
        }

        if (Auth::check() && Auth::user()->user_level === "bioemployee") {
            return redirect()->route('bioemployee.dashboard');
        }

        if (Auth::check() && Auth::user()->user_level === "bioadmin") {
            return redirect()->route('bioadmin.dashboard');
        }

        $host = FacadesRequest::getHost();

        $subdomain = explode('.', $host)[0];

        // Redirect if user is not authorized
        return redirect()->route('payroll.login')->withErrors(['access_denied' => 'Unauthorized access.']);
    }
}
