<?php

use App\Models\User;

return [

    'path' => 'billing',

    'middleware' => ['web', 'auth'],

    'date_format' => 'F j, Y',
];
