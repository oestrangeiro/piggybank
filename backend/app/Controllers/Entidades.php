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
}