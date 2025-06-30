<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Entidades extends ResourceController {
    protected $modelName = 'App\Models\EntidadesModel';
    protected $format = 'json';

    public function index(){

        $data = $this->model
        ->select('nome, fk_endereco, email, senha, criado_em, alterado_em')
        ->findAll();
        //$data = $this->model->getEnderecoEEntidades();

        return $this->respond($data);
    }

    public function show($id = null){
        $entidade = $this->model
        ->select('nome, fk_endereco, email, senha, criado_em, alterado_em')
        ->find($id);

        if($entidade){
            return $this->respond($entidade);
        }

        return $this->failNotFound("Entidade não encontrada");
    }

    // Método para criar uma entidade
    public function create(){
        // capturando os valore via POST
        $name       = $this->request->getPost('name');
        $password   = $this->request->getPost('password');

        $entidadeData = [
            'nome'      => $name,
            'password'  => $password,
        ];

        return $this->respond($entidadeData);
    }
}