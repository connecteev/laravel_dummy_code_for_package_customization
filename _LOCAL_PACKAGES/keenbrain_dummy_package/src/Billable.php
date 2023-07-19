<?php

namespace KeenBrain;

use Illuminate\Support\Carbon;
use Laravel\Cashier\Billable as CashierBillable;
use Laravel\Cashier\Jobs\SyncCustomerDetails;

trait Billable
{
    use CashierBillable;

    /**
     * Boot the billable model.
     *
     * @return void
     */
    public static function bootBillable()
    {
        static::created(function ($model) {
            $trialDays = $model->keenbrainConfiguration('trial_days');

            $model->forceFill([
                'trial_ends_at' => $trialDays ? now()->addDays($trialDays) : null,
            ])->save();
        });

        static::updated(function ($customer) {
            if ($customer->hasStripeId() && $customer->shouldSyncCustomerDetailsToStripe()) {
                dispatch(new SyncCustomerDetails($customer));
            }
        });
    }

    /**
     * Get the KeenBrain plan that corresponds with the billable's current subscription.
     *
     * @return \KeenBrain\Plan|null
     */
    public function keenbrainPlan()
    {
        $subscription = $this->subscription();

        $plans = KeenBrain::plans($this->keenbrainConfiguration('type'));

        if ($subscription && $subscription->valid()) {
            return $plans->first(function ($plan) use ($subscription) {
                return $plan->id == $subscription->stripe_price;
            });
        }
    }

    /**
     * Get the KeenBrain configuration or a configuration item for the billable model.
     *
     * @param  string|null  $key
     * @return mixed
     */
    public function keenbrainConfiguration($key = null)
    {
        $config = collect(config('keenbrain.billables'))->map(function ($config, $type) {
            $config['type'] = $type;

            return $config;
        })->first(function ($billable, $type) {
            return $billable['model'] == get_class($this);
        });

        if ($key) {
            return $config[$key] ?? null;
        }

        return $config;
    }

}
