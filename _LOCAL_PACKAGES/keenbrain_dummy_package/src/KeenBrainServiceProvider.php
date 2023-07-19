<?php

namespace KeenBrain;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Laravel\Cashier\Cashier;
use Laravel\Cashier\Events\WebhookHandled;
use RuntimeException;

class KeenBrainServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        Cashier::ignoreMigrations();

        if (! $this->app->configurationIsCached()) {
            $this->mergeConfigFrom(__DIR__.'/../config/keenbrain.php', 'keenbrain');
        }

        $this->registerCommands();
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'keenbrain');

        $this->configureRoutes();
        $this->configureMigrations();
        $this->configureTranslations();
        $this->configurePublishing();
        $this->configureListeners();
    }

    /**
     * Configure the routes offered by the application.
     *
     * @return void
     */
    protected function configureRoutes()
    {
        Route::group([], function () {
            $this->loadRoutesFrom(__DIR__.'/../routes/routes.php');
        });
    }

    /**
     * Configure KeenBrain migrations.
     *
     * @return void
     */
    protected function configureMigrations()
    {
        if ($this->app->runningInConsole()) {
            $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
        }
    }

    /**
     * Configure KeenBrain translations.
     *
     * @return void
     */
    protected function configureTranslations()
    {
        $this->loadJsonTranslationsFrom(lang_path('keenbrain'));
    }

    /**
     * Configure publishing for the package.
     *
     * @return void
     */
    protected function configurePublishing()
    {
        if (! $this->app->runningInConsole()) {
            return;
        }

        $this->publishes([
            __DIR__.'/../config/keenbrain.php' => config_path('keenbrain.php'),
        ], 'keenbrain-config');

        $this->publishes([
            __DIR__.'/../resources/views' => resource_path('views/vendor/keenbrain'),
        ], 'keenbrain-views');

        $this->publishes([
            __DIR__.'/../resources/js' => resource_path('js/vendor/keenbrain'),
        ], 'keenbrain-js');

        $this->publishes([
            __DIR__.'/../stubs/en.json' => lang_path('keenbrain/en.json'),
        ], 'keenbrain-lang');

        $this->publishes([
            __DIR__.'/../stubs/KeenBrainServiceProvider.php' => app_path('Providers/KeenBrainServiceProvider.php'),
        ], 'keenbrain-provider');

        $this->publishes([
            __DIR__.'/../database/migrations' => database_path('migrations'),
        ], 'keenbrain-migrations');
    }

    /**
     * Configure the KeenBrain event listeners.
     *
     * @return void
     */
    protected function configureListeners()
    {
    }

    /**
     * Register the KeenBrain Artisan commands.
     *
     * @return void
     */
    protected function registerCommands()
    {
    }
}
