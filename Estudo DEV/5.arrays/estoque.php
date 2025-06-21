<?php
 
class Estoque {
    private $produtos = [];
    private $contador_id = 1;

    public function adicionar_produto() {
        $nome = readline("Nome do produto: ");
        $valor = readline("Valor de venda: ");
        $custo = readline("Custo: ");

        $produto = [
            'id' => $this->contador_id++,
            'nome' => $nome,
            'valor' => (float)$valor,
            'custo' => (float)$custo
        ];

        $this->produtos[] = $produto;
        echo "Produto adicionado com sucesso!\n";
    }

    public function remover_produto() {
        $id = readline("Digite o ID do produto que deseja remover: ");
        foreach ($this->produtos as $index => $produto) {
            if ($produto['id'] == $id) {
                unset($this->produtos[$index]);
                echo "Produto removido com sucesso.\n";
                return;
            }
        }
        echo "Produto com ID $id não encontrado.\n";
    }

    public function encontrar_produto() {
        $id = readline("Digite o ID do produto que deseja encontrar: ");
        foreach ($this->produtos as $produto) {
            if ($produto['id'] == $id) {
                echo "Produto encontrado:\n";
                print_r($produto);
                return;
            }
        }
        echo "Produto com ID $id não encontrado.\n";
    }

    public function listar_produto() {
        if (empty($this->produtos)) {
            echo "Nenhum produto cadastrado.\n";
            return;
        }

        echo "Lista de produtos:\n";
        foreach ($this->produtos as $produto) {
            echo "ID: {$produto['id']} | Nome: {$produto['nome']} | Valor: R$ {$produto['valor']} | Custo: R$ {$produto['custo']}\n";
        }
    }

    public function editar_produto() {
        $id = readline("Digite o ID do produto que deseja editar: ");
        foreach ($this->produtos as &$produto) {
            if ($produto['id'] == $id) {
                echo "Produto atual: \n";
                print_r($produto);

                $novo_nome = readline("Novo nome (pressione Enter para manter): ");
                $novo_valor = readline("Novo valor de venda (Enter para manter): ");
                $novo_custo = readline("Novo custo (Enter para manter): ");

                if ($novo_nome !== "") $produto['nome'] = $novo_nome;
                if ($novo_valor !== "") $produto['valor'] = (float)$novo_valor;
                if ($novo_custo !== "") $produto['custo'] = (float)$novo_custo;

                echo "Produto atualizado com sucesso.\n";
                return;
            }
        }
        echo "Produto com ID $id não encontrado.\n";
    }
}

$estoque = new Estoque();

do {
    echo "\n=== Menu do Estoque ===\n";
    echo "1 - Adicionar produto\n";
    echo "2 - Remover produto\n";
    echo "3 - Encontrar produto\n";
    echo "4 - Listar produtos\n";
    echo "5 - Editar produto\n";
    echo "6 - Sair\n";

    $acao = readline("Escolha uma opção: ");

    switch ($acao) {
        case 1: $estoque->adicionar_produto(); break;
        case 2: $estoque->remover_produto(); break;
        case 3: $estoque->encontrar_produto(); break;
        case 4: $estoque->listar_produto(); break;
        case 5: $estoque->editar_produto(); break;
        case 6: echo "Encerrando...\n"; break;
        default: echo "Opção inválida.\n";
    }
} while ($acao != 6);

