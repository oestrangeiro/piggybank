<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Campanhas extends ResourceController {
    protected $modelName = 'App\Models\CampanhasModel';
    protected $format = 'json';

    public function index(){

        $data = $this->model->findAll();

        return $this->respond($data);
    }
}