const customerTips = [
  {
    title: "Luzes no painel",
    text: "Se uma luz acender no painel, evite ignorar o aviso. Ela pode indicar falha elétrica, superaquecimento ou necessidade de diagnóstico."
  },
  {
    title: "Arrefecimento",
    text: "Verifique o nível do reservatório com o motor frio. Baixar água com frequência pode indicar vazamento ou falha no sistema."
  },
  {
    title: "Suspensão",
    text: "Ruídos ao passar em lombadas, trepidações ou desgaste irregular dos pneus merecem avaliação preventiva."
  },
  {
    title: "Manutenção preventiva",
    text: "Trocas de óleo, filtros e inspeções periódicas ajudam a reduzir custos e evitam paradas inesperadas."
  }
];

const youtubeVideos = [
  {
    title: "Cuidados básicos com o carro",
    youtubeId: ""
  },
  {
    title: "Quando procurar uma oficina",
    youtubeId: ""
  }
];

const videoGrid = document.getElementById("videoGrid");
const tipsGrid = document.getElementById("tipsGrid");
const exitMessage = document.getElementById("exitMessage");
const closeExitMessage = document.getElementById("closeExitMessage");

function renderYoutubeVideos() {
  videoGrid.innerHTML = youtubeVideos
    .map((video) => {
      const hasVideo = Boolean(video.youtubeId);
      const content = hasVideo
        ? `<iframe src="https://www.youtube.com/embed/${video.youtubeId}" title="${video.title}" allowfullscreen></iframe>`
        : '<div class="video-frame">YouTube</div>';

      return `
        <article class="video-card">
          ${content}
          <p>${video.title}</p>
        </article>
      `;
    })
    .join("");
}

function renderTips() {
  tipsGrid.innerHTML = customerTips
    .map(
      (tip) => `
        <article>
          <h3>${tip.title}</h3>
          <p>${tip.text}</p>
        </article>
      `
    )
    .join("");
}

function showExitMessage() {
  exitMessage.classList.add("is-visible");
}

document.addEventListener("mouseleave", (event) => {
  if (event.clientY <= 0) {
    showExitMessage();
  }
});

window.addEventListener("beforeunload", () => {
  showExitMessage();
});

closeExitMessage.addEventListener("click", () => {
  exitMessage.classList.remove("is-visible");
});

renderYoutubeVideos();
renderTips();
