<?php

namespace App\Models;

use CodeIgniter\Model;

class EntidadesModel extends Model{
    protected $table = 'entidades';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'id',
        'nome'
    ];
}