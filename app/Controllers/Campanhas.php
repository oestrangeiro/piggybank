<?php

namespace App\Controllers;

use App\Models\CampanhasModel;
use CodeIgniter\RESTful\ResourceController;
use App\Traits\Validate;
use App\Models\EntidadesModel;

class Campanhas extends ResourceController {
    protected $modelName = 'App\Models\CampanhasModel';
    protected $format = 'json';
    protected $campanhaModel;

    // Trait de validação e bla bla bla
    use Validate;

    public function __construct(){
        $this->campanhaModel = new CampanhasModel();
        
    }
    // Rota que mostra todas as campanhas
    public function index(){

        $campanhas = $this->model->select('
                 titulo,
                 meta,
                 recebido,
                 descricao,
                 fk_id_usuario_criador_campanha,
                 fk_id_entidade_criadora_campanha,
                 created_at,
                 updated_at
        ')->findAll();
        //$campanhas = $this->model->getCampanhasEEntidades();

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

    public function create(){
        // Pegando os dados da requisição
        // COMENTADO TAMBÉM, FRONT END ENVIANDO DADOS VIA JSON
        // $title          = $this->request->getPost('title');
        // $goal           = $this->request->getPost('goal');
        // $received       = $this->request->getPost('received');
        // $description    = $this->request->getPost('description');
        // $fkIdEntidade   = $this->request->getPost('fkIdEntidade');

        // PEGANDO OS DADOS VIA JSON

        $data = $this->request->getJSON(true);

        $title          = $data['title']        ?? null;
        $goal           = $data['goal']         ?? null;
        $received       = $data['received']     ?? 0;
        $description    = $data['description']  ?? null;
        $fkIdEntidade   = $data['fkIdEntidade'] ?? null;

        $thereisSomeFielEmpty = $this->isSomeValueNull([$title, $goal, $received, $description, $fkIdEntidade]);

        if($thereisSomeFielEmpty){
            return $this->response->setJSON(['error' => 'Um ou mais campos vazios!']);
        }

        // Validações
        // Titulo
        $title = $this->escapeEntry($title);

        $entityModel = new EntidadesModel();
        // Checo se existe uma entidade com esse ID
        $res = $entityModel->find($fkIdEntidade);

        if(!$res){
            return $this->response->setJSON(['error' => 'Entidade Inexistente!']);
        }


        $campanhaData = [
            'titulo'            => $title,
            'meta'              => $goal,
            'recebido'          => $received,
            'descricao'         => $description,
            'fk_id_entidade'    => $fkIdEntidade
        ];

        if($this->campanhaModel->insert($campanhaData)){
            return $this->response->setJSON(['success' => 'Campanha cadastrada com sucesso!']);
        }else{
            return $this->response->setJSON(['error' => 'Erro ao cadastrar campanha!']);
        }


    }
}