<?php
// index.php – Tela inicial (upload da gramática)
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🤖 Sistema de Autômatos Finitos</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>🤖 Autômatos Finitos</h1>
            <p>Sistema de conversão de Gramática BNF para AFN, AFD e AFM</p>
        </header>

        <div class="upload-card">
            <h2>📁 Enviar Gramática</h2>
            <form action="process.php" method="POST" enctype="multipart/form-data">
                <div class="file-input-wrapper">
                    <input type="file" name="grammar_file" id="grammar_file" accept=".txt" required>
                    <label for="grammar_file" class="file-label">
                        <span class="file-icon">📄</span>
                        <span id="file-name">Selecione um arquivo .txt</span>
                    </label>
                </div>
                <button type="submit" class="btn-primary">🚀 Processar Gramática</button>
            </form>
            
            <div class="example-section">
                <h3>💡 Exemplo de Gramática BNF</h3>
                <div class="code-box">
<pre>&lt;S&gt; ::= a&lt;A&gt; | b&lt;A&gt; | ε
&lt;A&gt; ::= a&lt;A&gt; | b&lt;A&gt; | ε</pre>
                </div>
                <button onclick="createExampleFile()" class="btn-secondary">📥 Baixar Exemplo</button>
            </div>
        </div>

        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">📊</div>
                <h3>Gramática → AFN</h3>
                <p>Conversão automática de gramática regular para autômato finito não-determinístico.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🔄</div>
                <h3>Determinização</h3>
                <p>Transforma AFN em AFD usando o algoritmo clássico de conjunto de estados.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h3>Minimização</h3>
                <p>Gera AFM através de equivalência de estados e remoção de estados redundantes.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">📈</div>
                <h3>Visualização</h3>
                <p>Visualização em cards dos estados e transições de cada autômato.</p>
            </div>
        </div>
    </div>

    <script src="assets/script.js"></script>
</body>
</html>
