// Encapsulamento do código em uma função autoexecutável para evitar poluição do escopo global
(() => {
  // Seletores dos principais elementos da interface
  const container = document.querySelector('.container');
  const qrCodeBtn = document.querySelector('#qr-form button');
  const qrCodeInput = document.querySelector('#qr-form input');
  const qrCodeImg = document.querySelector('#qr-code img');
  const QR_CODE_API = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';
 
  // Função responsável por gerar o QR Code
  function gerarQrCode() {
    // Remove espaços extras do início e fim do valor
    const inputValue = qrCodeInput.value.trim();
    // Não faz nada se o campo estiver vazio
    if (!inputValue) return;
 
    // Feedback visual ao usuário
    qrCodeBtn.innerText = 'Gerando QR Code ...';
 
    // Define a imagem do QR Code usando a API externa
    qrCodeImg.src = `${QR_CODE_API}${encodeURIComponent(inputValue)}`;
 
    // Ao carregar a imagem, ativa o container e atualiza o botão
    qrCodeImg.onload = () => {
      container.classList.add('active');
      qrCodeBtn.innerText = 'Código Criado!';
    };
 
    // Tratamento de erro caso a imagem não carregue
    qrCodeImg.onerror = () => {
      qrCodeBtn.innerText = 'Erro ao gerar QR Code!';
    };
  }
 
  // Função para lidar com a tecla Enter no campo de input
  function aoPressionarEnter(e) {
    if (e.code === 'Enter') {
      // Previne o envio do formulário caso exista
      e.preventDefault();
      gerarQrCode();
    }
  }
 
  // Função para resetar o estado visual caso o input fique vazio
  function aoDigitarInput() {
    if (!qrCodeInput.value.trim()) {
      container.classList.remove('active');
      qrCodeBtn.innerText = 'Gerar QR Code';
    }
  }
 
  // Adiciona os event listeners apenas uma vez
  qrCodeBtn.addEventListener('click', gerarQrCode);
  qrCodeInput.addEventListener('keydown', aoPressionarEnter);
  qrCodeInput.addEventListener('keyup', aoDigitarInput);
 
  // Comentários:
  // - O código agora está encapsulado, evitando conflitos de variáveis globais.
  // - O tratamento de erro foi adicionado para feedback ao usuário.
  // - Validação aprimorada do input (trim).
  // - Event listeners organizados fora da função principal.
  // - Uso de constantes para strings fixas.
})();