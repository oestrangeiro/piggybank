<?php

namespace App\Models;

use CodeIgniter\Model;

class CampanhasModel extends Model{
    protected $table = 'campanhas';
    protected $primaryKey = 'id';
    protected $allowedFields = ['id','titulo','meta','recebido','descricao', 'fk_id_entidade'];

    // Método que retorna a campanha junto da entidade que a gerou
    public function getCampanhasEEntidades(){
        return $this->select('campanhas.*, entidades.nome AS entidade_nome, entidades.email AS entidade_contato')
        ->join('entidades', 'entidades.id = campanhas.fk_id_entidade')
        ->findAll();
    }
}

