<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class PreventAuthenticatedAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        
        if (Auth::check() && $request->route()->getName() === 'payroll.login') {
            // Redirect authenticated user to the dashboard based on their role

            if (Auth::user()->user_level === 'admin') {
                return redirect()->route('admin.dashboard');
            }

            if (Auth::user()->user_level === 'employee') {
                return redirect()->route('employee.dashboard');
            }
        }


        return $next($request);
    }
}
