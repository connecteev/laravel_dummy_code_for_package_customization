<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\ValidationException;
use KeenBrain\Plan;
use KeenBrain\KeenBrain;

class KeenBrainServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        KeenBrain::billable(User::class)->resolve(function (Request $request) {
            return $request->user();
        });

        KeenBrain::billable(User::class)->authorize(function (User $billable, Request $request) {
            return $request->user() &&
                   $request->user()->id == $billable->id;
        });

        KeenBrain::billable(User::class)->checkPlanEligibility(function (User $billable, Plan $plan) {
            // if ($billable->projects > 5 && $plan->name == 'Basic') {
            //     throw ValidationException::withMessages([
            //         'plan' => 'You have too many projects for the selected plan.'
            //     ]);
            // }
        });
    }
}
