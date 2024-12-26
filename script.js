document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
    // Aqui você pode adicionar lógica para enviar o formulário ao servidor (usando AJAX, por exemplo)
    this.reset();
});
