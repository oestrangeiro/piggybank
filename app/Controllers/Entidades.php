<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Entidades extends ResourceController {
    protected $modelName = 'App\Models\EntidadesModel';
    protected $format = 'json';

    public function index(){

        $data = $this->model->findAll();

        return $this->respond($data);
    }

    public function show($id = null){
        $entidade = $this->model->find($id);

        if($entidade){
            return $this->respond($entidade);
        }

        return $this->failNotFound("Entidade não encontrada");
    }
}