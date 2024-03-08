let linkShortened = false;

function encurtarUrl(url) {
  const apiKey = "9c93f8bb0b2d87d1dec3952b52432f1bffd70e90";
  const apiUrl = `https://api-ssl.bitly.com/v4/shorten`;

  // Configuração da requisição
  const data = {
    long_url: url,
    domain: "bit.ly",
  };

  // Configuração dos cabeçalhos da requisição
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  // Fazendo a requisição para a API do Bitly
  fetch(apiUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("urlInput").value = data.link;
      linkShortened = true;
    })
    .catch((error) => {
      console.error("Erro na requisição", error);
    });
}

//---------------------------------------------------------------
document.getElementById("encurtarBtn").addEventListener("click", function () {
  const url = document.getElementById("urlInput").value;
  if (url) {
    encurtarUrl(url);
  } else {
    alert("Por favor, insira uma URL.");
  }
});

//---------------------------------------------------------------
document.getElementById("urlInput").addEventListener("click", function () {
  // Verifica se o link foi encurtado antes de tentar copiá-lo
  if (linkShortened) {
    // Guarda o valor original do campo de input
    const originalValue = this.value;

    // Copia o valor do campo de input para a área de transferência
    navigator.clipboard
      .writeText(originalValue)
      .then(() => {
        // Altera o valor do campo de input para "Link copiado"
        this.value = "Link copiado";

        // Define um temporizador para reverter o valor do campo de input após 2 segundos
        setTimeout(() => {
          this.value = originalValue;
        }, 2000); // 2000 milissegundos = 2 segundos
      })
      .catch((err) => {
        console.error("Erro ao copiar o texto: ", err);
      });
  }
});
