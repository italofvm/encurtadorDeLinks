// Função para encurtar a URL utilizando a API de encurtamento
async function encurtarUrl(urlOriginal) {
  const endpoint = "https://api.encurtador.dev/encurtamentos";
  const dados = { url: urlOriginal };
  const opcoes = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  };

  try {
    const resposta = await fetch(endpoint, opcoes);
    if (resposta.ok) {
      const resultado = await resposta.json();
      return resultado.urlEncurtada;
    } else {
      console.error(`Erro ao encurtar URL: ${resposta.status}`);
      return null;
    }
  } catch (erro) {
    console.error("Erro de conexão:", erro);
    return null;
  }
}

// Função para lidar com o evento de clique no botão de encurtar URL
async function handleClickEcurtarBtn() {
  const urlInput = document.getElementById("urlInput");
  const urlOriginal = urlInput.value;

  if (!urlOriginal) {
    alert("Por favor, insira uma URL.");
    return;
  }

  const urlEncurtada = await encurtarUrl(urlOriginal);

  if (!urlEncurtada) {
    alert("Não foi possível encurtar a URL. Por favor, tente novamente.");
    return;
  }

  // Exibe a mensagem de sucesso dentro do campo de input
  urlInput.value = "URL encurtada copiada para a área de transferência!";

  try {
    await navigator.clipboard.writeText(urlEncurtada);
    setTimeout(() => {
      urlInput.value = urlEncurtada;
    }, 3000); // 3000 milissegundos = 3 segundos
  } catch (err) {
    console.error("Erro ao copiar a URL:", err);
    alert("Não foi possível copiar a URL. Por favor, tente novamente.");
  }
}

// Adiciona o evento de clique ao botão de encurtar URL
document
  .getElementById("encurtarBtn")
  .addEventListener("click", handleClickEcurtarBtn);
