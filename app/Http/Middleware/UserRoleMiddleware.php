<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class UserRoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $host = $request->getHost();
        $subdomain = explode('.', $host)[0];

        // Prevent infinite redirect loops by excluding certain routes
        $currentRoute = $request->route()->getName();
        $excludedRoutes = ['admin.dashboard', 'employee.dashboard', 'bioemployee.dashboard', 'bioadmin.dashboard', 'login'];

        if (in_array($currentRoute, $excludedRoutes)) {
            return $next($request);
        }

        if ($subdomain === 'payroll') {
            if (Auth::check() && Auth::user()->user_level === $role) {
                return $next($request);
            }

            if (Auth::check()) {
                if (Auth::user()->user_level === 'admin') {
                    return redirect()->route('admin.dashboard');
                }

                if (Auth::user()->user_level === 'employee') {
                    return redirect()->route('employee.dashboard');
                }
            }

            // Redirect to a default dashboard or login if unauthenticated
            return redirect()->route('login');
        }

        if ($subdomain === 'bioadmin') {
            if (Auth::check()) {
                if (Auth::user()->user_level === 'bioemployee') {
                    return redirect()->route('bioemployee.dashboard');
                }

                if (Auth::user()->user_level === 'bioadmin') {
                    return redirect()->route('bioadmin.dashboard');
                }
            }

            // Redirect to login for unauthorized users
            return redirect()->route('login');
        }

        // Redirect to an external site if unauthorized
        return redirect()->away('https://www.pca.gov.ph/index.php');
    }
}
