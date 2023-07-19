<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use KeenBrain\Http\Middleware\HandleInertiaRequests;

Route::get('/foo', function () {
    return Inertia::render('Foo');
})->name('foo');

Route::group([
    'middleware' => array_merge(config('keenbrain.middleware', ['web', 'auth']), [HandleInertiaRequests::class]),
    'namespace' => 'KeenBrain\Http\Controllers',
    'prefix' => config('keenbrain.path'),
], function () {
    Route::get('/{type?}/{id?}', 'MyPortalController')->name('keenbrain.portal');
});
