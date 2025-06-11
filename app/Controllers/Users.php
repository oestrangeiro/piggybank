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

    public function show($id = null){
        $usuario = $this->model->find($id);

        if($usuario){
            return $this->respond($usuario);
        }

        return $this->failNotFound("Usuário não encontrado");
    }
}