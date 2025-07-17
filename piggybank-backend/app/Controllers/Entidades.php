<?php

namespace App\Controllers;

use App\Models\EntidadesModel;
use CodeIgniter\RESTful\ResourceController;
use App\Traits\Validate;

class Entidades extends ResourceController {

    use Validate; // trait com alguns métodos reutilizáveis

    protected $modelName = 'App\Models\EntidadesModel';
    protected $format = 'json';
    protected $entidadeModel;

    public function __construct(){
        $this->entidadeModel = new EntidadesModel();
    }

    public function index(){

        $data = $this->model
        ->select('id, nome, fk_endereco, email, senha, created_at, updated_at')
        ->findAll();
        //$data = $this->model->getEnderecoEEntidades();

        return $this->respond($data);
    }

    public function show($id = null){
        $entidade = $this->model
        ->select('nome, fk_endereco, email, senha, created_at, updated_at')
        ->find($id);

        if($entidade){
            return $this->respond($entidade);
        }

        return $this->failNotFound("Entidade não encontrada");
    }

    // Método para criar uma entidade
    public function create(){
        // capturando os valores via POST
        // COMENTADO: FRONTENDSON ESTÁ ENVIANDO DADOS VIA JSON E NÃO FORM-URLENCONDED
        // $name       = $this->request->getPost('name');
        // $email      = $this->request->getPost('email');
        // $password   = $this->request->getPost('password');
        // $tel        = $this->request->getPost('tel');

        $data = $this->request->getJSON(true); // ativa o diabo do json
        // capturando os dados
        $name       = $data['name'];
        $email      = $data['email'];
        $password   = $data['password'];
        $tel        = $data['tel'];

        // Verifico se algum campo veio vazio
        $someValueEmpty = $this->isSomeValueNull([$name, $password, $email, $tel]);

        if($someValueEmpty){
            return $this->response->setJSON(['error' => 'Um ou mais campos vazios!']);
        }

        // Validações
        // NOME
        $name   = $this->escapeEntry($name);

        // EMAIL
        $email  = $this->sanitizeEmail($email);

        if(!$this->isThisEmailValid($email)){
            return $this->response->setJSON(['error' => 'Email inválido!']);
        }

        // SENHA
        $password = $this->removeSpaces($password);
        
        if(!$this->isThisPasswordValid($password)){
            return $this->response->setJSON(['error' => 'Senha inválida!']);
        }

        // Hasheando a senha
        $passwordEnc = password_hash($password, PASSWORD_BCRYPT);

        // TELEFONE
        $tel = $this->sanitizePhoneNumber($tel);

        if(!$this->validatePhoneNumber($tel)){
            return $this->response->setJSON(['error' => 'Telefone inválido!']);
        }

        $entidadeData = [
            'nome'   => $name,
            'email'  => $email,
            'senha'  => $passwordEnc,
            'tel'    => $tel
        ];

        // adicionando no banco

        if($this->entidadeModel->insert($entidadeData)){
            return $this->response->setJSON(['success' => 'Entidade inserida com sucesso!']);
        }else{
            return $this->response->setJSON(['error' => 'Erro ao inserir entidade!']);
        }
    }
}