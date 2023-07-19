<?php

namespace KeenBrain\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;
use KeenBrain\KeenBrain;

class MyPortalController
{

    /**
     * Show my portal.
     *
     * @param  string|null  $type
     * @param  mixed  $id
     * @return \Inertia\Response
     */
    public function __invoke(Request $request, $type = null, $id = null)
    {
        $type = $type ?: 'user';

        Inertia::setRootView('keenbrain::app');

        View::share([
            'translations' => static::getTranslations(),
        ]);

        return Inertia::render('MyPortal', []);
    }

    /**
     * Get the KeenBrain translations from the appropriate language file.
     *
     * @return string
     */
    private static function getTranslations()
    {
        if (! is_readable($file = lang_path('keenbrain/'.app()->getLocale().'.json'))) {
            $file = lang_path('keenbrain/'.app('translator')->getFallback().'.json');
        }

        return is_readable($file) ? file_get_contents($file) : '{}';
    }
}
