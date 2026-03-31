const STORAGE_KEY = "rotina-pro-state-v3";

const daysOfWeek = [
  { id: "segunda", label: "Segunda-feira" },
  { id: "terca", label: "Terca-feira" },
  { id: "quarta", label: "Quarta-feira" },
  { id: "quinta", label: "Quinta-feira" },
  { id: "sexta", label: "Sexta-feira" },
  { id: "sabado", label: "Sabado" },
  { id: "domingo", label: "Domingo" }
];

const activityTypes = {
  app_driver: {
    label: "Motorista de aplicativo",
    shortLabel: "App",
    className: "type-driver",
    checklist: [
      "Portar CNH e documento do veiculo",
      "Levar celular principal com bateria carregada",
      "Separar carregador e cabo reserva",
      "Conferir placa por causa do rodizio em Sao Paulo",
      "Abastecer combustivel antes do pico",
      "Calibrar pneus e verificar agua e oleo"
    ],
    preparation: [
      "Abrir aplicativo e revisar metas do turno",
      "Definir regiao de maior movimento e horario de saida",
      "Limpar parte interna do carro e conferir ar-condicionado",
      "Separar dinheiro trocado e suporte do celular"
    ],
    highlights: ["CNH", "celular", "rodizio", "combustivel"]
  },
  delivery_driver: {
    label: "Motorista de encomendas",
    shortLabel: "Encomendas",
    className: "type-delivery",
    checklist: [
      "Portar CNH, documento do veiculo e comprovantes de coleta",
      "Conferir enderecos e ordem das entregas",
      "Levar suporte para caixas, cintas e canetas",
      "Verificar combustivel e calibragem dos pneus",
      "Separar celular, carregador veicular e power bank",
      "Checar etiquetas, volumes e comprovantes de recebimento"
    ],
    preparation: [
      "Organizar a rota para economizar tempo e combustivel",
      "Agrupar entregas por bairro ou janela de horario",
      "Avisar clientes sobre horario previsto quando necessario",
      "Reservar espaco no carro para itens mais frageis"
    ],
    highlights: ["rota", "comprovantes", "volumes", "power bank"]
  },
  home_mechanic: {
    label: "Mecanico auto em domicilio",
    shortLabel: "Mecanica",
    className: "type-mechanic",
    checklist: [
      "Levar jogo de chaves, alicates e soquetes",
      "Separar scanner automotivo e multimetro",
      "Conferir macaco, cavaletes e lanterna",
      "Levar EPIs como luvas e oculos de protecao",
      "Confirmar pecas, fluido e materiais de reposicao",
      "Checar maquininha, recibos e contatos do cliente"
    ],
    preparation: [
      "Revisar o servico combinado e sintomas relatados",
      "Separar ferramentas de diagnostico e reparo rapido",
      "Planejar deslocamento com folga para estacionamento",
      "Avisar cliente sobre espaco necessario para atendimento"
    ],
    highlights: ["ferramentas", "scanner", "EPI", "pecas"]
  },
  ac_install: {
    label: "Instalacao de ar-condicionado residencial",
    shortLabel: "Ar-condicionado",
    className: "type-ac",
    checklist: [
      "Levar furadeira, vacuometro, manifold e bomba de vacuo",
      "Separar tubos, cabos, suporte e fita",
      "Conferir escada, EPIs e detector de tensao",
      "Levar parafusos, buchas, nivel e trena",
      "Checar ordem de servico, endereco e tensao eletrica do local",
      "Separar materiais de limpeza para acabamento final"
    ],
    preparation: [
      "Confirmar modelo do equipamento e infraestrutura existente",
      "Avaliar ponto eletrico e rota da tubulacao antes de sair",
      "Reservar tempo para teste final e orientacao ao cliente",
      "Validar quem recebera o servico no endereco"
    ],
    highlights: ["ferramentas", "tubulacao", "EPIs", "teste final"]
  },
  day_off: {
    label: "Dia livre",
    shortLabel: "Livre",
    className: "type-free",
    checklist: [
      "Separar contas, pendencias e planejamento da semana",
      "Revisar manutencao preventiva do veiculo",
      "Organizar ferramentas e materiais do estoque",
      "Reservar tempo de descanso e familia"
    ],
    preparation: [
      "Usar o dia para recuperar energia e ajustar a agenda",
      "Conferir entradas e saidas financeiras da semana",
      "Repor materiais que faltaram nas ultimas atividades",
      "Planejar proximos clientes e bairros de atendimento"
    ],
    highlights: ["descanso", "financeiro", "estoque", "planejamento"]
  }
};

const defaultActivities = [
  {
    id: "seg-1",
    day: "segunda",
    time: "06:30",
    type: "app_driver",
    title: "Corridas da manha",
    notes: "Atender regiao central ate 11h e abastecer no fim do turno.",
    expectedAmount: 0,
    estimatedCost: 0
  },
  {
    id: "seg-2",
    day: "segunda",
    time: "14:00",
    type: "delivery_driver",
    title: "Entregas expressas",
    notes: "Priorizar entregas na zona oeste e confirmar recebimento com foto.",
    expectedAmount: 0,
    estimatedCost: 0
  },
  {
    id: "ter-1",
    day: "terca",
    time: "08:00",
    type: "home_mechanic",
    title: "Atendimento mecanica domiciliar",
    notes: "Levar scanner e pecas para troca de bateria e revisao eletrica.",
    expectedAmount: 0,
    estimatedCost: 0
  },
  {
    id: "qua-1",
    day: "quarta",
    time: "07:00",
    type: "app_driver",
    title: "Turno de pico",
    notes: "Checar rodizio antes de sair e focar corridas curtas pela manha.",
    expectedAmount: 0,
    estimatedCost: 0
  },
  {
    id: "qua-2",
    day: "quarta",
    time: "15:00",
    type: "ac_install",
    title: "Instalacao residencial",
    notes: "Apartamento no quarto andar. Confirmar suporte e tensao 220V.",
    expectedAmount: 0,
    estimatedCost: 0
  },
  {
    id: "qui-1",
    day: "quinta",
    time: "09:00",
    type: "delivery_driver",
    title: "Rota de encomendas",
    notes: "Agrupar bairros vizinhos para economizar combustivel.",
    expectedAmount: 0,
    estimatedCost: 0
  },
  {
    id: "sex-1",
    day: "sexta",
    time: "13:30",
    type: "home_mechanic",
    title: "Revisao rapida em domicilio",
    notes: "Cliente precisa de troca de pastilhas e verificacao de fluido.",
    expectedAmount: 0,
    estimatedCost: 0
  },
  {
    id: "sab-1",
    day: "sabado",
    time: "08:30",
    type: "ac_install",
    title: "Instalacao de split",
    notes: "Levar escada alta, tubulacao extra e kit de limpeza.",
    expectedAmount: 0,
    estimatedCost: 0
  },
  {
    id: "dom-1",
    day: "domingo",
    time: "00:00",
    type: "day_off",
    title: "Dia livre e organizacao",
    notes: "Descansar, revisar contas da semana e preparar segunda-feira.",
    expectedAmount: 0,
    estimatedCost: 0
  }
];

const state = loadState();

const summaryGrid = document.getElementById("summaryGrid");
const financeOverview = document.getElementById("financeOverview");
const filterChips = document.getElementById("filterChips");
const scheduleGrid = document.getElementById("scheduleGrid");
const detailTitle = document.getElementById("detailTitle");
const detailBadge = document.getElementById("detailBadge");
const detailMeta = document.getElementById("detailMeta");
const detailBody = document.getElementById("detailBody");
const iconActions = Array.from(document.querySelectorAll(".icon-button"));
const activityForm = document.getElementById("activityForm");
const resetButton = document.getElementById("resetButton");
const cancelEditButton = document.getElementById("cancelEditButton");
const formTitle = document.getElementById("formTitle");
const formModeBadge = document.getElementById("formModeBadge");
const submitButton = document.getElementById("submitButton");

function loadState() {
  const fallback = {
    activities: structuredClone(defaultActivities),
    selectedActivityId: defaultActivities[0].id,
    activeFilter: "all",
    activeTab: "checklist",
    editingActivityId: "",
    checklistState: {}
  };

  const saved = window.localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      activities: Array.isArray(parsed.activities) && parsed.activities.length ? parsed.activities : fallback.activities,
      selectedActivityId: parsed.selectedActivityId || fallback.selectedActivityId,
      activeFilter: parsed.activeFilter || fallback.activeFilter,
      activeTab: parsed.activeTab || fallback.activeTab,
      editingActivityId: parsed.editingActivityId || "",
      checklistState: parsed.checklistState || {}
    };
  } catch (error) {
    return fallback;
  }
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getActivityType(type) {
  return activityTypes[type] || activityTypes.day_off;
}

function getSelectedActivity() {
  return state.activities.find((activity) => activity.id === state.selectedActivityId) || state.activities[0] || null;
}

function getEditingActivity() {
  return state.activities.find((activity) => activity.id === state.editingActivityId) || null;
}

function sortActivities(list) {
  return list.slice().sort((first, second) => first.time.localeCompare(second.time));
}

function populateFormOptions() {
  activityForm.elements.day.innerHTML = daysOfWeek
    .map((day) => `<option value="${day.id}">${day.label}</option>`)
    .join("");

  activityForm.elements.type.innerHTML = Object.entries(activityTypes)
    .map(([value, config]) => `<option value="${value}">${config.label}</option>`)
    .join("");
}

function resetFormToCreateMode() {
  state.editingActivityId = "";
  activityForm.reset();
  activityForm.elements.activityId.value = "";
  activityForm.elements.day.value = daysOfWeek[0].id;
  activityForm.elements.time.value = "08:00";
  activityForm.elements.type.value = "app_driver";
  activityForm.elements.expectedAmount.value = "";
  activityForm.elements.estimatedCost.value = "";
  activityForm.classList.remove("is-editing");
  formTitle.textContent = "Adicionar ou ajustar atividade";
  formModeBadge.textContent = "Novo cadastro";
  submitButton.textContent = "Salvar atividade";
}

function fillFormForEdit(activity) {
  activityForm.elements.activityId.value = activity.id;
  activityForm.elements.day.value = activity.day;
  activityForm.elements.time.value = activity.time;
  activityForm.elements.type.value = activity.type;
  activityForm.elements.title.value = activity.title;
  activityForm.elements.notes.value = activity.notes || "";
  activityForm.elements.expectedAmount.value = activity.expectedAmount || "";
  activityForm.elements.estimatedCost.value = activity.estimatedCost || "";
  activityForm.classList.add("is-editing");
  formTitle.textContent = "Editar atividade selecionada";
  formModeBadge.textContent = "Modo edicao";
  submitButton.textContent = "Atualizar atividade";
}

function formatTime(value) {
  if (value === "00:00") {
    return "Dia todo";
  }

  return value;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(Number(value || 0));
}

function getActivityProfit(activity) {
  return Number(activity.expectedAmount || 0) - Number(activity.estimatedCost || 0);
}

function getFinancialTotals() {
  return state.activities.reduce(
    (totals, activity) => {
      totals.revenue += Number(activity.expectedAmount || 0);
      totals.cost += Number(activity.estimatedCost || 0);
      return totals;
    },
    { revenue: 0, cost: 0 }
  );
}

function getTimeStatus(activity) {
  if (activity.time === "00:00") {
    return "";
  }

  const now = new Date();
  const todayIndex = now.getDay();
  const mappedToday = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"][todayIndex];

  if (activity.day !== mappedToday) {
    return "";
  }

  const [hours, minutes] = activity.time.split(":").map(Number);
  const activityMinutes = hours * 60 + minutes;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const diff = activityMinutes - currentMinutes;

  if (diff >= 0 && diff <= 60) {
    return "is-soon";
  }

  if (diff < 0 && diff >= -90) {
    return "is-now";
  }

  return "";
}

function renderSummary() {
  const total = state.activities.length;
  const busyDays = new Set(
    state.activities.filter((activity) => activity.type !== "day_off").map((activity) => activity.day)
  ).size;
  const freeDays = new Set(
    state.activities.filter((activity) => activity.type === "day_off").map((activity) => activity.day)
  ).size;
  const nextType = getSelectedActivity() ? getActivityType(getSelectedActivity().type).shortLabel : "-";

  summaryGrid.innerHTML = [
    { label: "Agendamentos", value: total },
    { label: "Dias ocupados", value: busyDays },
    { label: "Dias livres", value: freeDays },
    { label: "Foco atual", value: nextType }
  ]
    .map(
      (item) => `
        <article class="summary-card">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </article>
      `
    )
    .join("");

  const totals = getFinancialTotals();
  const profit = totals.revenue - totals.cost;

  financeOverview.innerHTML = [
    { label: "Previsto", value: formatCurrency(totals.revenue) },
    { label: "Custos", value: formatCurrency(totals.cost) },
    { label: "Saldo", value: formatCurrency(profit) }
  ]
    .map(
      (item) => `
        <article class="finance-card">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </article>
      `
    )
    .join("");
}

function renderFilters() {
  const chips = [{ key: "all", label: "Todas" }].concat(
    Object.entries(activityTypes).map(([key, config]) => ({ key, label: config.shortLabel }))
  );

  filterChips.innerHTML = chips
    .map(
      (chip) => `
        <button class="filter-chip ${chip.key === state.activeFilter ? "is-active" : ""}" type="button" data-filter="${chip.key}">
          ${chip.label}
        </button>
      `
    )
    .join("");

  filterChips.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeFilter = button.dataset.filter;
      saveState();
      renderSchedule();
      renderFilters();
    });
  });
}

function renderSchedule() {
  scheduleGrid.innerHTML = daysOfWeek
    .map((day) => {
      const activities = sortActivities(state.activities.filter((activity) => activity.day === day.id));
      const visibleActivities = activities.filter(
        (activity) => state.activeFilter === "all" || activity.type === state.activeFilter
      );

      return `
        <article class="day-card">
          <div class="day-header">
            <div>
              <p class="day-label">Dia da semana</p>
              <h3>${day.label}</h3>
            </div>
            <span class="detail-badge">${visibleActivities.length}</span>
          </div>
          <div class="day-stack">
            ${
              visibleActivities.length
                ? visibleActivities
                    .map((activity) => {
                      const config = getActivityType(activity.type);
                      const timeStatus = getTimeStatus(activity);
                      const hasFinance = Number(activity.expectedAmount || 0) > 0 || Number(activity.estimatedCost || 0) > 0;
                      return `
                        <button class="schedule-item ${activity.id === state.selectedActivityId ? "is-selected" : ""} ${timeStatus}" type="button" data-activity-id="${activity.id}">
                          <span class="item-time">${formatTime(activity.time)}</span>
                          <h4 class="item-title">${escapeHtml(activity.title)}</h4>
                          <div class="type-pills">
                            <span class="meta-tag ${config.className}">${config.label}</span>
                          </div>
                          ${hasFinance ? `<p class="item-finance">Previsto: ${formatCurrency(activity.expectedAmount)} | Custo: ${formatCurrency(activity.estimatedCost)}</p>` : ""}
                          <p class="item-notes">${escapeHtml(activity.notes || "Sem observacoes adicionais.")}</p>
                        </button>
                      `;
                    })
                    .join("")
                : '<div class="empty-day">Nenhuma atividade para o filtro atual.</div>'
            }
          </div>
        </article>
      `;
    })
    .join("");

  scheduleGrid.querySelectorAll("[data-activity-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedActivityId = button.dataset.activityId;
      state.activeTab = "checklist";
      saveState();
      renderAll();
    });
  });
}

function getChecklistKey(activityId, itemIndex) {
  return `${activityId}:${itemIndex}`;
}

function renderDetail() {
  const activity = getSelectedActivity();

  if (!activity) {
    detailTitle.textContent = "Selecione uma atividade";
    detailBadge.textContent = "Sem selecao";
    detailMeta.innerHTML = "";
    detailBody.innerHTML = '<div class="detail-empty">Adicione ou selecione uma atividade para ver os lembretes.</div>';
    return;
  }

  const typeConfig = getActivityType(activity.type);

  detailTitle.textContent = activity.title;
  detailBadge.textContent = typeConfig.shortLabel;
  detailMeta.innerHTML = `
    <span class="meta-tag">${daysOfWeek.find((day) => day.id === activity.day).label}</span>
    <span class="meta-tag">${formatTime(activity.time)}</span>
    <span class="meta-tag ${typeConfig.className}">${typeConfig.label}</span>
  `;

  iconActions.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === state.activeTab);
  });

  if (state.activeTab === "checklist") {
    detailBody.innerHTML = `
      <article class="detail-card">
        <h3>Checklist de itens necessarios</h3>
        <div class="checklist-group">
          ${typeConfig.checklist
            .map((item, index) => {
              const key = getChecklistKey(activity.id, index);
              const checked = Boolean(state.checklistState[key]);
              return `
                <div class="checklist-item ${checked ? "is-done" : ""}">
                  <input type="checkbox" id="${key}" data-check-key="${key}" ${checked ? "checked" : ""} />
                  <label for="${key}">${escapeHtml(item)}</label>
                </div>
              `;
            })
            .join("")}
        </div>
      </article>
    `;

    detailBody.querySelectorAll("[data-check-key]").forEach((input) => {
      input.addEventListener("change", () => {
        state.checklistState[input.dataset.checkKey] = input.checked;
        saveState();
        renderDetail();
      });
    });
  }

  if (state.activeTab === "preparation") {
    detailBody.innerHTML = `
      <article class="detail-card">
        <h3>Passos para preparar o trabalho</h3>
        <ul class="prep-list">
          ${typeConfig.preparation.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>
      <article class="detail-card">
        <h3>Pontos de atencao</h3>
        <div class="type-pills">
          ${typeConfig.highlights.map((item) => `<span class="meta-tag">${escapeHtml(item)}</span>`).join("")}
        </div>
      </article>
    `;
  }

  if (state.activeTab === "notes") {
    detailBody.innerHTML = `
      <div class="detail-grid">
        <article class="detail-card note-card">
          <h3>Resumo do servico</h3>
          <p class="detail-text">${escapeHtml(activity.notes || "Sem observacoes registradas.")}</p>
        </article>
        <article class="detail-card note-card">
          <h3>Financeiro da atividade</h3>
          <p>Controle manual baseado nos valores preenchidos no cadastro.</p>
          <p>Valor previsto</p>
          <strong>${formatCurrency(activity.expectedAmount)}</strong>
          <p>Custo previsto</p>
          <strong>${formatCurrency(activity.estimatedCost)}</strong>
          <p>Saldo estimado</p>
          <strong>${formatCurrency(getActivityProfit(activity))}</strong>
        </article>
      </div>
      <article class="detail-card note-card">
        <h3>Controle rapido</h3>
        <p>Edite a atividade quando precisar ajustar horario, valor ou observacoes.</p>
        <div class="form-actions">
          <button class="button-secondary" type="button" id="editActivityButton">Editar atividade</button>
          <button class="remove-button" type="button" id="removeActivityButton">Excluir atividade</button>
        </div>
      </article>
    `;

    document.getElementById("editActivityButton").addEventListener("click", () => {
      state.editingActivityId = activity.id;
      fillFormForEdit(activity);
      saveState();
      window.location.hash = "cadastro";
    });

    document.getElementById("removeActivityButton").addEventListener("click", () => {
      state.activities = state.activities.filter((entry) => entry.id !== activity.id);
      state.selectedActivityId = state.activities[0] ? state.activities[0].id : "";
      if (state.editingActivityId === activity.id) {
        resetFormToCreateMode();
      }
      saveState();
      renderAll();
    });
  }
}

function renderAll() {
  ensureValidSelection();
  syncFormMode();
  renderSummary();
  renderFilters();
  renderSchedule();
  renderDetail();
}

function syncFormMode() {
  const editingActivity = getEditingActivity();

  if (editingActivity) {
    fillFormForEdit(editingActivity);
    return;
  }

  resetFormToCreateMode();
}

function ensureValidSelection() {
  if (!state.activities.some((activity) => activity.id === state.selectedActivityId)) {
    state.selectedActivityId = state.activities[0] ? state.activities[0].id : "";
  }
}

function toAmount(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

iconActions.forEach((button) => {
  button.addEventListener("click", () => {
    state.activeTab = button.dataset.tab;
    saveState();
    renderDetail();
  });
});

activityForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(activityForm);
  const type = String(formData.get("type"));
  const selectedType = getActivityType(type);
  const title = String(formData.get("title") || "").trim() || selectedType.label;
  const activityId = String(formData.get("activityId") || "").trim();

  const payload = {
    day: String(formData.get("day")),
    time: String(formData.get("time")),
    type,
    title,
    notes: String(formData.get("notes") || "").trim(),
    expectedAmount: toAmount(formData.get("expectedAmount")),
    estimatedCost: toAmount(formData.get("estimatedCost"))
  };

  if (activityId) {
    state.activities = state.activities.map((activity) =>
      activity.id === activityId ? { ...activity, ...payload } : activity
    );
    state.selectedActivityId = activityId;
    state.editingActivityId = "";
  } else {
    const activity = {
      id: `activity-${Date.now()}`,
      ...payload
    };

    state.activities.push(activity);
    state.selectedActivityId = activity.id;
  }

  state.activeFilter = "all";
  state.activeTab = "checklist";
  resetFormToCreateMode();
  saveState();
  renderAll();
});

cancelEditButton.addEventListener("click", () => {
  resetFormToCreateMode();
  saveState();
  renderAll();
});

resetButton.addEventListener("click", () => {
  state.activities = structuredClone(defaultActivities);
  state.selectedActivityId = defaultActivities[0].id;
  state.activeFilter = "all";
  state.activeTab = "checklist";
  state.editingActivityId = "";
  state.checklistState = {};
  resetFormToCreateMode();
  saveState();
  renderAll();
});

populateFormOptions();
resetFormToCreateMode();
renderAll();

