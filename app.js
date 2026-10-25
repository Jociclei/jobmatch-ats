(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const jobInput = $("job-description");
  const resumeInput = $("resume-text");
  const results = $("results");
  let lastAnalysis = null;

  // Stopwords and synonym groups make the demo matching a little more useful.
  // This is a transparent keyword heuristic, not a real ATS prediction.
  const stopwords = new Set(("a o as os um uma uns umas de da do das dos em no na nos nas para por com sem sob sobre entre e ou que se ao aos à às como mais menos muito muita muitos muitas ser estar ter fazer atuar experiência experiente profissional profissionais pessoa candidato candidata desejável diferencial obrigatório requisitos atividades responsabilidades habilidade habilidades conhecimento conhecimentos capacidade perfil vaga função cargo trabalho empresa equipe setor").split(/\s+/));
  const synonymGroups = [
    ["atendimento ao cliente","atendimento ao público","suporte ao cliente"],
    ["excel","microsoft excel","planilhas"],
    ["comunicação","comunicação interpessoal"],
    ["trabalho em equipe","colaboração","colaborativo"],
    ["organização","organizado","organizada"],
    ["gestão de tempo","gerenciamento de tempo","priorização"],
    ["análise de dados","análise de informações"],
    ["resolução de problemas","solução de problemas"]
  ];

  function normalize(text) {
    return (text || "").toLocaleLowerCase("pt-BR")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\p{L}\p{N}+#./-]+/gu, " ")
      .replace(/\s+/g, " ").trim();
  }

  function extractKeywords(text) {
    const normalized = normalize(text);
    const words = normalized.split(" ").filter(w => w.length >= 3 && !stopwords.has(w));
    const counts = new Map();
    for (const word of words) counts.set(word, (counts.get(word) || 0) + 1);
    // Keep repeated/meaningful words first, capped to keep results understandable.
    const sorted = [...counts.entries()]
      .sort((a,b) => b[1] - a[1] || a[0].localeCompare(b[0], "pt-BR"))
      .map(([word]) => word);
    // Add relevant two-word terms if they appear in the job text.
    const tokens = normalized.split(" ");
    const phrases = [];
    for (let i = 0; i < tokens.length - 1; i++) {
      const phrase = tokens[i] + " " + tokens[i+1];
      if (tokens[i].length >= 3 && tokens[i+1].length >= 3 &&
          !stopwords.has(tokens[i]) && !stopwords.has(tokens[i+1]) &&
          !phrases.includes(phrase)) phrases.push(phrase);
    }
    return [...new Set([...phrases, ...sorted])].filter(k => k.length >= 3).slice(0, 24);
  }

  function hasKeyword(resumeNormalized, keyword) {
    if (resumeNormalized.includes(keyword)) return true;
    for (const group of synonymGroups) {
      if (group.includes(keyword) && group.some(term => resumeNormalized.includes(term))) return true;
    }
    return false;
  }

  function analyze(job, resume) {
    const keywords = extractKeywords(job);
    const normalizedResume = normalize(resume);
    const matched = keywords.filter(k => hasKeyword(normalizedResume, k));
    const missing = keywords.filter(k => !hasKeyword(normalizedResume, k));
    const score = keywords.length ? Math.round((matched.length / keywords.length) * 100) : 0;
    return { keywords, matched, missing, score };
  }

  function renderChips(container, items, missing = false) {
    container.replaceChildren();
    if (!items.length) {
      const span = document.createElement("span");
      span.className = "empty-chip";
      span.textContent = missing ? "Nenhum termo pendente identificado." : "Nenhum termo identificado ainda.";
      container.appendChild(span);
      return;
    }
    items.forEach(item => {
      const span = document.createElement("span");
      span.className = missing ? "chip missing" : "chip";
      span.textContent = item;
      container.appendChild(span);
    });
  }

  function makeSuggestions(analysis, resume) {
    const suggestions = [];
    if (analysis.score < 40) suggestions.push("Compare novamente os requisitos da vaga com seu currículo. Talvez faltem informações relevantes ou a vaga peça competências de outra área.");
    else if (analysis.score < 70) suggestions.push("Revise os termos não identificados e, se forem verdadeiros para você, inclua-os em contexto nas experiências, competências ou formação.");
    else suggestions.push("Há uma boa correspondência de termos nesta análise. Revise também a clareza, a ordem das seções e a relevância das experiências para a vaga.");
    if (!/experi[eê]ncia|hist[oó]rico profissional|emprego|est[aá]gio/i.test(resume)) suggestions.push("Se você tiver experiências profissionais, voluntariado, projetos ou estágio relevantes, crie uma seção específica e descreva suas contribuições reais.");
    if (!/forma[cç][aã]o|educa[cç][aã]o|curso|certifica[cç][aã]o/i.test(resume)) suggestions.push("Considere incluir formação, cursos e certificações verdadeiros que tenham relação com a vaga.");
    if (!/resultado|reduz|aument|melhor|entreg|desenvolv|implemente/i.test(resume)) suggestions.push("Quando for verdadeiro e possível comprovar, descreva resultados ou entregas concretas em vez de listar apenas tarefas.");
    suggestions.push("Não adicione uma palavra-chave só para aumentar a pontuação: mantenha apenas competências e experiências que você realmente possui.");
    return suggestions;
  }

  function optimizeResume(resume) {
    // Preserve user content. This is a light structure/formatting pass, not generative AI.
    const cleaned = resume.replace(/\r\n/g, "\n").split("\n").map(line => line.trim()).filter((line, i, arr) => line !== "" || (i > 0 && arr[i-1] !== "")).join("\n").trim();
    const heading = "CURRÍCULO — VERSÃO REVISADA\n\n";
    const note = "\n\n---\nObservação: esta versão reorganiza a apresentação do texto original. Revise todos os dados antes de enviar e não inclua competências ou experiências que não sejam verdadeiras.";
    return heading + cleaned + note;
  }

  function runAnalysis() {
    const job = jobInput.value.trim();
    const resume = resumeInput.value.trim();
    $("form-message").textContent = "";
    if (job.length < 30) {
      $("form-message").textContent = "Cole uma descrição de vaga com pelo menos 30 caracteres para fazer a análise.";
      jobInput.focus();
      return;
    }
    if (resume.length < 30) {
      $("form-message").textContent = "Cole o texto do currículo com pelo menos 30 caracteres para fazer a análise.";
      resumeInput.focus();
      return;
    }
    lastAnalysis = analyze(job, resume);
    $("score-number").textContent = lastAnalysis.score + "%";
    $("score-bar").style.width = lastAnalysis.score + "%";
    $("matched-count").textContent = lastAnalysis.matched.length;
    $("missing-count").textContent = lastAnalysis.missing.length;
    $("total-count").textContent = lastAnalysis.keywords.length;
    $("score-summary").textContent = lastAnalysis.score >= 70
      ? "Muitos dos termos selecionados aparecem no currículo. Confira a relevância e a precisão das informações."
      : lastAnalysis.score >= 40
        ? "Parte dos termos aparece no currículo. Revise os requisitos pendentes e seu conteúdo profissional."
        : "Poucos termos selecionados foram encontrados. Confira se o currículo descreve as experiências relevantes para esta vaga.";
    renderChips($("matched-keywords"), lastAnalysis.matched);
    renderChips($("missing-keywords"), lastAnalysis.missing, true);
    const list = $("suggestions-list");
    list.replaceChildren();
    makeSuggestions(lastAnalysis, resume).forEach(text => {
      const li = document.createElement("li");
      li.textContent = text;
      list.appendChild(li);
    });
    $("optimized-resume").value = optimizeResume(resume);
    results.classList.remove("hidden");
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  $("analyze-btn").addEventListener("click", runAnalysis);
  $("reanalyze-btn").addEventListener("click", runAnalysis);
  $("example-btn").addEventListener("click", () => {
    jobInput.value = "Assistente administrativo. Requisitos: organização, comunicação, atendimento ao cliente, Microsoft Excel, elaboração de relatórios, gestão de documentos, trabalho em equipe e resolução de problemas. Atividades: apoiar rotinas administrativas, atualizar planilhas e atender solicitações.";
    resumeInput.value = "Maria Silva\nResumo profissional\nProfissional em início de carreira, organizada e comunicativa, com interesse em rotinas administrativas e atendimento ao público.\n\nFormação\nEnsino médio completo\n\nProjetos e atividades\nParticipação em projeto escolar com organização de documentos, divisão de tarefas e apresentação de resultados em equipe.\n\nCompetências\nComunicação, organização, trabalho em equipe, atendimento ao cliente e conhecimentos básicos de planilhas.\n\nCursos\nInformática básica";
    $("form-message").textContent = "Exemplo demonstrativo carregado. Clique em Analisar compatibilidade.";
    $("form-message").style.color = "#716d83";
  });
  $("print-btn").addEventListener("click", () => window.print());
  $("copy-btn").addEventListener("click", async () => {
    const text = $("optimized-resume").value;
    try {
      await navigator.clipboard.writeText(text);
      $("copy-message").textContent = "Texto copiado.";
    } catch {
      $("optimized-resume").focus();
      $("optimized-resume").select();
      $("copy-message").textContent = "Selecione o texto e use Ctrl+C para copiar.";
    }
  });
})();
