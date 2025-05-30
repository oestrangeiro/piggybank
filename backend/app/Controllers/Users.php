<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Users extends ResourceController {
    protected $modelName = 'App\Models\UserModel';
    protected $format = 'json';

    public function index(){

        $data = $this->model->findAll();

        return $this->respond($data);

        //return $this->respond($this->model->findAll);
    }
}