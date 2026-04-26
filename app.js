const businessDays = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira"
];

const appointmentTimes = createAppointmentTimes("07:30", "16:30", 30);

const predefinedServices = [
  { id: "orcamento", label: "Orçamento" },
  { id: "servico-predefinido", label: "Serviço predefinido (tabela futura)" }
];

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

const daySelect = document.getElementById("daySelect");
const timeSelect = document.getElementById("timeSelect");
const serviceSelect = document.getElementById("serviceSelect");
const videoGrid = document.getElementById("videoGrid");
const tipsGrid = document.getElementById("tipsGrid");
const appointmentForm = document.getElementById("appointmentForm");
const formFeedback = document.getElementById("formFeedback");
const exitMessage = document.getElementById("exitMessage");
const closeExitMessage = document.getElementById("closeExitMessage");

function createAppointmentTimes(start, end, intervalMinutes) {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  const startTotal = startHour * 60 + startMinute;
  const endTotal = endHour * 60 + endMinute;
  const times = [];

  for (let current = startTotal; current <= endTotal; current += intervalMinutes) {
    const hour = String(Math.floor(current / 60)).padStart(2, "0");
    const minute = String(current % 60).padStart(2, "0");
    times.push(`${hour}:${minute}`);
  }

  return times;
}

function fillSelect(selectElement, options) {
  selectElement.innerHTML = options.map((option) => `<option value="${option}">${option}</option>`).join("");
}

function fillServiceSelect() {
  serviceSelect.innerHTML = predefinedServices
    .map((service) => `<option value="${service.id}">${service.label}</option>`)
    .join("");
}

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

appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(appointmentForm);
  const name = String(data.get("name") || "").trim();
  const day = String(data.get("day") || "");
  const time = String(data.get("time") || "");

  formFeedback.textContent = `${name}, sua solicitação para ${day}, às ${time}, foi preparada. Envie pelo WhatsApp para confirmar o atendimento.`;
});

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

fillSelect(daySelect, businessDays);
fillSelect(timeSelect, appointmentTimes);
fillServiceSelect();
renderYoutubeVideos();
renderTips();
