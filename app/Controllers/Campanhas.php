<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Campanhas extends ResourceController {
    protected $modelName = 'App\Models\CampanhasModel';
    protected $format = 'json';

    // Rota que mostra todas as campanhas
    public function index(){

        // $data = $this->model->select('titulo, meta, recebido, descricao')->findAll();
        $campanhas = $this->model->getCampanhasEEntidades();

        return $this->respond($campanhas);
    }

    // Rota que mostra uma campanha específica
    public function show($id = null){
        $campanha = $this->model->find($id);

        if($campanha){
            return $this->respond($campanha);
        }

        return $this->failNotFound("Campanha não encontrada");
    }
}