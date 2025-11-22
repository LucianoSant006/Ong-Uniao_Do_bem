document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("carousel-container");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    // Configuração
    const scrollAmount = 300; // Quanto ele rola por vez (ajuste se necessário)
    const autoScrollDelay = 3000; // Tempo em milissegundos (3000 = 3 segundos)
    let autoScrollInterval;

    // --- Funções de Movimento ---

    // Rolar para a direita
    function scrollNext() {
        // Verifica se chegou no fim
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
            // Se chegou no fim, volta para o começo suavemente
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            // Se não, rola para o lado
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

    // Rolar para a esquerda
    function scrollPrev() {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }

    // --- Ativar os Botões ---
    nextBtn.addEventListener("click", () => {
        scrollNext();
        resetTimer(); // Reinicia o tempo se a pessoa clicar
    });

    prevBtn.addEventListener("click", () => {
        scrollPrev();
        resetTimer();
    });

    // --- Automação (Passar sozinho) ---
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(scrollNext, autoScrollDelay);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    function resetTimer() {
        stopAutoScroll();
        startAutoScroll();
    }

    // Pausa quando o mouse está em cima do carrossel
    container.addEventListener("mouseenter", stopAutoScroll);
    
    // Volta a rodar quando o mouse sai
    container.addEventListener("mouseleave", startAutoScroll);

    // Inicia a contagem assim que a página carrega
    startAutoScroll();
});