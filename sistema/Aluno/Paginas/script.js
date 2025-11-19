function atualizaData() {
    const agora = new Date();
    const opcoes = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dataFormatada = agora.toLocaleDateString('pt-BR', opcoes);
    const elementoData = document.getElementById('data-hoje');
    if (elementoData) {
        elementoData.textContent = dataFormatada;
    }
}

function configuraNotificacoes() {
    const campainha = document.querySelector('.notificacao');
    
    if (campainha) {
        campainha.addEventListener('click', function() {
            alert('Você tem 3 notificações:\n\n1. Nova tarefa de Matemática\n2. Boletim parcial disponível\n3. Reunião de pais marcada');
            
            const contador = this.querySelector('.contador');
            if (contador) {
                contador.style.display = 'none';
            }
        });
    }
}

function configuraMenu() {
    const itensMenu = document.querySelectorAll('.navegacao a');
    
    itensMenu.forEach(item => {
        item.addEventListener('click', function() {
            itensMenu.forEach(i => {
                i.parentElement.classList.remove('ativo');
            });
            
            this.parentElement.classList.add('ativo');
        });
    });
    
    configurarMenuAtivoPorPagina();
}

function configurarMenuAtivoPorPagina() {
    const paginaAtual = window.location.pathname.split('/').pop();
    const itensMenu = document.querySelectorAll('.navegacao a');
    
    itensMenu.forEach(item => {
        const href = item.getAttribute('href');
        const paginaLink = href.split('/').pop();
        
        item.parentElement.classList.remove('ativo');
        
        if (href === paginaAtual || (paginaAtual === '' && href === 'index.html')) {
            item.parentElement.classList.add('ativo');
        }
    });
}

function configuraHoverCards() {
    const cards = document.querySelectorAll('.cartao');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

function criaModalSeNaoExistir() {
    if (!document.getElementById('modalDetalhes')) {
        console.log('Criando modal...');
        const modalHTML = `
            <div class="modal-overlay" id="modalDetalhes">
                <div class="modal-detalhes">
                    <div class="cabecalho-modal">
                        <h3 class="titulo-modal">Detalhes da Aula</h3>
                        <button class="botao-fechar-modal" id="fecharModal">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="conteudo-modal">
                        <div class="info-aula-modal" id="conteudoModal"></div>
                        <div class="horarios-modal">
                            <div class="item-horario">
                                <span class="rotulo-horario">Início</span>
                                <span class="valor-horario" id="horaInicio">07:30</span>
                            </div>
                            <div class="item-horario">
                                <span class="rotulo-horario">Término</span>
                                <span class="valor-horario" id="horaTermino">09:10</span>
                            </div>
                        </div>
                        <div class="acoes-modal">
                            <button class="botao-modal primario" id="botaoLembrete">
                                <i class="fas fa-bell"></i>
                                Definir Lembrete
                            </button>
                            <button class="botao-modal secundario" id="botaoCompartilhar">
                                <i class="fas fa-share-alt"></i>
                                Compartilhar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        console.log('Modal criado com sucesso!');
    } else {
        console.log('Modal já existe na página.');
    }
}

function configuraEventosModal() {
    console.log('Configurando eventos do modal...');
    
    setTimeout(() => {
        const modalOverlay = document.getElementById('modalDetalhes');
        const botaoFechar = document.getElementById('fecharModal');
        const botaoLembrete = document.getElementById('botaoLembrete');
        const botaoCompartilhar = document.getElementById('botaoCompartilhar');
        
        if (botaoFechar) {
            console.log('Botão fechar encontrado');
            botaoFechar.addEventListener('click', fechaModal);
        } else {
            console.error('Botão fechar NÃO encontrado');
        }
        
        if (modalOverlay) {
            console.log('Modal overlay encontrado');
            modalOverlay.addEventListener('click', function(e) {
                if (e.target === modalOverlay) {
                    fechaModal();
                }
            });
        } else {
            console.error('Modal overlay NÃO encontrado');
        }
        
        if (botaoLembrete) {
            console.log('Botão lembrete encontrado');
            botaoLembrete.addEventListener('click', function() {
                alert('Lembrete definido para esta aula!');
                fechaModal();
            });
        }
        
        if (botaoCompartilhar) {
            console.log('Botão compartilhar encontrado');
            botaoCompartilhar.addEventListener('click', function() {
                if (navigator.share) {
                    navigator.share({
                        title: 'Horário da Aula',
                        text: 'Confira os detalhes da minha aula!',
                        url: window.location.href
                    });
                } else {
                    alert('Link copiado para a área de transferência!');
                }
                fechaModal();
            });
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const modal = document.getElementById('modalDetalhes');
                if (modal && modal.classList.contains('ativo')) {
                    fechaModal();
                }
            }
        });
    }, 100);
}

function abreModalDetalhes(detalhes) {
    console.log('Abrindo modal com detalhes:', detalhes);
    
    criaModalSeNaoExistir();
    
    const conteudoModal = document.getElementById('conteudoModal');
    const horaInicio = document.getElementById('horaInicioModal');
    const horaTermino = document.getElementById('horaTerminoModal');
    
    if (!conteudoModal) {
        console.error('Elemento conteudoModal não encontrado');
        return;
    }
    
    if (!horaInicio) {
        console.error('Elemento horaInicio não encontrado');
    }
    
    if (!horaTermino) {
        console.error('Elemento horaTermino não encontrado');
    }
    
    conteudoModal.innerHTML = `
        <div class="grupo-info">
            <div class="icone-info">
                <i class="fas fa-book"></i>
            </div>
            <div class="texto-info">
                <h4>Matéria</h4>
                <p>${detalhes.materia}</p>
            </div>
        </div>
        <div class="grupo-info">
            <div class="icone-info">
                <i class="fas fa-chalkboard-teacher"></i>
            </div>
            <div class="texto-info">
                <h4>Professor</h4>
                <p>${detalhes.professor}</p>
            </div>
        </div>
        <div class="grupo-info">
            <div class="icone-info">
                <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="texto-info">
                <h4>Local</h4>
                <p>${detalhes.sala}</p>
            </div>
        </div>
        <div class="grupo-info">
            <div class="icone-info">
                <i class="fas fa-calendar-day"></i>
            </div>
            <div class="texto-info">
                <h4>Dia da Semana</h4>
                <p>${detalhes.diaSemana}</p>
            </div>
        </div>
    `;
    
    if (horaInicio) horaInicio.textContent = detalhes.horaInicio;
    if (horaTermino) horaTermino.textContent = detalhes.horaTermino;
    
    const modal = document.getElementById('modalDetalhes');
    if (modal) {
        modal.classList.add('ativo');
        document.body.style.overflow = 'hidden';
    } else {
        console.error('Modal não encontrado após criação');
    }
}

function fechaModal() {
    const modal = document.getElementById('modalDetalhes');
    if (modal) {
        modal.classList.remove('ativo');
        document.body.style.overflow = 'auto';
    }
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        const duration = Math.random() * 10 + 15;
        particle.style.animationDuration = `${duration}s`;
        particle.style.opacity = Math.random() * 0.2 + 0.1;
        
        particlesContainer.appendChild(particle);
    }
}

function initLoading() {
    document.body.classList.add('loading-page');
    
    createParticles();
    
    let progress = 0;
    let currentStep = 0;
    const steps = [
        "Inicializando sistema...",
        "Carregando módulos principais...",
        "Conectando ao banco de dados...",
        "Buscando dados do aluno...",
        "Obtendo informações da turma...",
        "Carregando notas e avaliações...",
        "Processando horários...",
        "Verificando avisos recentes...",
        "Preparando interface gráfica...",
        "Otimizando performance...",
        "Finalizando carregamento..."
    ];

    const tips = [
        "Você pode filtrar notas por etapa usando os botões no topo da página",
        "Clique em uma aula na grade de horários para ver detalhes completos",
        "Avisos não lidos são destacados em vermelho para fácil identificação",
        "Use o modo de visualização completa para ver todas as notas detalhadas",
        "Configure lembretes para suas aulas importantes",
        "As cores indicam seu desempenho: verde (alto), laranja (médio), vermelho (baixo)",
        "Selecione diferentes períodos para visualizar horários específicos",
        "Clique em uma matéria para alternar entre visualização resumida e completa"
    ];

    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    const progressStep = document.getElementById('progressStep');
    const tipContent = document.getElementById('tipContent');

    if (!progressBar || !progressPercentage || !progressStep || !tipContent) {
        console.error('Elementos do loading não encontrados');
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
        return;
    }
    
    let tipIndex = 0;
    setInterval(() => {
        tipContent.style.opacity = '0';
        setTimeout(() => {
            tipContent.textContent = tips[tipIndex];
            tipContent.style.opacity = '1';
            tipIndex = (tipIndex + 1) % tips.length;
        }, 300);
    }, 5000);
    
    function updateProgress() {
        if (progress < 100) {
            const increment = Math.random() * 8 + 2;
            progress = Math.min(progress + increment, 100);
            
            progressBar.style.width = `${progress}%`;
            progressPercentage.textContent = `${Math.round(progress)}%`;
            
            if (progress >= (currentStep + 1) * (100 / steps.length)) {
                currentStep = Math.min(currentStep + 1, steps.length - 1);
                progressStep.textContent = steps[currentStep];
            }
            
            if (Math.floor(progress) % 20 === 0 && progress < 100) {
                const randomTip = tips[Math.floor(Math.random() * tips.length)];
                tipContent.style.opacity = '0';
                
                setTimeout(() => {
                    tipContent.textContent = randomTip;
                    tipContent.style.opacity = '1';
                }, 300);
            }
            
            const delay = progress < 70 ? 300 : 500;
            setTimeout(updateProgress, delay);
        } else {
            progressStep.textContent = "Sistema pronto! Redirecionando...";
            progressBar.style.background = "linear-gradient(90deg, #4caf50 0%, #2e7d32 100%)";
            
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        }
    }
    
    updateProgress();
}

function configuraFiltrosPeriodo() {
    const botoesFiltro = document.querySelectorAll('.filtro-periodo');
    const celulasAula = document.querySelectorAll('.celula-aula');
    
    if (!botoesFiltro.length) return;
    
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', function() {
            botoesFiltro.forEach(b => b.classList.remove('ativo'));
            this.classList.add('ativo');
            
            const periodo = this.getAttribute('data-periodo');
            
            celulasAula.forEach(celula => {
                const linha = celula.closest('tr');
                const horarioCelula = linha.querySelector('.celula-horario');
                const horarioTexto = horarioCelula.textContent;
                
                if (periodo === 'manha') {
                    if (horarioTexto.includes('13:30') || horarioTexto.includes('15:10') || horarioTexto.includes('16:00')) {
                        celula.style.display = 'none';
                    } else {
                        celula.style.display = '';
                    }
                } else if (periodo === 'tarde') {
                    if (horarioTexto.includes('07:30') || horarioTexto.includes('09:20') || horarioTexto.includes('11:10')) {
                        celula.style.display = 'none';
                    } else {
                        celula.style.display = '';
                    }
                } else {
                    celula.style.display = '';
                }
            });
        });
    });
}

function configuraCliqueAulas() {
    const celulasAula = document.querySelectorAll('.celula-aula:not(.tipo-vazio)');
    
    console.log('Configurando clique em', celulasAula.length, 'aulas');
    
    celulasAula.forEach(celula => {
        celula.addEventListener('click', function(e) {
            e.stopPropagation();
            
            console.log('Célula clicada:', this);
            
            const materia = this.getAttribute('data-materia');
            const professor = this.getAttribute('data-professor');
            const sala = this.getAttribute('data-sala');
            
            const linha = this.closest('tr');
            const celulaHorario = linha.querySelector('.celula-horario');
            const textoHorario = celulaHorario.textContent.trim();
            
            const partesHorario = textoHorario.split('-');
            const horaInicio = partesHorario[0] ? partesHorario[0].trim() : '07:30';
            const horaTermino = partesHorario[1] ? partesHorario[1].trim() : '09:10';
            
            const colunaIndex = Array.from(this.parentElement.children).indexOf(this);
            const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
            const diaSemana = diasSemana[colunaIndex - 1] || 'Dia não identificado';
            
            const detalhes = {
                materia: materia,
                professor: professor,
                sala: sala,
                horaInicio: horaInicio,
                horaTermino: horaTermino,
                diaSemana: diaSemana
            };
            
            console.log('Detalhes da aula:', detalhes);
            abreModalDetalhes(detalhes);
        });
    });
}

function atualizaStatusAulasHoje() {
    const agora = new Date();
    const horas = agora.getHours();
    const minutos = agora.getMinutes();
    
    if (horas >= 7 && horas < 9) {
        const statusAtual = document.querySelector('.status-atual');
        if (statusAtual) {
            statusAtual.innerHTML = '<i class="fas fa-play-circle"></i><span>Em andamento</span>';
        }
    }
}

function inicializaPaginaHorarios() {
    const paginaHorarios = document.querySelector('.secao-horarios');
    
    if (paginaHorarios) {
        console.log('Inicializando página de horários...');
        configuraFiltrosPeriodo();
        configuraCliqueAulas();
        atualizaStatusAulasHoje();
        
        const agora = new Date();
        const diaSemana = agora.getDay();
        
        if (diaSemana >= 1 && diaSemana <= 5) {
            const colunaDia = diaSemana + 1;
            const coluna = document.querySelectorAll(`.tabela-horarios tbody tr td:nth-child(${colunaDia})`);
            
            coluna.forEach(celula => {
                if (!celula.classList.contains('tipo-vazio')) {
                    celula.style.boxShadow = '0 0 0 2px #4caf50';
                    celula.style.position = 'relative';
                    
                    const marcador = document.createElement('div');
                    marcador.className = 'marcador-aula-atual';
                    marcador.innerHTML = '<i class="fas fa-circle"></i>';
                    marcador.style.position = 'absolute';
                    marcador.style.top = '5px';
                    marcador.style.right = '5px';
                    marcador.style.color = '#4caf50';
                    marcador.style.fontSize = '0.8rem';
                    celula.appendChild(marcador);
                }
            });
        }
    }
}

function inicializaPaginaTurma() {
    const filtrosTurma = document.querySelectorAll('.filtro-turma');
    const secaoG1 = document.querySelector('#tabela-g1')?.closest('.secao-grupo-turma');
    const secaoG2 = document.querySelector('#tabela-g2')?.closest('.secao-grupo-turma');
    
    if (!filtrosTurma.length) return;
    
    filtrosTurma.forEach(filtro => {
        filtro.addEventListener('click', function() {
            filtrosTurma.forEach(f => f.classList.remove('ativo'));
            this.classList.add('ativo');
            
            const grupo = this.getAttribute('data-grupo');
            
            if (grupo === 'todos') {
                if (secaoG1) secaoG1.style.display = '';
                if (secaoG2) secaoG2.style.display = '';
            } else if (grupo === 'g1') {
                if (secaoG1) secaoG1.style.display = '';
                if (secaoG2) secaoG2.style.display = 'none';
            } else if (grupo === 'g2') {
                if (secaoG1) secaoG1.style.display = 'none';
                if (secaoG2) secaoG2.style.display = '';
            }
        });
    });
    
    const linhasAlunos = document.querySelectorAll('.tabela-alunos tbody tr');
    linhasAlunos.forEach(linha => {
        linha.addEventListener('click', function() {
            const nomeAluno = this.querySelector('.info-aluno h4').textContent;
            alert(`Aluno: ${nomeAluno}`);
        });
    });
}

function inicializaPaginaNotas() {
    const botoesVisualizacao = document.querySelectorAll('.botao-visualizacao');
    const botoesEtapa = document.querySelectorAll('.filtro-etapa');
    const secoesNotas = document.querySelectorAll('.secao-notas');
    const linhasMateria = document.querySelectorAll('.linha-materia');
    const materiasDetalhadas = document.querySelectorAll('.cartao-materia-detalhado');
    const etapasDetalhadas = document.querySelectorAll('.cartao-etapa-detalhada');
    
    let etapaAtiva = 'todas';
    let visualizacaoAtiva = 'resumida';
    
    secoesNotas.forEach(secao => {
        if (secao.getAttribute('data-visualizacao') === 'resumida') {
            secao.classList.add('ativo');
        } else {
            secao.classList.remove('ativo');
        }
    });
    
    botoesVisualizacao.forEach(botao => {
        botao.addEventListener('click', function() {
            botoesVisualizacao.forEach(b => b.classList.remove('ativo'));
            this.classList.add('ativo');
            
            visualizacaoAtiva = this.getAttribute('data-visualizacao');
            
            secoesNotas.forEach(secao => {
                if (secao.getAttribute('data-visualizacao') === visualizacaoAtiva) {
                    secao.classList.add('ativo');
                } else {
                    secao.classList.remove('ativo');
                }
            });
            
            aplicarFiltroEtapa();
        });
    });
    
    botoesEtapa.forEach(botao => {
        botao.addEventListener('click', function() {
            botoesEtapa.forEach(b => b.classList.remove('ativo'));
            this.classList.add('ativo');
            
            etapaAtiva = this.getAttribute('data-etapa');
            aplicarFiltroEtapa();
        });
    });
    
    function aplicarFiltroEtapa() {
        if (visualizacaoAtiva === 'resumida') {
            aplicarFiltroEtapaResumida();
        } else {
            aplicarFiltroEtapaCompleta();
        }
    }
    
    function aplicarFiltroEtapaResumida() {
        const todasCelulas = document.querySelectorAll('#tabela-resumida .etapa-1, #tabela-resumida .etapa-2, #tabela-resumida .etapa-3');
        
        if (etapaAtiva === 'todas') {
            todasCelulas.forEach(celula => {
                celula.style.display = '';
            });
            document.querySelectorAll('.coluna-etapa').forEach(col => {
                col.style.display = '';
            });
        } else {
            todasCelulas.forEach(celula => {
                celula.style.display = 'none';
            });
            
            const celulasEtapa = document.querySelectorAll(`#tabela-resumida .etapa-${etapaAtiva}`);
            celulasEtapa.forEach(celula => {
                celula.style.display = '';
            });
            
            document.querySelectorAll('.coluna-etapa').forEach(col => {
                if (col.classList.contains(`etapa-${etapaAtiva}`)) {
                    col.style.display = '';
                } else {
                    col.style.display = 'none';
                }
            });
        }
    }
    
    function aplicarFiltroEtapaCompleta() {
        if (etapaAtiva === 'todas') {
            etapasDetalhadas.forEach(etapa => {
                etapa.style.display = '';
            });
            materiasDetalhadas.forEach(materia => {
                materia.style.display = '';
            });
        } else {
            materiasDetalhadas.forEach(materia => {
                materia.style.display = '';
            });
            
            etapasDetalhadas.forEach(etapa => {
                if (etapa.classList.contains(`etapa-${etapaAtiva}`)) {
                    etapa.style.display = '';
                } else {
                    etapa.style.display = 'none';
                }
            });
        }
    }
    
    linhasMateria.forEach(linha => {
        linha.addEventListener('click', function() {
            const materiaId = this.getAttribute('data-materia');
            
            botoesVisualizacao[0].classList.remove('ativo');
            botoesVisualizacao[1].classList.add('ativo');
            visualizacaoAtiva = 'completa';
            
            secoesNotas.forEach(secao => {
                if (secao.getAttribute('data-visualizacao') === 'completa') {
                    secao.classList.add('ativo');
                } else {
                    secao.classList.remove('ativo');
                }
            });
            
            etapaAtiva = 'todas';
            botoesEtapa.forEach(b => b.classList.remove('ativo'));
            botoesEtapa[0].classList.add('ativo');
            
            aplicarFiltroEtapaCompleta();
            
            const materiaElemento = document.getElementById(`materia-${materiaId}`);
            if (materiaElemento) {
                materiaElemento.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                materiasDetalhadas.forEach(m => {
                    m.style.boxShadow = 'none';
                    m.style.border = '1px solid #e0e0e0';
                });
                
                materiaElemento.style.boxShadow = '0 0 0 3px #2196f3';
                materiaElemento.style.border = '2px solid #2196f3';
                
                setTimeout(() => {
                    materiaElemento.style.boxShadow = 'none';
                    materiaElemento.style.border = '1px solid #e0e0e0';
                }, 3000);
            }
        });
    });
    
    aplicarFiltroEtapaResumida();
}

function inicializaPaginaAvisos() {
    const filtrosAviso = document.querySelectorAll('.filtro-aviso');
    const cartoesAviso = document.querySelectorAll('.cartao-aviso');
    const botoesLeiaMais = document.querySelectorAll('.botao-leia-mais');
    const botoesConfirmarLeitura = document.querySelectorAll('.botao-confirmar-leitura');
    const modalAviso = document.getElementById('modalAviso');
    const fecharModalAviso = document.getElementById('fecharModalAviso');
    const conteudoModalAviso = document.getElementById('conteudoModalAviso');
    const tituloModalAviso = document.getElementById('tituloModalAviso');
    const totalAvisosSpan = document.querySelector('.total-avisos');
    
    let tipoAtivo = 'todos';
    
    function atualizarContadores() {
        const total = cartoesAviso.length;
        const naoLidos = document.querySelectorAll('.cartao-aviso[data-lido="false"]').length;
        const importantes = document.querySelectorAll('.cartao-aviso[data-tipo="importante"]').length;
        const eventos = document.querySelectorAll('.cartao-aviso[data-tipo="evento"]').length;
        const prazos = document.querySelectorAll('.cartao-aviso[data-tipo="prazos"]').length;
        
        if (totalAvisosSpan) {
            totalAvisosSpan.textContent = `${total} avisos encontrados`;
        }
        
        document.querySelectorAll('.valor-estatistica')[0].textContent = total;
        document.querySelectorAll('.valor-estatistica')[1].textContent = importantes;
        document.querySelectorAll('.valor-estatistica')[2].textContent = eventos;
        document.querySelectorAll('.valor-estatistica')[3].textContent = prazos;
    }
    
    filtrosAviso.forEach(filtro => {
        filtro.addEventListener('click', function() {
            filtrosAviso.forEach(f => f.classList.remove('ativo'));
            this.classList.add('ativo');
            
            tipoAtivo = this.getAttribute('data-tipo');
            
            cartoesAviso.forEach(cartao => {
                if (tipoAtivo === 'todos') {
                    cartao.style.display = '';
                } else {
                    const tipoCartao = cartao.getAttribute('data-tipo');
                    if (tipoCartao === tipoAtivo) {
                        cartao.style.display = '';
                    } else {
                        cartao.style.display = 'none';
                    }
                }
            });
            
            const visiveis = document.querySelectorAll('.cartao-aviso[style=""]').length;
            if (totalAvisosSpan) {
                totalAvisosSpan.textContent = `${visiveis} avisos encontrados`;
            }
        });
    });
    
    botoesConfirmarLeitura.forEach(botao => {
        botao.addEventListener('click', function() {
            const cartaoDestaque = this.closest('.cartao-destaque');
            if (cartaoDestaque) {
                this.innerHTML = '<i class="fas fa-check-circle"></i> Lido';
                this.classList.add('confirmado');
                this.disabled = true;
                alert('Aviso marcado como lido!');
            }
        });
    });
    
    botoesLeiaMais.forEach(botao => {
        botao.addEventListener('click', function() {
            const avisoId = this.getAttribute('data-aviso');
            const cartaoAviso = this.closest('.cartao-aviso');
            
            cartaoAviso.setAttribute('data-lido', 'true');
            const statusLeitura = cartaoAviso.querySelector('.status-leitura');
            statusLeitura.innerHTML = '<i class="fas fa-envelope-open"></i><span>Lido</span>';
            statusLeitura.classList.add('lido');
            
            const titulo = cartaoAviso.querySelector('h4').textContent;
            const descricao = cartaoAviso.querySelector('.descricao-aviso').textContent;
            const data = cartaoAviso.querySelector('.data-aviso').textContent;
            const badge = cartaoAviso.querySelector('.badge-aviso').textContent.trim();
            const detalhes = cartaoAviso.querySelectorAll('.info-aviso');
            
            let detalhesHTML = '';
            detalhes.forEach(detalhe => {
                detalhesHTML += `<p>${detalhe.innerHTML}</p>`;
            });
            
            const conteudoHTML = `
                <div class="info-aviso-modal">
                    <div class="badge-aviso-modal ${cartaoAviso.getAttribute('data-tipo')}">
                        <i class="fas fa-tag"></i>
                        ${badge}
                    </div>
                    <div class="data-aviso-modal">
                        <i class="far fa-calendar"></i>
                        ${data}
                    </div>
                </div>
                <div class="conteudo-aviso-modal">
                    <h4>${titulo}</h4>
                    <p class="descricao-modal">${descricao}</p>
                    <div class="detalhes-completos">
                        <h5><i class="fas fa-info-circle"></i> Detalhes:</h5>
                        ${detalhesHTML}
                    </div>
                </div>
                <div class="acoes-modal-aviso">
                    <button class="botao-modal-aviso compartilhar">
                        <i class="fas fa-share-alt"></i>
                        Compartilhar
                    </button>
                    <button class="botao-modal-aviso imprimir">
                        <i class="fas fa-print"></i>
                        Imprimir
                    </button>
                </div>
            `;
            
            tituloModalAviso.textContent = titulo;
            conteudoModalAviso.innerHTML = conteudoHTML;
            modalAviso.classList.add('ativo');
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                const botaoCompartilhar = document.querySelector('.botao-modal-aviso.compartilhar');
                const botaoImprimir = document.querySelector('.botao-modal-aviso.imprimir');
                
                if (botaoCompartilhar) {
                    botaoCompartilhar.addEventListener('click', function() {
                        alert('Recurso de compartilhamento ativado!');
                    });
                }
                
                if (botaoImprimir) {
                    botaoImprimir.addEventListener('click', function() {
                        window.print();
                    });
                }
            }, 100);
        });
    });
    
    if (fecharModalAviso) {
        fecharModalAviso.addEventListener('click', function() {
            modalAviso.classList.remove('ativo');
            document.body.style.overflow = 'auto';
        });
    }
    
    if (modalAviso) {
        modalAviso.addEventListener('click', function(e) {
            if (e.target === modalAviso) {
                modalAviso.classList.remove('ativo');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalAviso.classList.contains('ativo')) {
            modalAviso.classList.remove('ativo');
            document.body.style.overflow = 'auto';
        }
    });
    
    atualizarContadores();
    
    cartoesAviso.forEach((cartao, index) => {
        cartao.style.animationDelay = `${index * 0.1}s`;
        cartao.classList.add('animar-entrada');
    });
}

function configuraTransicoesPaginas() {
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="javascript"]):not([href^="mailto"]):not([href^="tel"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.target === '_blank' || 
                this.hasAttribute('download') || 
                this.href.includes('javascript:') ||
                this.href.includes('mailto:') ||
                this.href.includes('tel:')) {
                return;
            }
            
            const href = this.getAttribute('href');
            const paginaAtual = window.location.pathname.split('/').pop();
            
            if (href === paginaAtual || href === '' || href === '#') {
                return;
            }
            
            e.preventDefault();
            const url = this.href;
            mostrarLoading();
            
            setTimeout(() => {
                window.location.href = url;
            }, 800);
        });
    });
}

function mostrarLoading() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-mini">
            <div class="loading-mini-circle">
                <i class="fas fa-graduation-cap"></i>
            </div>
            <div class="loading-mini-text">Carregando...</div>
            <div class="loading-mini-spinner"></div>
        </div>
    `;
 
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0c1a5d 0%, #1a237e 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        animation: fadeInLoading 0.3s ease forwards;
    `;
    
    document.body.appendChild(loadingOverlay);
    document.body.style.overflow = 'hidden';
}

function configuraLoadingEntrePaginas() {
    const links = document.querySelectorAll('.navegacao a, .logo a, a.botao-principal, a[href*=".html"]:not([href*="http"]):not([target="_blank"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && 
                (href.endsWith('.html') || href === '' || href === 'index.html') &&
                !href.includes('loading.html') &&
                !this.hasAttribute('target') &&
                !this.hasAttribute('download')) {

                const paginaAtual = window.location.pathname.split('/').pop();
                const paginaDestino = href === '' ? 'index.html' : href;
                
                if (paginaDestino === paginaAtual) {
                    return; 
                }
                
                e.preventDefault();
                localStorage.setItem('paginaDestino', paginaDestino);
                const tituloPagina = this.textContent.trim() || this.querySelector('i')?.className || 'Página';
                localStorage.setItem('tituloCarregando', `Carregando ${tituloPagina}...`);
                window.location.href = 'loading.html';
            }
        });
    });
}

function initLoading() {
    const isLoadingPage = window.location.pathname.includes('loading.html');
    
    if (!isLoadingPage) {
        document.body.classList.remove('loading-page');
        return;
    }
    
    document.body.classList.add('loading-page');
    
    const paginaDestino = localStorage.getItem('paginaDestino') || 'index.html';
    const tituloCarregando = localStorage.getItem('tituloCarregando') || 'Carregando página...';
    
    const progressStep = document.getElementById('progressStep');
    if (progressStep && tituloCarregando) {
        progressStep.textContent = tituloCarregando;
    }
    
    createParticles();
    
    let progress = 0;
    let currentStep = 0;
    const steps = [
        tituloCarregando,
        "Preparando conteúdo...",
        "Carregando recursos...",
        "Organizando dados...",
        "Quase pronto..."
    ];

    const tips = [
        "Você pode filtrar notas por etapa usando os botões no topo da página",
        "Clique em uma aula na grade de horários para ver detalhes completos",
        "Avisos não lidos são destacados em vermelho para fácil identificação",
        "Use o modo de visualização completa para ver todas as notas detalhadas",
        "Configure lembretes para suas aulas importantes",
        "As cores indicam seu desempenho: verde (alto), laranja (médio), vermelho (baixo)",
        "Selecione diferentes períodos para visualizar horários específicos",
        "Clique em uma matéria para alternar entre visualização resumida e completa"
    ];

    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    const tipContent = document.getElementById('tipContent');
    
    if (!progressBar || !progressPercentage || !progressStep || !tipContent) {
        console.error('Elementos do loading não encontrados');
        setTimeout(() => {
            window.location.href = paginaDestino || "index.html";
        }, 1000);
        return;
    }
    
    let tipIndex = 0;
    setInterval(() => {
        tipContent.style.opacity = '0';
        setTimeout(() => {
            tipContent.textContent = tips[tipIndex];
            tipContent.style.opacity = '1';
            tipIndex = (tipIndex + 1) % tips.length;
        }, 300);
    }, 5000);
    
    function updateProgress() {
        if (progress < 100) {
            const increment = Math.random() * 8 + 2;
            progress = Math.min(progress + increment, 100);
            
            progressBar.style.width = `${progress}%`;
            progressPercentage.textContent = `${Math.round(progress)}%`;
            
            if (progress >= (currentStep + 1) * (100 / steps.length)) {
                currentStep = Math.min(currentStep + 1, steps.length - 1);
                progressStep.textContent = steps[currentStep];
            }
            
            if (Math.floor(progress) % 20 === 0 && progress < 100) {
                const randomTip = tips[Math.floor(Math.random() * tips.length)];
                tipContent.style.opacity = '0';
                
                setTimeout(() => {
                    tipContent.textContent = randomTip;
                    tipContent.style.opacity = '1';
                }, 300);
            }
            
            const delay = progress < 70 ? 300 : 500;
            setTimeout(updateProgress, delay);
        } else {
            progressStep.textContent = "Redirecionando...";
            progressBar.style.background = "linear-gradient(90deg, #4caf50 0%, #2e7d32 100%)";
            
            localStorage.removeItem('tituloCarregando');
            
            setTimeout(() => {
                window.location.href = paginaDestino || "index.html";
            }, 800);
        }
    }
    
    updateProgress();
}
        
document.addEventListener('DOMContentLoaded', function() {
    const isLoadingPage = window.location.pathname.includes('loading.html');
    
    if (isLoadingPage) {
        initLoading();
        return;
    }
    
    atualizaData();
    configuraNotificacoes();
    configuraEventosModal();
    configuraMenu();
    configurarMenuAtivoPorPagina();
    configuraHoverCards();
    configuraLoadingEntrePaginas();
    
    const paginaAtual = window.location.pathname.split('/').pop();
    
    if (paginaAtual === 'horarios.html') {
        inicializaPaginaHorarios();
    } else if (paginaAtual === 'turma.html') {
        inicializaPaginaTurma();
    } else if (paginaAtual === 'notas.html') {
        inicializaPaginaNotas();
    } else if (paginaAtual === 'avisos.html') {
        inicializaPaginaAvisos();
    }
    
    setInterval(atualizaData, 60000);
});

window.addEventListener('resize', function() {
    const menuLateral = document.querySelector('.menu-lateral');
    const navegacao = document.querySelector('.navegacao');
    
    if (window.innerWidth <= 992) {
        if (navegacao) navegacao.style.display = 'none';
        if (menuLateral) menuLateral.style.flexDirection = 'row';
    } else {
        if (navegacao) navegacao.style.display = 'block';
        if (menuLateral) menuLateral.style.flexDirection = 'column';
    }
});