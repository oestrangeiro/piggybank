<?php

namespace App\Models;

use CodeIgniter\Model;

class CampanhasModel extends Model{
    protected $table = 'campanhas';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'id',
        'titulo',
        'meta',
        //'recebido',
        //'descricao',
        //'fk_id_entidade'
    ];
}