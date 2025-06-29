<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;


class Users extends ResourceController {

    protected $modelName = 'App\Models\UserModel';
    protected $format = 'json';
    protected $userModel;
    protected $defaultPfp;


    // Algumas constantes
    const CPF_LENGHT    = 11;
    const PHONE_LENGHT  = 11;

    // construtor para injeção
    public function __construct(){
        $this->userModel = new UserModel();

        $this->defaultPfp = base_url('img/default/default_pfp.png');
    }

    // Método que retorna todos os usuários na api
    public function index(){

        $allUsers = $this->model->select('id, name, email, pfp_img')->findAll();

        // Verifica se o usuario enviou uma foto de perfil personalizada
        foreach($allUsers as &$user){
            if($user['pfp_img'] != NULL){
                $pfpName = basename($user['pfp_img']);
                $user['pfp_img_serve'] = base_url('uploads/img/pfp/' . $pfpName);
            }
        }
    
        return $this->respond($allUsers);
        
    }

    // rota GET que busca um usuário com base no id
    // ex.: api/users/1
    // retorna o usuário de id 1
    public function show($id = null){
        $user = $this->model->select('name, email, pfp_img')->find($id);

        //servindo a foto do unico usuário
        if($user){
            if($user['pfp_img']){
                $pfpName = basename($user['pfp_img']);
                $user['pfp_img_serve'] = base_url('uploads/img/pfp/' . $pfpName);
            }
            return $this->respond($user);
        }

        return $this->failNotFound("Usuário não encontrado");
    }

    // rota POST para criar um usuario
    public function create(){

        // recebendo os dados via post
        $name       = $this->request->getPost('name');
        $email      = $this->request->getPost('email');
        $password   = $this->request->getPost('password');
        $tel        = $this->request->getPost('phone');
        $cpf        = $this->request->getPost('cpf');
        $pfpImg     = $this->request->getFile('pfpImg'); // Recebe uma imagem
        
        // Verifica se o usuário mandou uma imagem próoria
        // ou se optou por escolher uma imagem default
        $useDefaultProfilePicture = $this->useDefaultPfp($pfpImg);
       

        // Caso tenha sido enviada uma imagem pessoal
        // Salvo o nome da imagem no banco
        if($useDefaultProfilePicture == false){

            // verifica se é uma imagem permitida
            $tiposImg = ['image/jpeg', 'image/jpg', 'image/png'];
            $mime = $pfpImg->getMimeType();

            if(!in_array($mime, $tiposImg)){
                return $this->response->setJSON(['error' => 'Tipo de imagem inválida!']);
            }

            // Gerar um nome unico para a imagem
            $newPfpName = $pfpImg->getRandomName();
            
            // move a foto pro diretorio
            $pfpImg->move(WRITEPATH . 'uploads/img/pfp', $newPfpName);
        }
        

        // se os dados não tiverem sido enviados corretamente
        // retorna um erro nessa porra
        $thereIsSomeFieldEmpty = $this->isSomeValueNull([$name, $email, $password, $tel, $cpf]);
        
        // Retorna erro pro caba
        if($thereIsSomeFieldEmpty){
            return $this->response->setJSON(['error' => 'Um ou mais campos vazios!']);
        }

        // VALIDAÇÃO DOS DADOS
        
        // NOME
        $name = $this->escapeEntry($name);

        // SENHA
        // Remove os espaços da senha
        $password = $this->removeSpaces($password);

        // Verifica se a senha é válida ou não
        $isAnValidPassword = $this->isThisPasswordValid($password);

        if(!$isAnValidPassword){
            return $this->response->setJSON(['error' => 'Senha inválida!']);
        }

        // Criptografando a senha
        $passwordEnc = password_hash($password, PASSWORD_BCRYPT);

        // EMAIL
        // Sanitiza o email
        $email = $this->sanitizeEmail($email);

        // Depois de sanitizar, vê se é um email válido
        $isAnValidEmail = $this->isThisEmailValid($email);

        // Se, mesmo após sanitizar o email, este ainda for inválido
        // Retorna uma mensagem de erro
        if(!$isAnValidEmail){
            return $this->response->setJSON(['error' => 'Email inválido!']);
        }

        // TELEFONE
        // Sanitizando um número de telefone brasileiro
        $tel = $this->sanitizePhoneNumber($tel);

        // Agora verificando se é um telefone no formato válido
        $isAValidPhoneNumber = $this->validatePhoneNumber($tel);

        if(!$isAValidPhoneNumber){
            return $this->response->setJSON(['error' => 'Telefone inválido!']);
        }

        // CPF
        // Sanitizando
        $cpf =  $this->sanitizeCPF($cpf);
        $isAValidCPF = $this->isAValidCPF($cpf);

        if(!$isAValidCPF){
            return $this->response->setJSON(['error' => 'CPF inválido!']);
        }

        $userData = [
            'name'  => $name,
            'tel'   => $tel,
            'email' => $email,
            'cpf'   => $cpf,
            'senha' => $passwordEnc,
            'pfp_img' => $newPfpName
        ];

        // if($useDefaultProfilePicture){
        //     $userData['pfp_img'] = $this->defaultPfp;
        // }

        // Inserção do usuário no banco de dados
        
        if($this->userModel->insert($userData)){
            return $this->response->setJSON(['success' => 'Usuário criado com sucesso!']);
        }else{
            return $this->response->setJSON(['error' => 'Erro ao criar usuário!']);
        }
        
    }

    // MÉTODOS AUXILIARES (POSTERIORMENTE ADICIONÁ-LOS EM UM MIDDLEWARE PARA REAPROVEITAMENTO DE CÓDIGO)

    // Método que verifica se algum indice do array de dados do usuário
    // está com valor vazio
    private function isSomeValueNull(array $userData): bool{

        foreach($userData as $user => $data){
            if(empty($data)) {
                return true;
            }
        }

        // Caso não haja nenhum campo vazio (o que é o esperado), retorna false
        return false;
    }

    // Método que retorna se um email é válido ou não
    private function isThisEmailValid(string $email): bool {

        $isAnValidEmail = filter_var($email, FILTER_VALIDATE_EMAIL);        

        if(!$isAnValidEmail){
            return false;
        }

        return true;
    }

    // Método que sanitiza um email
    private function sanitizeEmail(string $email): string {

        $emailSanitized = filter_var($email, FILTER_SANITIZE_EMAIL);

        return $emailSanitized;
    }

    // Método para sanitizar/escapar uma entrada genérica como nomes
    private function escapeEntry(string $data): string {
        // Remove números e caracteres especiais
        
        $dataEscaped = preg_replace('/[^\p{L} ]/u', '', $data);

        // Evita XSS
        $dataEscaped = htmlspecialchars($dataEscaped, ENT_QUOTES, 'UTF-8');

        return $dataEscaped;
    }

    // Não vou questionar sua cognição...
    private function removeSpaces(string $password): string {

        $passwordWithoutSpaces = str_replace(' ', '', $password);

        return $passwordWithoutSpaces;
    }

    // Método que verifica se a senha é valida com base naqueles caracteres
    // caso o cara tenha inserido uma senha qe possua um caractere diferente daqueles,
    // retorna false
    private function isThisPasswordValid(string $password): bool {
        return !preg_match('/[^a-zA-Z0-9!@#$%&*()_=+-]/', $password);
    }

    // Método para sanitizar um número de telefone
    private function sanitizePhoneNumber(string $phoneNumber): string {
        // Remove os caracteres especiais mais communs inseridos
        // pelos usuários quando vão enviar um número de telefone
        $phoneNumber = str_replace(' ', '', $phoneNumber);
        $phoneNumber = str_replace('(', '', $phoneNumber);
        $phoneNumber = str_replace(')', '', $phoneNumber);
        $phoneNumber = str_replace('-', '', $phoneNumber);
        $phoneNumber = str_replace('+', '', $phoneNumber);

        return $phoneNumber;
    }

    // Método para validar número de telefone
    private function validatePhoneNumber(string $phoneNumber): bool {
        // Checa se o usuário (mesmo após a sanitização) enviou algum caractere que não número
        return !preg_match('/[^0-9]/', $phoneNumber);
    }

    // Método para sanitizar um CPF,
    // removendo pontos e hífens
    private function sanitizeCPF(string $cpf): string {

        $cpf = str_replace(' ', '', $cpf);
        $cpf = str_replace('.', '', $cpf);
        $cpf = str_replace('-', '', $cpf);

        return $cpf;
    }

    // Verifica se, após a remoção dos caracteres especiais, é um cpf válido
    private function isAValidCPF(string $cpf): bool {
        
        // Nesse caso, não vou programar um algoritmo (ou usar um regex) para verificar se realmente
        // é um cpf válido. Vou apenas checar ser o cpf possui 11 dígitos numéricos
        
        $cpfLenght = strlen($cpf);

        if($cpfLenght !== 11){
            return false;
        }

        // se o tamanho for correto, verifico se o cpf possui apenas dígitos

        $thereAreOnlyDigits = !preg_match('/[^0-9]/', $cpf);

        if(!$thereAreOnlyDigits){
            return false;
        }

        return true;

    }

    // Método que verifica se o usuário enviou uma imagem
    private function useDefaultPfp($profilePicture): bool {

        $useDefaultProfilePicture = false;

        // Checa se o usuário enviou uma imagem personalizada ou não na criação da conta
        if(!$profilePicture || $profilePicture->getError()){
            // Caso ele não tenha enviado uma imagem própria,
            // acabo usando uma imagem padrão
            $useDefaultProfilePicture = true;
        }
        // Se não tiver mandado a imagem: retorna 1
        // Se tiver mandado, retorna 0
        return $useDefaultProfilePicture;
    }
}