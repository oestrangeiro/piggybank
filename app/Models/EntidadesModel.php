<?php

namespace App\Models;

use CodeIgniter\Model;

class EntidadesModel extends Model{
    protected $table = 'entidades';
    protected $primaryKey = 'id';
    protected $allowedFields = ['id', 'nome', 'fk_endereco', 'email', 'senha', 'criado_em', 'alterado_em'];
    protected $useTimestamps = true;

    // CORRIGIR
    // public function getEnderecoEEntidades(){
    //     return $this->select('entidades.*, enderecos.rua AS endereco_rua')
    //     ->join('entidades', 'entidades.fk_endereco = enderecos.id')
    //     ->findAll();
    // }
}