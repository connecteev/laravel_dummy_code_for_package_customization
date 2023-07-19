<?php

use App\Models\User;

return [

    'path' => 'portal',

    'middleware' => ['web', 'auth'],

    'date_format' => 'F j, Y',
];
