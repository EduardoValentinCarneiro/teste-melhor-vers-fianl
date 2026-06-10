(function () {
  const STORAGE_KEYS = {
    mode: "agrinho-mode",
    mural: "agrinho-mural",
    fontScale: "agrinho-font-scale",
    readingMode: "agrinho-reading-mode",
    achievements: "agrinho-achievements",
    defaultsVersion: "agrinho-defaults-version",
  };

  const DEFAULT_SETTINGS = {
    mode: "night",
    fontScale: "small",
    volume: 15,
    version: "2026-06-audio-defaults",
  };

  const fontScaleOrder = ["small", "normal", "large", "extra"];
  const mobileDialogQuery = window.matchMedia("(max-width: 820px)");

  const strategyValues = {
    irrigacao: {
      water: 16,
      biodiversity: 8,
      economy: 10,
      city: 6,
      highlight: "A irrigação inteligente reduz desperdício e protege nascentes.",
    },
    energia: {
      water: 4,
      biodiversity: 7,
      economy: 15,
      city: 7,
      highlight: "Energia limpa diminui custos e torna a produção mais resiliente.",
    },
    compostagem: {
      water: 7,
      biodiversity: 15,
      economy: 8,
      city: 5,
      highlight: "Compostagem devolve vida ao solo e reduz resíduos do processo produtivo.",
    },
    logistica: {
      water: 2,
      biodiversity: 5,
      economy: 11,
      city: 17,
      highlight: "Rotas mais conscientes encurtam distâncias e diminuem perdas até a cidade.",
    },
  };

  const focusBoost = {
    solo: { biodiversity: 10, water: 4, economy: 2, city: 1 },
    agua: { water: 12, biodiversity: 5, economy: 2, city: 1 },
    energia: { economy: 7, city: 4, biodiversity: 2, water: 1 },
    cidade: { city: 12, economy: 5, water: 2, biodiversity: 1 },
  };

  const messageByPeriod = {
    madrugada: {
      title: "Madrugada de monitoramento",
      text: "Mesmo no silêncio da noite, a tecnologia pode cuidar do campo com precisão e economia.",
    },
    manha: {
      title: "Manhã de cuidado",
      text: "Toda boa colheita começa em escolhas pequenas, repetidas com responsabilidade.",
    },
    tarde: {
      title: "Tarde de produtividade consciente",
      text: "Produzir mais faz sentido quando a natureza continua forte para o próximo ciclo.",
    },
    noite: {
      title: "Noite de reflexão",
      text: "A cidade também participa do equilíbrio quando consome com mais consciência.",
    },
  };

  const quotePool = [
    "Sustentabilidade é quando a produção de hoje não compromete a colheita de amanhã.",
    "Tecnologia faz mais sentido quando ajuda a cuidar da terra, da água e das pessoas.",
    "Cada alimento carrega uma historia. Quanto mais consciente o manejo, mais forte o futuro.",
    "Campo e cidade não competem: se completam quando existe responsabilidade dos dois lados.",
  ];

  const musicPlaylist = [
    {
      title: "Musica 1",
      src: "musica/musica1.mp3",
    },
    {
      title: "Musica 2",
      src: "musica/musica2.mp3",
    },
    {
      title: "Musica 3",
      src: "musica/musica3.mp3",
    },
  ];

  const ambientModes = [
    {
      title: "Bosque",
      description: "pássaros, folhas e clima de mata.",
      src: "musica/bosque.mp3",
    },
    {
      title: "Chuva",
      description: "chuva leve para uma sensação de cuidado com a água.",
      src: "musica/chuva.mp3",
    },
    {
      title: "Vento",
      description: "brisa constante para leitura tranquila.",
      src: "musica/vento.mp3",
    },
  ];

  const priorityText = {
    agua: "defender o uso inteligente da água",
    solo: "valorizar a saúde do solo",
    energia: "ampliar a energia limpa no agro",
    consumo: "estimular um consumo mais consciente na cidade",
  };

  const roleText = {
    estudante: "Como estudante, eu quero aprender, compartilhar e agir com responsabilidade.",
    campo: "Falando a partir do campo, eu reconheço que produzir bem também é preservar.",
    cidade: "Falando a partir da cidade, eu escolho consumir com mais consciência e respeito pela origem.",
  };

  const focusLabel = {
    solo: "proteção do solo",
    agua: "cuidado com a água",
    energia: "energia limpa",
    cidade: "aproximação entre campo e cidade",
  };

  const timelineData = {
    antes: {
      title: "Antes: perdas e desgaste",
      text: "Manejo sem planejamento, desperdício de água e perda de solo reduziam a produtividade e aumentavam a pressão sobre a natureza.",
      items: [
        "Desmatamento e erosão diminuem a vida do solo.",
        "Desperdício de alimento enfraquece a segurança alimentar.",
        "Consumo distante da origem dificulta escolhas conscientes.",
      ],
    },
    hoje: {
      title: "Hoje: tecnologia no campo",
      text: "Sensores, irrigação inteligente, plantio direto, cooperação e dados ajudam o produtor a decidir com mais precisão.",
      items: [
        "Agricultura de precisão usa dados para reduzir perdas.",
        "Irrigação planejada protege a água e melhora a eficiência.",
        "Rotação de culturas e cobertura vegetal fortalecem o solo.",
      ],
    },
    futuro: {
      title: "Futuro: equilíbrio permanente",
      text: "O objetivo e produzir alimentos com energia limpa, biodiversidade protegida, renda no campo e consumidores mais conscientes.",
      items: [
        "Energia limpa e automação tornam a produção mais resiliente.",
        "Áreas de preservação protegem nascentes, fauna e flora.",
        "Campo e cidade compartilham responsabilidade pelo alimento.",
      ],
    },
  };

  const quizQuestions = [
    {
      question: "Qual prática ajuda a preservar o solo?",
      options: ["Queimada", "Rotação de culturas", "Desmatamento"],
      answer: 1,
      explanation: "A rotação de culturas ajuda a manter nutrientes, reduzir pragas e proteger a estrutura do solo.",
    },
    {
      question: "O que a irrigação inteligente busca reduzir?",
      options: ["Desperdício de água", "Biodiversidade", "Cobertura vegetal"],
      answer: 0,
      explanation: "Sensores e planejamento levam água na medida certa, diminuindo perdas e aumentando eficiência.",
    },
    {
      question: "Por que reduzir perda e desperdício de alimentos é importante?",
      options: ["Aumenta a pressão sobre o campo", "Melhora disponibilidade e evita uso desnecessário de recursos", "Impede a produção local"],
      answer: 1,
      explanation: "Quando menos alimento se perde, água, energia, solo e trabalho são melhor aproveitados.",
    },
    {
      question: "Qual fonte de energia combina com uma fazenda mais sustentável?",
      options: ["Energia solar", "Queima de residuos sem controle", "Motor ligado sem necessidade"],
      answer: 0,
      explanation: "A energia solar reduz custos e diminui a dependência de fontes mais poluentes.",
    },
    {
      question: "O que uma mata ciliar ajuda a proteger?",
      options: ["Apenas estradas", "Rios, nascentes e biodiversidade", "Somente maquinas agricolas"],
      answer: 1,
      explanation: "A vegetação nas margens protege a água, reduz erosão e cria abrigo para espécies.",
    },
    {
      question: "Como a cidade participa do agro sustentável?",
      options: ["Desperdiçando mais", "Valorizando origem, reduzindo perdas e consumindo com consciência", "Ignorando o produtor"],
      answer: 1,
      explanation: "O consumo consciente reconhece boas práticas e fortalece a ponte entre campo e cidade.",
    },
  ];

  const achievementDefinitions = [
    { id: "agua", title: "Guardião da Água", description: "Explorou o rio ou ativou práticas de cuidado com a água." },
    { id: "solo", title: "Defensor do Solo", description: "Investigou plantio, rotação de culturas e saúde do solo." },
    { id: "energia", title: "Energia Limpa", description: "Conheceu a área solar e escolhas de baixo impacto." },
    { id: "pesquisa", title: "Pesquisador do Agro", description: "Visitou os dados reais e conectou o site a fontes oficiais." },
    { id: "quiz", title: "Aprendiz Sustentavel", description: "Concluiu o quiz educativo do projeto." },
    { id: "compromisso", title: "Voz do Futuro", description: "Gerou e guardou um manifesto no mural." },
  ];

  const pageSummaryText =
    "Raiz Up apresenta o tema Agro forte, futuro sustentável. O site mostra simulador, dados reais, galeria de imagens, mapa interativo, quiz, conquistas, sons ambientais e compromisso pessoal para aproximar campo, cidade e meio ambiente.";

  const html = document.documentElement;
  const body = document.body;
  const faviconLink = document.getElementById("faviconLink");
  const brandMarkImage = document.getElementById("brandMarkImage");
  const settingsToggleButton = document.getElementById("settingsToggleButton");
  const settingsCloseButton = document.getElementById("settingsCloseButton");
  const settingsOverlay = document.getElementById("settingsOverlay");
  const settingsPanel = document.getElementById("settingsPanel");
  const themeChoiceButtons = Array.from(document.querySelectorAll("[data-theme-choice]"));
  const quoteButton = document.getElementById("quoteButton");
  const dayMessageTitle = document.getElementById("dayMessageTitle");
  const dayMessageText = document.getElementById("dayMessageText");
  const themeAudio = document.getElementById("themeAudio");
  const audioPrevButton = document.getElementById("audioPrevButton");
  const audioToggleButton = document.getElementById("audioToggleButton");
  const audioNextButton = document.getElementById("audioNextButton");
  const audioVolumeRange = document.getElementById("audioVolumeRange");
  const audioStatus = document.getElementById("audioStatus");
  const ambientAudio = document.getElementById("ambientAudio");
  const ambientPrevButton = document.getElementById("ambientPrevButton");
  const ambientToggleButton = document.getElementById("ambientToggleButton");
  const ambientNextButton = document.getElementById("ambientNextButton");
  const ambientVolumeRange = document.getElementById("ambientVolumeRange");
  const ambientStatus = document.getElementById("ambientStatus");
  const fontDecreaseButton = document.getElementById("fontDecreaseButton");
  const fontResetButton = document.getElementById("fontResetButton");
  const fontIncreaseButton = document.getElementById("fontIncreaseButton");
  const readerButton = document.getElementById("readerButton");
  const readerStopButton = document.getElementById("readerStopButton");
  const readingModeButton = document.getElementById("readingModeButton");
  const readerStatus = document.getElementById("readerStatus");
  const achievementList = document.getElementById("achievementList");
  const achievementToastArea = document.getElementById("achievementToastArea");
  const quickDock = document.getElementById("quickDock");
  const quickDockPanel = document.getElementById("quickDockPanel");
  const quickDockToggleButton = document.getElementById("quickDockToggleButton");
  const quickMusicStatus = document.getElementById("quickMusicStatus");
  const quickMusicPrevButton = document.getElementById("quickMusicPrevButton");
  const quickMusicToggleButton = document.getElementById("quickMusicToggleButton");
  const quickMusicNextButton = document.getElementById("quickMusicNextButton");
  const quickAmbientStatus = document.getElementById("quickAmbientStatus");
  const quickAmbientPrevButton = document.getElementById("quickAmbientPrevButton");
  const quickAmbientToggleButton = document.getElementById("quickAmbientToggleButton");
  const quickAmbientNextButton = document.getElementById("quickAmbientNextButton");
  const quickReaderStatus = document.getElementById("quickReaderStatus");
  const quickReaderButton = document.getElementById("quickReaderButton");
  const quickReaderStopButton = document.getElementById("quickReaderStopButton");
  const quickTopButton = document.getElementById("quickTopButton");
  const quickAchievementCount = document.getElementById("quickAchievementCount");

  const careRange = document.getElementById("careRange");
  const careRangeValue = document.getElementById("careRangeValue");
  const focusSelect = document.getElementById("focusSelect");
  const strategyInputs = Array.from(document.querySelectorAll('input[name="strategy"]'));
  const resetScenarioButton = document.getElementById("resetScenarioButton");
  const simulatorMobileOpenButton = document.getElementById("simulatorMobileOpenButton");
  const simulatorMobileCloseButton = document.getElementById("simulatorMobileCloseButton");

  const balanceGauge = document.getElementById("balanceGauge");
  const balanceScore = document.getElementById("balanceScore");
  const balanceLevel = document.getElementById("balanceLevel");
  const waterMetric = document.getElementById("waterMetric");
  const biodiversityMetric = document.getElementById("biodiversityMetric");
  const economyMetric = document.getElementById("economyMetric");
  const cityMetric = document.getElementById("cityMetric");
  const impactNarrative = document.getElementById("impactNarrative");
  const impactHighlights = document.getElementById("impactHighlights");
  const timelineButtons = Array.from(document.querySelectorAll("[data-timeline]"));
  const dataSourceLinks = Array.from(document.querySelectorAll(".data-card a"));
  const timelineTitle = document.getElementById("timelineTitle");
  const timelineText = document.getElementById("timelineText");
  const timelineList = document.getElementById("timelineList");

  const pledgeForm = document.getElementById("pledgeForm");
  const pledgePreview = document.getElementById("pledgePreview");
  const pledgeStatus = document.getElementById("pledgeStatus");
  const savePledgeButton = document.getElementById("savePledgeButton");
  const clearPledgesButton = document.getElementById("clearPledgesButton");
  const pledgeWall = document.getElementById("pledgeWall");
  const zoneButtons = Array.from(document.querySelectorAll("[data-zone]"));
  const zoneTitle = document.getElementById("zoneTitle");
  const zoneText = document.getElementById("zoneText");
  const zoneFieldValue = document.getElementById("zoneFieldValue");
  const zoneNatureValue = document.getElementById("zoneNatureValue");
  const zoneCityValue = document.getElementById("zoneCityValue");
  const zoneSignalValue = document.getElementById("zoneSignalValue");
  const zoneSignalText = document.getElementById("zoneSignalText");
  const zonePracticeList = document.getElementById("zonePracticeList");
  const observatoryMobileOpenButton = document.getElementById("observatoryMobileOpenButton");
  const observatoryMobileCloseButton = document.getElementById("observatoryMobileCloseButton");
  const observatoryDetailCloseButton = document.getElementById("observatoryDetailCloseButton");
  const quizStartButton = document.getElementById("quizStartButton");
  const quizSectionResult = document.getElementById("quizSectionResult");
  const quizModalOverlay = document.getElementById("quizModalOverlay");
  const quizModal = document.getElementById("quizModal");
  const quizCloseButton = document.getElementById("quizCloseButton");
  const quizProgressFill = document.getElementById("quizProgressFill");
  const quizCounter = document.getElementById("quizCounter");
  const quizQuestion = document.getElementById("quizQuestion");
  const quizOptions = document.getElementById("quizOptions");
  const quizFeedback = document.getElementById("quizFeedback");
  const quizNextButton = document.getElementById("quizNextButton");
  const quizRestartButton = document.getElementById("quizRestartButton");
  const quizScoreValue = document.getElementById("quizScoreValue");
  const quizResultText = document.getElementById("quizResultText");

  let currentManifesto = "";
  let settingsHideTimer = null;
  let activeZone = "plantio";
  let currentMusicIndex = 0;
  let currentAmbientIndex = 0;
  let ambientPlaying = false;
  let achievementAudioContext = null;
  let summaryUtterance = null;
  let readingSummary = false;
  let currentFontScale = "normal";
  let activeTimeline = "antes";
  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;
  let quizCompleted = false;
  let quizHideTimer = null;
  let activeQuizQuestions = [];
  const unlockedAchievements = new Set(getStoredAchievements());
  const currentScenarioReadings = {
    water: 0,
    biodiversity: 0,
    economy: 0,
    city: 0,
    score: 0,
    focus: "solo",
  };

  function getPeriodMessage() {
    const hour = new Date().getHours();

    if (hour < 6) {
      return messageByPeriod.madrugada;
    }

    if (hour < 12) {
      return messageByPeriod.manha;
    }

    if (hour < 18) {
      return messageByPeriod.tarde;
    }

    return messageByPeriod.noite;
  }

  function syncThemeButtons(mode) {
    themeChoiceButtons.forEach((button) => {
      const isActive = button.dataset.themeChoice === mode;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function setTheme(mode) {
    const nextMode = mode === "night" ? "night" : "day";
    html.dataset.mode = nextMode;
    localStorage.setItem(STORAGE_KEYS.mode, nextMode);
    syncThemeButtons(nextMode);
  }

  function applyDefaultPreferences() {
    if (localStorage.getItem(STORAGE_KEYS.defaultsVersion) === DEFAULT_SETTINGS.version) {
      return;
    }

    localStorage.setItem(STORAGE_KEYS.mode, DEFAULT_SETTINGS.mode);
    localStorage.setItem(STORAGE_KEYS.fontScale, DEFAULT_SETTINGS.fontScale);
    localStorage.setItem(STORAGE_KEYS.defaultsVersion, DEFAULT_SETTINGS.version);
  }

  function applyStoredMode() {
    const storedMode = localStorage.getItem(STORAGE_KEYS.mode);
    setTheme(storedMode === "day" ? "day" : "night");
  }

  function applyFontScale(scale) {
    currentFontScale = fontScaleOrder.includes(scale) ? scale : "normal";
    if (currentFontScale === "normal") {
      delete html.dataset.fontScale;
    } else {
      html.dataset.fontScale = currentFontScale;
    }
    localStorage.setItem(STORAGE_KEYS.fontScale, currentFontScale);
    readerStatus.textContent = `Tamanho da fonte ajustado para ${currentFontScale}.`;
  }

  function changeFontScale(direction) {
    const currentIndex = fontScaleOrder.indexOf(currentFontScale);
    const nextIndex = Math.max(0, Math.min(fontScaleOrder.length - 1, currentIndex + direction));
    applyFontScale(fontScaleOrder[nextIndex]);
  }

  function applyReadingMode(enabled) {
    body.classList.toggle("reading-mode", enabled);
    readingModeButton.setAttribute("aria-pressed", enabled ? "true" : "false");
    readingModeButton.textContent = enabled ? "Sair do modo leitura" : "Modo leitura";
    faviconLink.href = enabled ? "./img/favicon2.png" : "./img/favicon.png";
    brandMarkImage.src = enabled ? "./img/favicon2.png" : "./img/favicon.png";
    localStorage.setItem(STORAGE_KEYS.readingMode, enabled ? "true" : "false");
  }

  function wrapIndex(index, total) {
    return ((index % total) + total) % total;
  }

  function getCurrentMusicTrack() {
    return musicPlaylist[currentMusicIndex] || musicPlaylist[0];
  }

  function getCurrentAmbientMode() {
    return ambientModes[currentAmbientIndex] || ambientModes[0];
  }

  function setQuickDockOpen(open) {
    body.classList.toggle("quick-dock-open", open);
    quickDockPanel.setAttribute("aria-hidden", open ? "false" : "true");
    quickDockPanel.inert = !open;
    quickDockToggleButton.setAttribute("aria-expanded", open ? "true" : "false");
    quickDockToggleButton.setAttribute("aria-label", open ? "Fechar atalhos rapidos" : "Abrir atalhos rapidos");
  }

  function updateQuickDockState() {
    const track = getCurrentMusicTrack();
    const ambientMode = getCurrentAmbientMode();
    const musicPlaying = !themeAudio.paused && !themeAudio.ended;
    ambientPlaying = !ambientAudio.paused && !ambientAudio.ended;

    quickDock.classList.toggle("is-music-active", musicPlaying);
    quickDock.classList.toggle("is-nature-active", ambientPlaying);
    quickDock.classList.toggle("is-reading-active", readingSummary);

    audioToggleButton.textContent = musicPlaying ? "Pause" : "Play";
    audioToggleButton.setAttribute("aria-label", musicPlaying ? "Pausar música do site" : "Tocar música do site");
    quickMusicToggleButton.textContent = musicPlaying ? "Pause" : "Play";
    quickMusicToggleButton.setAttribute("aria-label", musicPlaying ? "Pausar música" : "Tocar música");
    quickMusicStatus.textContent = `${musicPlaying ? "Tocando" : "Pausada"} | ${currentMusicIndex + 1}/${musicPlaylist.length} - ${track.title}`;

    ambientToggleButton.textContent = ambientPlaying ? "Pause" : "Play";
    ambientToggleButton.setAttribute("aria-label", ambientPlaying ? "Pausar sons ambientais" : "Ativar sons ambientais");
    quickAmbientToggleButton.textContent = ambientPlaying ? "Pause" : "Play";
    quickAmbientToggleButton.setAttribute("aria-label", ambientPlaying ? "Pausar sons da natureza" : "Ativar sons da natureza");
    quickAmbientStatus.textContent = `${ambientPlaying ? "Ativo" : "Pausado"} | ${currentAmbientIndex + 1}/${ambientModes.length} - ${ambientMode.title}`;

    quickReaderButton.textContent = readingSummary ? "Lendo" : "Ler";
    quickReaderStopButton.disabled = !readingSummary;
    readerStopButton.disabled = !readingSummary;
    quickReaderStatus.textContent = readingSummary ? "Resumo em leitura" : "Leitura pronta";

    quickAchievementCount.textContent = `${unlockedAchievements.size}/${achievementDefinitions.length}`;
  }

  function readPageSummary() {
    if (!("speechSynthesis" in window)) {
      readerStatus.textContent = "A leitura em voz alta não está disponível neste navegador.";
      updateQuickDockState();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(pageSummaryText);
    summaryUtterance = utterance;
    utterance.lang = "pt-BR";
    utterance.rate = 0.95;
    utterance.onend = function () {
      readingSummary = false;
      summaryUtterance = null;
      readerStatus.textContent = "Leitura finalizada.";
      updateQuickDockState();
    };
    utterance.onerror = function () {
      readingSummary = false;
      summaryUtterance = null;
      readerStatus.textContent = "A leitura foi interrompida.";
      updateQuickDockState();
    };
    readingSummary = true;
    window.speechSynthesis.speak(utterance);
    readerStatus.textContent = "Resumo em leitura. Você pode continuar navegando pelo site.";
    updateQuickDockState();
  }

  function stopPageSummary() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    summaryUtterance = null;
    readingSummary = false;
    readerStatus.textContent = "Leitura parada.";
    updateQuickDockState();
  }

  function openSettings() {
    clearTimeout(settingsHideTimer);
    settingsOverlay.hidden = false;
    settingsPanel.hidden = false;
    window.requestAnimationFrame(function () {
      body.classList.add("settings-open");
    });
    settingsPanel.setAttribute("aria-hidden", "false");
    settingsToggleButton.setAttribute("aria-expanded", "true");
    settingsToggleButton.setAttribute("aria-label", "Fechar menu de configuração");
  }

  function closeSettings() {
    body.classList.remove("settings-open");
    settingsPanel.setAttribute("aria-hidden", "true");
    settingsToggleButton.setAttribute("aria-expanded", "false");
    settingsToggleButton.setAttribute("aria-label", "Abrir menu de configuração");
    settingsHideTimer = window.setTimeout(function () {
      settingsOverlay.hidden = true;
      settingsPanel.hidden = true;
    }, 220);
  }

  function setDayMessage(message) {
    dayMessageTitle.textContent = message.title;
    dayMessageText.textContent = message.text;
  }

  function animateValue(element, target) {
    const startValue = Number(element.dataset.value || "0");
    const startTime = performance.now();
    const duration = 420;

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.round(startValue + (target - startValue) * progress);
      element.textContent = String(value);
      element.dataset.value = String(value);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  function getSelectedStrategies() {
    return strategyInputs.filter((input) => input.checked).map((input) => input.value);
  }

  function buildNarrative(score, focus, selectedStrategies) {
    if (selectedStrategies.length === 0) {
      return "Sem práticas ativas, o sistema perde eficiência, o ambiente fica vulnerável e o futuro da produção enfraquece.";
    }

    if (score >= 85) {
      return `O cenário está muito forte. O foco em ${focusLabel[focus]} se soma a boas práticas e mostra que produzir com inteligência pode proteger o ambiente e fortalecer a cidade ao mesmo tempo.`;
    }

    if (score >= 65) {
      return "O caminho está consistente. Já existe equilíbrio, mas novas escolhas podem ampliar o impacto positivo e deixar a cadeia produtiva ainda mais sustentável.";
    }

    if (score >= 45) {
      return "O cenário tem potencial, mas ainda depende de ajustes para evitar perdas ambientais e garantir mais estabilidade econômica.";
    }

    return "O equilíbrio ainda está frágil. Falta integrar melhor tecnologia, preservação ambiental e conexão com quem consome.";
  }

  function renderHighlights(selectedStrategies, focus) {
    impactHighlights.innerHTML = "";
    const highlights = selectedStrategies.map((strategy) => strategyValues[strategy].highlight);

    if (focus === "solo") {
      highlights.push("Quando o solo e bem cuidado, a produtividade deixa de ser imediatista e ganha continuidade.");
    } else if (focus === "agua") {
      highlights.push("Água preservada no campo representa segurança produtiva e proteção ambiental.");
    } else if (focus === "energia") {
      highlights.push("Energia limpa reduz custos e ajuda o agro a crescer com menos pressao ambiental.");
    } else {
      highlights.push("Campo e cidade se aproximam quando a origem do alimento é valorizada com mais clareza.");
    }

    highlights.slice(0, 4).forEach((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      impactHighlights.appendChild(item);
    });
  }

  function updateScenario() {
    // Soma as escolhas do usuário e converte isso em indicadores visuais do cenário.
    const selectedStrategies = getSelectedStrategies();
    const intensity = Number(careRange.value);
    const focus = focusSelect.value;
    const totals = {
      water: 18,
      biodiversity: 18,
      economy: 18,
      city: 18,
    };

    selectedStrategies.forEach((strategy) => {
      const data = strategyValues[strategy];
      totals.water += data.water;
      totals.biodiversity += data.biodiversity;
      totals.economy += data.economy;
      totals.city += data.city;
    });

    const focusData = focusBoost[focus];
    totals.water += focusData.water;
    totals.biodiversity += focusData.biodiversity;
    totals.economy += focusData.economy;
    totals.city += focusData.city;

    const multiplier = 1 + intensity * 0.09;
    const finalWater = Math.min(100, Math.round(totals.water * multiplier));
    const finalBiodiversity = Math.min(100, Math.round(totals.biodiversity * multiplier));
    const finalEconomy = Math.min(100, Math.round(totals.economy * multiplier));
    const finalCity = Math.min(100, Math.round(totals.city * multiplier));
    const finalScore = Math.round(
      (finalWater + finalBiodiversity + finalEconomy + finalCity) / 4
    );

    careRangeValue.textContent = String(intensity);
    balanceGauge.style.setProperty("--score-angle", `${finalScore * 3.6}deg`);
    animateValue(balanceScore, finalScore);

    if (finalScore >= 85) {
      balanceLevel.textContent = "Equilíbrio exemplar";
    } else if (finalScore >= 65) {
      balanceLevel.textContent = "Cenário promissor";
    } else if (finalScore >= 45) {
      balanceLevel.textContent = "Precisa evoluir";
    } else {
      balanceLevel.textContent = "Equilíbrio frágil";
    }

    waterMetric.textContent = `${finalWater}%`;
    biodiversityMetric.textContent = `${finalBiodiversity}%`;
    economyMetric.textContent = `${finalEconomy}%`;
    cityMetric.textContent = `${finalCity}%`;
    impactNarrative.textContent = buildNarrative(finalScore, focus, selectedStrategies);
    renderHighlights(selectedStrategies, focus);
    currentScenarioReadings.water = finalWater;
    currentScenarioReadings.biodiversity = finalBiodiversity;
    currentScenarioReadings.economy = finalEconomy;
    currentScenarioReadings.city = finalCity;
    currentScenarioReadings.score = finalScore;
    currentScenarioReadings.focus = focus;
    renderZoneProfile(activeZone, false);
  }

  function buildManifesto() {
    const formData = new FormData(pledgeForm);
    const name = String(formData.get("personName") || "").trim();
    const role = String(formData.get("personRole") || "estudante");
    const priority = String(formData.get("personPriority") || "agua");
    const action = String(formData.get("personAction") || "").trim();
    const prefix = name ? `${name} afirma:` : "Eu afirmo:";

    return `${prefix} ${roleText[role]} Por isso, escolho ${priorityText[priority]} e transformar em prática a seguinte atitude: ${action || "agir todos os dias com mais consciência para aproximar produção, natureza e sociedade."}`;
  }

  function getStoredPledges() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.mural);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  }

  function saveStoredPledges(pledges) {
    localStorage.setItem(STORAGE_KEYS.mural, JSON.stringify(pledges));
  }

  function getStoredAchievements() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.achievements);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  }

  function saveAchievements() {
    localStorage.setItem(STORAGE_KEYS.achievements, JSON.stringify(Array.from(unlockedAchievements)));
  }

  function renderAchievements() {
    achievementList.innerHTML = "";

    achievementDefinitions.forEach((achievement) => {
      const unlocked = unlockedAchievements.has(achievement.id);
      const item = document.createElement("article");
      item.className = `achievement-item${unlocked ? " is-unlocked" : ""}`;

      const title = document.createElement("strong");
      title.textContent = `${unlocked ? "Liberada" : "Bloqueada"}: ${achievement.title}`;

      const description = document.createElement("span");
      description.textContent = achievement.description;

      item.append(title, description);
      achievementList.appendChild(item);
    });

    updateQuickDockState();
  }

  async function playAchievementSound() {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextConstructor) {
      return;
    }

    try {
      if (!achievementAudioContext) {
        achievementAudioContext = new AudioContextConstructor();
      }

      if (achievementAudioContext.state === "suspended") {
        await achievementAudioContext.resume();
      }

      const now = achievementAudioContext.currentTime;
      const masterGain = achievementAudioContext.createGain();
      const notes = [523.25, 659.25, 783.99, 1046.5];
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.exponentialRampToValueAtTime(0.15, now + 0.02);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);
      masterGain.connect(achievementAudioContext.destination);

      notes.forEach((frequency, index) => {
        const oscillator = achievementAudioContext.createOscillator();
        const noteGain = achievementAudioContext.createGain();
        const startAt = now + index * 0.055;
        const stopAt = startAt + 0.16;
        oscillator.type = index === notes.length - 1 ? "triangle" : "square";
        oscillator.frequency.setValueAtTime(frequency, startAt);
        noteGain.gain.setValueAtTime(0.0001, startAt);
        noteGain.gain.exponentialRampToValueAtTime(0.15, startAt + 0.015);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, stopAt);
        oscillator.connect(noteGain);
        noteGain.connect(masterGain);
        oscillator.start(startAt);
        oscillator.stop(stopAt + 0.02);
      });

      window.setTimeout(function () {
        masterGain.disconnect();
      }, 620);
    } catch (error) {
      // Alguns navegadores bloqueiam áudio fora de uma ação direta do usuário.
    }
  }

  function showAchievementToast(achievement) {
    if (!achievementToastArea || !achievement) {
      return;
    }

    while (achievementToastArea.children.length >= 3) {
      achievementToastArea.firstElementChild.remove();
    }

    const toast = document.createElement("article");
    toast.className = "achievement-toast";
    toast.setAttribute("role", "status");

    const badge = document.createElement("span");
    badge.className = "achievement-toast-badge";
    badge.setAttribute("aria-hidden", "true");
    badge.textContent = "XP";

    const copy = document.createElement("div");
    copy.className = "achievement-toast-copy";

    const label = document.createElement("span");
    label.textContent = "Conquista desbloqueada";

    const title = document.createElement("strong");
    title.textContent = achievement.title;

    const description = document.createElement("p");
    description.textContent = achievement.description;

    copy.append(label, title, description);
    toast.append(badge, copy);
    achievementToastArea.appendChild(toast);

    window.setTimeout(function () {
      toast.remove();
    }, 4200);
  }

  function unlockAchievement(id) {
    if (unlockedAchievements.has(id)) {
      return;
    }

    const achievement = achievementDefinitions.find((entry) => entry.id === id);
    unlockedAchievements.add(id);
    saveAchievements();
    renderAchievements();
    showAchievementToast(achievement);
    playAchievementSound();
  }

  function renderPledgeWall() {
    // O mural usa localStorage para manter as mensagens nesta maquina.
    const pledges = getStoredPledges();
    pledgeWall.innerHTML = "";

    if (pledges.length === 0) {
      const emptyState = document.createElement("div");
      emptyState.className = "empty-state";
      emptyState.textContent = "Ainda não há compromissos salvos. Gere um manifesto e guarde sua mensagem.";
      pledgeWall.appendChild(emptyState);
      return;
    }

    pledges.forEach((pledge) => {
      const card = document.createElement("article");
      card.className = "mural-card";

      const title = document.createElement("strong");
      title.textContent = pledge.name;

      const text = document.createElement("p");
      text.textContent = pledge.message;

      const label = document.createElement("small");
      label.textContent = `${pledge.role} | ${pledge.priority}`;

      card.append(title, text, label);
      pledgeWall.appendChild(card);
    });
  }

  function observeReveals() {
    // Revela os blocos aos poucos para reforcar a leitura da narrativa.
    const revealTargets = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealTargets.forEach((target) => observer.observe(target));
  }

  function updateAudioMessage(message) {
    audioStatus.textContent = message;
    updateQuickDockState();
  }

  async function playThemeAudio() {
    const track = getCurrentMusicTrack();

    try {
      if (!themeAudio.getAttribute("src")) {
        themeAudio.src = track.src;
      }
      await themeAudio.play();
      updateAudioMessage(`Tocando agora: ${track.title}.`);
    } catch (error) {
      updateAudioMessage(`Não foi possível tocar agora. Confira se o navegador permite áudio e se ${track.src} está na pasta musica.`);
    }
  }

  function pauseThemeAudio() {
    themeAudio.pause();
    updateAudioMessage("Trilha pausada.");
  }

  function changeMusicTrack(direction) {
    const shouldKeepPlaying = !themeAudio.paused;
    currentMusicIndex = wrapIndex(currentMusicIndex + direction, musicPlaylist.length);
    themeAudio.src = getCurrentMusicTrack().src;
    themeAudio.load();

    if (shouldKeepPlaying) {
      playThemeAudio();
      return;
    }

    updateAudioMessage(`Faixa selecionada: ${getCurrentMusicTrack().title}.`);
  }

  function toggleThemeAudio() {
    if (themeAudio.paused) {
      playThemeAudio();
      return;
    }

    pauseThemeAudio();
  }

  async function startAmbientSound() {
    const ambientMode = getCurrentAmbientMode();

    try {
      if (ambientAudio.getAttribute("src") !== ambientMode.src) {
        ambientAudio.src = ambientMode.src;
        ambientAudio.load();
      }

      ambientAudio.volume = Number(ambientVolumeRange.value) / 100;
      await ambientAudio.play();
      ambientPlaying = true;
      ambientStatus.textContent = `Ambiente ativo: ${ambientMode.title}, com ${ambientMode.description}`;
      unlockAchievement("agua");
      updateQuickDockState();
    } catch (error) {
      ambientPlaying = false;
      ambientStatus.textContent = `Não foi possível tocar ${ambientMode.title}. Confira se o navegador permite áudio e se ${ambientMode.src} está na pasta musica.`;
      updateQuickDockState();
    }
  }

  function stopAmbientSound(options = {}) {
    ambientAudio.pause();
    ambientPlaying = false;
    if (!options.keepStatus) {
      ambientStatus.textContent = "Sons ambientais pausados.";
    }
    updateQuickDockState();
  }

  function toggleAmbientSound() {
    if (ambientPlaying) {
      stopAmbientSound();
      return;
    }

    startAmbientSound();
  }

  function changeAmbientMode(direction) {
    const shouldKeepPlaying = ambientPlaying;

    if (ambientPlaying) {
      stopAmbientSound({ keepStatus: true });
    }

    currentAmbientIndex = wrapIndex(currentAmbientIndex + direction, ambientModes.length);
    ambientAudio.src = getCurrentAmbientMode().src;
    ambientAudio.load();

    if (shouldKeepPlaying) {
      startAmbientSound();
      return;
    }

    const ambientMode = getCurrentAmbientMode();
    ambientStatus.textContent = `Modo selecionado: ${ambientMode.title}, com ${ambientMode.description}`;
    updateQuickDockState();
  }

  const zoneProfiles = {
    plantio: {
      title: "Área de plantio",
      text: "O plantio sustentável combina rotação de culturas, cobertura vegetal e adubação orgânica para produzir sem esgotar o solo.",
      field: 96,
      nature: 94,
      city: 88,
      practices: [
        "Cobertura vegetal para evitar erosão e manter umidade.",
        "Rotação de culturas para reduzir desgaste e pragas.",
        "Compostagem para devolver vida orgânica ao solo.",
      ],
    },
    rio: {
      title: "Rio e nascente",
      text: "Irrigação planejada, proteção das nascentes e monitoramento reduzem desperdício e garantem segurança hídrica para a propriedade.",
      field: 93,
      nature: 97,
      city: 82,
      practices: [
        "Irrigação precisa para levar água apenas onde a planta precisa.",
        "Proteção das nascentes e margens para preservar o ciclo natural.",
        "Leitura constante do clima para evitar excessos e faltas.",
      ],
    },
    solar: {
      title: "Energia solar",
      text: "Painéis solares, automação e equipamentos eficientes ajudam a reduzir custos e deixam a produção mais moderna e resiliente.",
      field: 90,
      nature: 84,
      city: 80,
      practices: [
        "Painéis solares para ampliar autonomia da propriedade.",
        "Sensores e automação para evitar gasto desnecessário.",
        "Planejamento energético para produzir com mais estabilidade.",
      ],
    },
    preservacao: {
      title: "Área de preservação",
      text: "A biodiversidade fortalece o equilíbrio natural, melhora o solo, protege os polinizadores e reduz a pressão sobre o ambiente.",
      field: 89,
      nature: 98,
      city: 78,
      practices: [
        "Corredores verdes para manter especies e polinizadores.",
        "Menor pressao ambiental com manejo mais equilibrado.",
        "Diversidade de plantas para reforçar a saúde do ecossistema.",
      ],
    },
    cidade: {
      title: "Cidade mais conectada com a origem",
      text: "Quando o transporte e o consumo valorizam boas práticas, o alimento chega com mais qualidade e o produtor encontra reconhecimento pelo cuidado que teve no campo.",
      field: 87,
      nature: 79,
      city: 96,
      practices: [
        "Rotas mais conscientes para reduzir perdas e desperdício.",
        "Mercados e famílias mais atentos à origem do alimento.",
        "Consumo informado que valoriza responsabilidade ambiental.",
      ],
    },
  };

  function getZoneSignalValue(zoneKey) {
    if (zoneKey === "plantio") {
      return Math.round((currentScenarioReadings.biodiversity + currentScenarioReadings.economy) / 2);
    }

    if (zoneKey === "rio") {
      return currentScenarioReadings.water;
    }

    if (zoneKey === "solar") {
      return currentScenarioReadings.economy;
    }

    if (zoneKey === "preservacao") {
      return Math.round((currentScenarioReadings.biodiversity + currentScenarioReadings.water) / 2);
    }

    return currentScenarioReadings.city;
  }

  function getZoneSignalText(zoneKey, value) {
    const isFocusMatch =
      currentScenarioReadings.focus === zoneKey ||
      (zoneKey === "plantio" && currentScenarioReadings.focus === "solo") ||
      (zoneKey === "rio" && currentScenarioReadings.focus === "agua") ||
      (zoneKey === "solar" && currentScenarioReadings.focus === "energia") ||
      (zoneKey === "preservacao" && currentScenarioReadings.focus === "solo");

    if (value >= 85) {
      return `${isFocusMatch ? "O foco escolhido no simulador reforça muito este ponto." : "O cenário atual já sustenta muito bem esta área da propriedade."}`;
    }

    if (value >= 65) {
      return `${isFocusMatch ? "O caminho está promissor e pode crescer ainda mais com novas práticas." : "Esta área está bem encaminhada, mas ainda pode evoluir com mais cuidado."}`;
    }

    if (value >= 45) {
      return `${isFocusMatch ? "Mesmo sendo foco da simulação, ainda faltam ajustes para ganhar força." : "A área ainda precisa de mais apoio para responder melhor ao equilíbrio."}`;
    }

    return "Este ponto ainda está frágil no cenário atual. Vale testar novas combinações no simulador para fortalecer a leitura.";
  }

  function renderZoneProfile(zoneKey, shouldUnlock) {
    const profile = zoneProfiles[zoneKey] || zoneProfiles.plantio;
    const signalValue = getZoneSignalValue(zoneKey);

    activeZone = zoneKey;
    zoneTitle.textContent = profile.title;
    zoneText.textContent = profile.text;
    zoneFieldValue.textContent = `${profile.field}%`;
    zoneNatureValue.textContent = `${profile.nature}%`;
    zoneCityValue.textContent = `${profile.city}%`;
    zoneSignalValue.textContent = `${signalValue}%`;
    zoneSignalText.textContent = getZoneSignalText(zoneKey, signalValue);
    zonePracticeList.innerHTML = "";

    profile.practices.forEach((practice) => {
      const item = document.createElement("li");
      item.textContent = practice;
      zonePracticeList.appendChild(item);
    });

    zoneButtons.forEach((button) => {
      const isActive = button.dataset.zone === zoneKey;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    if (!shouldUnlock) {
      return;
    }

    if (zoneKey === "rio") {
      unlockAchievement("agua");
    } else if (zoneKey === "plantio" || zoneKey === "preservacao") {
      unlockAchievement("solo");
    } else if (zoneKey === "solar") {
      unlockAchievement("energia");
    }
  }

  function renderTimeline(key) {
    const data = timelineData[key] || timelineData.antes;
    activeTimeline = key;
    timelineTitle.textContent = data.title;
    timelineText.textContent = data.text;
    timelineList.innerHTML = "";

    data.items.forEach((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      timelineList.appendChild(item);
    });

    timelineButtons.forEach((button) => {
      const isActive = button.dataset.timeline === key;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    if (key === "hoje" || key === "futuro") {
      unlockAchievement("pesquisa");
    }
  }

  function shuffleQuizQuestions() {
    const shuffled = quizQuestions.slice();

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      const current = shuffled[index];
      shuffled[index] = shuffled[randomIndex];
      shuffled[randomIndex] = current;
    }

    return shuffled;
  }

  function getQuizTotal() {
    return activeQuizQuestions.length || quizQuestions.length;
  }

  function openQuizModal() {
    clearTimeout(quizHideTimer);
    quizModalOverlay.hidden = false;
    quizModal.hidden = false;
    quizModal.inert = false;
    window.requestAnimationFrame(function () {
      body.classList.add("quiz-modal-open");
    });
    quizModal.setAttribute("aria-hidden", "false");
    startQuizSession();
    quizCloseButton.focus();
  }

  function closeQuizModal() {
    body.classList.remove("quiz-modal-open");
    quizModal.setAttribute("aria-hidden", "true");
    quizModal.inert = true;

    if (!quizCompleted && activeQuizQuestions.length > 0) {
      quizSectionResult.hidden = false;
      quizSectionResult.textContent = "Quiz fechado antes do fim. Clique em Comecar quiz para iniciar uma nova tentativa.";
    }

    quizHideTimer = window.setTimeout(function () {
      quizModalOverlay.hidden = true;
      quizModal.hidden = true;
      quizStartButton.focus();
    }, 220);
  }

  function closeSimulatorMobileDialog(restoreFocus) {
    body.classList.remove("simulator-mobile-open");
    simulatorMobileOpenButton.setAttribute("aria-expanded", "false");

    if (restoreFocus) {
      simulatorMobileOpenButton.focus();
    }
  }

  function openSimulatorMobileDialog() {
    if (!mobileDialogQuery.matches) {
      return;
    }

    closeObservatoryMobileDialog(false);
    body.classList.add("simulator-mobile-open");
    simulatorMobileOpenButton.setAttribute("aria-expanded", "true");
    simulatorMobileCloseButton.focus();
  }

  function closeObservatoryMobileDetails(restoreFocus) {
    body.classList.remove("observatory-mobile-detail-open");

    if (restoreFocus) {
      const activeButton = zoneButtons.find((button) => button.classList.contains("is-active"));
      if (activeButton) {
        activeButton.focus();
      }
    }
  }

  function openObservatoryMobileDetails() {
    if (!mobileDialogQuery.matches || !body.classList.contains("observatory-mobile-open")) {
      return;
    }

    body.classList.add("observatory-mobile-detail-open");
    observatoryDetailCloseButton.focus();
  }

  function closeObservatoryMobileDialog(restoreFocus) {
    body.classList.remove("observatory-mobile-open");
    closeObservatoryMobileDetails(false);
    observatoryMobileOpenButton.setAttribute("aria-expanded", "false");

    if (restoreFocus) {
      observatoryMobileOpenButton.focus();
    }
  }

  function openObservatoryMobileDialog() {
    if (!mobileDialogQuery.matches) {
      return;
    }

    closeSimulatorMobileDialog(false);
    closeObservatoryMobileDetails(false);
    body.classList.add("observatory-mobile-open");
    observatoryMobileOpenButton.setAttribute("aria-expanded", "true");
    observatoryMobileCloseButton.focus();
  }

  function syncMobileDialogsForViewport() {
    if (mobileDialogQuery.matches) {
      return;
    }

    closeSimulatorMobileDialog(false);
    closeObservatoryMobileDialog(false);
  }

  function renderQuiz() {
    if (activeQuizQuestions.length === 0) {
      activeQuizQuestions = shuffleQuizQuestions();
    }

    const total = getQuizTotal();
    const current = activeQuizQuestions[quizIndex];
    quizAnswered = false;
    quizCounter.textContent = `Pergunta ${quizIndex + 1} de ${total}`;
    quizQuestion.textContent = current.question;
    quizFeedback.textContent = "";
    quizNextButton.disabled = true;
    quizNextButton.textContent = quizIndex === total - 1 ? "Ver resultado" : "Proxima pergunta";
    quizProgressFill.style.width = `${(quizIndex / total) * 100}%`;
    quizOptions.innerHTML = "";

    current.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.className = "quiz-option";
      button.type = "button";
      button.textContent = option;
      button.setAttribute("aria-label", `Resposta: ${option}`);
      button.addEventListener("click", function () {
        answerQuiz(index);
      });
      quizOptions.appendChild(button);
    });
  }

  function answerQuiz(selectedIndex) {
    if (quizAnswered) {
      return;
    }

    const current = activeQuizQuestions[quizIndex];
    const optionButtons = Array.from(quizOptions.querySelectorAll(".quiz-option"));
    const isCorrect = selectedIndex === current.answer;
    const total = getQuizTotal();
    quizAnswered = true;

    if (isCorrect) {
      quizScore += 1;
    }

    optionButtons.forEach((button, index) => {
      button.disabled = true;
      if (index === current.answer) {
        button.classList.add("is-correct");
      } else if (index === selectedIndex) {
        button.classList.add("is-wrong");
      }
    });

    quizFeedback.textContent = `${isCorrect ? "Resposta correta." : "Resposta incorreta."} ${current.explanation}`;
    quizScoreValue.textContent = `${quizScore}/${total}`;
    quizNextButton.disabled = false;
    quizProgressFill.style.width = `${((quizIndex + 1) / total) * 100}%`;
  }

  function finishQuiz() {
    const total = getQuizTotal();
    const percentage = Math.round((quizScore / total) * 100);
    quizCompleted = true;
    quizQuestion.textContent = "Resultado final";
    quizCounter.textContent = "Quiz concluido";
    quizOptions.innerHTML = "";
    quizFeedback.textContent = `Você acertou ${quizScore} de ${total} perguntas.`;
    quizSectionResult.hidden = false;
    quizSectionResult.textContent = `Último resultado: você acertou ${quizScore} de ${total} perguntas (${percentage}%).`;
    quizStartButton.textContent = "Refazer quiz";
    quizResultText.textContent =
      percentage >= 80
        ? "Excelente leitura do tema. Você demonstrou domínio sobre produção sustentável."
        : "Bom caminho. Reveja as explicações e tente novamente para fortalecer sua pontuação.";
    quizNextButton.disabled = true;
    quizProgressFill.style.width = "100%";
    unlockAchievement("quiz");
  }

  function startQuizSession() {
    activeQuizQuestions = shuffleQuizQuestions();
    quizIndex = 0;
    quizScore = 0;
    quizAnswered = false;
    quizCompleted = false;
    quizScoreValue.textContent = `0/${getQuizTotal()}`;
    quizResultText.textContent = "Responda as perguntas para ver seu desempenho.";
    quizSectionResult.hidden = true;
    quizSectionResult.textContent = "";
    renderQuiz();
  }

  function bindCursorFeedback() {
    const activate = function () {
      body.classList.add("is-pressing");
    };

    const release = function () {
      body.classList.remove("is-pressing");
    };

    document.addEventListener("mousedown", activate);
    document.addEventListener("mouseup", release);
    document.addEventListener("touchstart", activate, { passive: true });
    document.addEventListener("touchend", release);
    window.addEventListener("blur", release);
  }

  settingsToggleButton.addEventListener("click", function () {
    if (body.classList.contains("settings-open")) {
      closeSettings();
      return;
    }

    openSettings();
  });
  settingsCloseButton.addEventListener("click", closeSettings);
  settingsOverlay.addEventListener("click", closeSettings);

  themeChoiceButtons.forEach((button) => {
    button.addEventListener("click", function () {
      setTheme(button.dataset.themeChoice);
    });
  });

  quoteButton.addEventListener("click", function () {
    const randomIndex = Math.floor(Math.random() * quotePool.length);
    setDayMessage({
      title: "Mensagem inspiradora",
      text: quotePool[randomIndex],
    });
  });

  careRange.addEventListener("input", updateScenario);
  focusSelect.addEventListener("change", updateScenario);
  strategyInputs.forEach((input) => {
    input.addEventListener("change", function () {
      updateScenario();
      if (input.checked && input.value === "irrigacao") {
        unlockAchievement("agua");
      } else if (input.checked && input.value === "energia") {
        unlockAchievement("energia");
      } else if (input.checked && input.value === "compostagem") {
        unlockAchievement("solo");
      }
    });
  });

  resetScenarioButton.addEventListener("click", function () {
    strategyInputs.forEach((input) => {
      input.checked = input.value !== "compostagem";
    });
    careRange.value = "4";
    focusSelect.value = "solo";
    updateScenario();
  });

  simulatorMobileOpenButton.addEventListener("click", openSimulatorMobileDialog);
  simulatorMobileCloseButton.addEventListener("click", function () {
    closeSimulatorMobileDialog(true);
  });

  audioToggleButton.addEventListener("click", toggleThemeAudio);
  audioPrevButton.addEventListener("click", function () {
    changeMusicTrack(-1);
  });
  audioNextButton.addEventListener("click", function () {
    changeMusicTrack(1);
  });
  quickMusicToggleButton.addEventListener("click", toggleThemeAudio);
  quickMusicPrevButton.addEventListener("click", function () {
    changeMusicTrack(-1);
  });
  quickMusicNextButton.addEventListener("click", function () {
    changeMusicTrack(1);
  });
  audioVolumeRange.addEventListener("input", function () {
    themeAudio.volume = Number(audioVolumeRange.value) / 100;
    if (!themeAudio.paused) {
      updateAudioMessage(`Volume ajustado para ${audioVolumeRange.value}%.`);
      return;
    }
    updateQuickDockState();
  });

  themeAudio.addEventListener("error", function () {
    updateAudioMessage("Arquivo de áudio não encontrado. Verifique se musica1.mp3, musica2.mp3 e musica3.mp3 estão na pasta musica.");
  });
  themeAudio.addEventListener("play", updateQuickDockState);
  themeAudio.addEventListener("pause", updateQuickDockState);

  ambientToggleButton.addEventListener("click", toggleAmbientSound);
  ambientPrevButton.addEventListener("click", function () {
    changeAmbientMode(-1);
  });
  ambientNextButton.addEventListener("click", function () {
    changeAmbientMode(1);
  });
  quickAmbientToggleButton.addEventListener("click", toggleAmbientSound);
  quickAmbientPrevButton.addEventListener("click", function () {
    changeAmbientMode(-1);
  });
  quickAmbientNextButton.addEventListener("click", function () {
    changeAmbientMode(1);
  });
  ambientVolumeRange.addEventListener("input", function () {
    ambientAudio.volume = Number(ambientVolumeRange.value) / 100;
    if (ambientPlaying) {
      ambientStatus.textContent = `Volume do ambiente ajustado para ${ambientVolumeRange.value}%.`;
    }
    updateQuickDockState();
  });
  ambientAudio.addEventListener("error", function () {
    const ambientMode = getCurrentAmbientMode();
    ambientStatus.textContent = `Arquivo de ambiente não encontrado. Verifique se ${ambientMode.src} está na pasta musica.`;
    updateQuickDockState();
  });
  ambientAudio.addEventListener("play", updateQuickDockState);
  ambientAudio.addEventListener("pause", updateQuickDockState);

  fontDecreaseButton.addEventListener("click", function () {
    changeFontScale(-1);
  });
  fontResetButton.addEventListener("click", function () {
    applyFontScale("normal");
  });
  fontIncreaseButton.addEventListener("click", function () {
    changeFontScale(1);
  });
  readerButton.addEventListener("click", readPageSummary);
  quickReaderButton.addEventListener("click", readPageSummary);
  readerStopButton.addEventListener("click", stopPageSummary);
  quickReaderStopButton.addEventListener("click", stopPageSummary);
  readingModeButton.addEventListener("click", function () {
    applyReadingMode(!body.classList.contains("reading-mode"));
  });

  quickDockToggleButton.addEventListener("click", function () {
    setQuickDockOpen(!body.classList.contains("quick-dock-open"));
  });
  quickTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setQuickDockOpen(false);
  });

  pledgeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    currentManifesto = buildManifesto();
    pledgePreview.textContent = currentManifesto;
    pledgeStatus.textContent = "Manifesto criado. Se quiser, agora você pode guardar no mural.";
  });

  savePledgeButton.addEventListener("click", function () {
    currentManifesto = buildManifesto();
    pledgePreview.textContent = currentManifesto;

    const formData = new FormData(pledgeForm);
    const name = String(formData.get("personName") || "").trim() || "Participante";
    const role = String(formData.get("personRole") || "estudante");
    const priority = String(formData.get("personPriority") || "agua");

    const pledges = getStoredPledges();
    pledges.unshift({
      name,
      role,
      priority,
      message: currentManifesto,
    });

    saveStoredPledges(pledges.slice(0, 6));
    renderPledgeWall();
    pledgeStatus.textContent = "Manifesto salvo no mural local deste navegador.";
    unlockAchievement("compromisso");
  });

  clearPledgesButton.addEventListener("click", function () {
    localStorage.removeItem(STORAGE_KEYS.mural);
    renderPledgeWall();
    pledgeStatus.textContent = "Mural limpo com sucesso.";
  });

  zoneButtons.forEach((button) => {
    button.addEventListener("click", function () {
      renderZoneProfile(button.dataset.zone, true);
      openObservatoryMobileDetails();
    });
  });

  observatoryMobileOpenButton.addEventListener("click", openObservatoryMobileDialog);
  observatoryMobileCloseButton.addEventListener("click", function () {
    closeObservatoryMobileDialog(true);
  });
  observatoryDetailCloseButton.addEventListener("click", function () {
    closeObservatoryMobileDetails(true);
  });

  timelineButtons.forEach((button) => {
    button.addEventListener("click", function () {
      renderTimeline(button.dataset.timeline);
    });
  });

  dataSourceLinks.forEach((link) => {
    link.addEventListener("click", function () {
      unlockAchievement("pesquisa");
    });
  });

  quizStartButton.addEventListener("click", openQuizModal);
  quizCloseButton.addEventListener("click", closeQuizModal);
  quizModalOverlay.addEventListener("click", closeQuizModal);

  quizNextButton.addEventListener("click", function () {
    if (!quizAnswered) {
      return;
    }

    if (quizIndex >= getQuizTotal() - 1) {
      finishQuiz();
      return;
    }

    quizIndex += 1;
    renderQuiz();
  });

  quizRestartButton.addEventListener("click", startQuizSession);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && body.classList.contains("settings-open")) {
      closeSettings();
    }
    if (event.key === "Escape" && body.classList.contains("quick-dock-open")) {
      setQuickDockOpen(false);
    }
    if (event.key === "Escape" && body.classList.contains("simulator-mobile-open")) {
      closeSimulatorMobileDialog(true);
    }
    if (event.key === "Escape" && body.classList.contains("observatory-mobile-detail-open")) {
      closeObservatoryMobileDetails(true);
      return;
    }
    if (event.key === "Escape" && body.classList.contains("observatory-mobile-open")) {
      closeObservatoryMobileDialog(true);
    }
    if (event.key === "Escape" && body.classList.contains("quiz-modal-open")) {
      closeQuizModal();
    }
  });

  if (mobileDialogQuery.addEventListener) {
    mobileDialogQuery.addEventListener("change", syncMobileDialogsForViewport);
  } else {
    mobileDialogQuery.addListener(syncMobileDialogsForViewport);
  }

  applyDefaultPreferences();
  applyStoredMode();
  applyFontScale(localStorage.getItem(STORAGE_KEYS.fontScale) || DEFAULT_SETTINGS.fontScale);
  applyReadingMode(localStorage.getItem(STORAGE_KEYS.readingMode) === "true");
  setDayMessage(getPeriodMessage());
  themeAudio.src = getCurrentMusicTrack().src;
  themeAudio.volume = Number(audioVolumeRange.value) / 100;
  ambientAudio.src = getCurrentAmbientMode().src;
  ambientAudio.volume = Number(ambientVolumeRange.value) / 100;
  renderAchievements();
  updateQuickDockState();
  renderTimeline(activeTimeline);
  renderZoneProfile(activeZone, false);
  updateScenario();
  renderPledgeWall();
  observeReveals();
  bindCursorFeedback();
})();
