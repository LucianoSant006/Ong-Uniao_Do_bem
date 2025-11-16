// NAVBAR
const navbar = document.querySelector("nav");
window.addEventListener("scroll", () =>
    navbar.classList.toggle("sticky", window.scrollY > 0)
);

// Menu Mobile (Hamburguer)
const menu = document.querySelector(".menu");
const toggleMenu = () => menu.classList.toggle("active");

document.querySelector(".menu-btn").addEventListener("click", toggleMenu);
document.querySelector(".close-btn").addEventListener("click", toggleMenu);

document
    .querySelectorAll(".menu a")
    .forEach((link) => link.addEventListener("click", toggleMenu));

// Lenis Smooth Scrolling
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
};
requestAnimationFrame(raf);
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);


// Scroll Reveal
const sr = ScrollReveal({
    origin: "bottom",
    distance: "40px",
    duration: 800,
    delay: 200,
    easing: "ease-in-out",
});

gsap.to("nav", {
    opacity: 1,
    duration: 2,
});
sr.reveal(".hero-headlines h1");
sr.reveal(".hero-headlines p", { delay: 500 });
sr.reveal(".hero-headlines-buttons", { delay: 1000 });
sr.reveal(".processo-headlines h1");
sr.reveal(".processo-headlines p", { delay: 500 });
sr.reveal(".processo-img", { delay: 500 });
sr.reveal(".pets-headlines");
sr.reveal(".acao-item", { interval: 200 }); 
sr.reveal(".sobre-headlines");
sr.reveal(".img-sobre");
sr.reveal(".testimunhas h1", { delay: 500 });
sr.reveal(".testimunhas h6");
sr.reveal(".testimunhas-item", { delay: 1000, interval: 200 });
sr.reveal(".footer-brand");
sr.reveal(".footer-links", { delay: 500, origin: "left" });
sr.reveal(".footer-doacao", { delay: 500, origin: "bottom" });
sr.reveal(".copyright", { delay: 600 });
sr.reveal(".presentes-container", { delay: 300 }); // Animação para nova seção

// GSAP Text Reveal
const splitTypes = document.querySelectorAll(".reveal-type");
splitTypes.forEach((char, i) => {
    const bg = char.dataset.bgColor;
    const fg = char.dataset.fgColor;
    const text = new SplitType(char, { type: "chars" }); 

    gsap.fromTo(
        text.chars,
        { color: bg, },
        {
            color: fg,
            duration: 0.3,
            stagger: 0.02,
            scrollTrigger: {
                trigger: char,
                start: "top 80%",
                end: "top 20%",
                scrub: true,
                markers: false,
                toggleActions: "play play reverse reverse",
            },
        }
    );
});


// ==================================================
// JS PARA CARROSSEL E BOTÃO COPIAR PIX
// ==================================================
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Lógica do Carrossel ---
    const carousel = document.getElementById("carousel-container");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");

    if (carousel) {
        let autoScrollInterval;

        const scrollStep = () => {
            const firstItem = carousel.querySelector(".carousel-item");
            if (firstItem) {
                return firstItem.offsetWidth + 20; // Largura do item + gap
            }
            return 300; 
        };

        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                // Se chegou ao fim, volta ao início
                if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 50) { // -50 de margem
                    carousel.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    carousel.scrollBy({ left: scrollStep(), behavior: 'smooth' });
                }
            }, 4000); // Muda a cada 4 segundos
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };

        // Inicia o carrossel automático
        startAutoScroll();

        // Pausa ao passar o mouse
        carousel.addEventListener("mouseover", stopAutoScroll);
        carousel.addEventListener("mouseout", startAutoScroll);

        // Botões manuais
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                carousel.scrollBy({ left: scrollStep(), behavior: 'smooth' });
                stopAutoScroll(); // Para o auto-scroll se o usuário interagir
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                carousel.scrollBy({ left: -scrollStep(), behavior: 'smooth' });
                stopAutoScroll(); // Para o auto-scroll se o usuário interagir
            });
        }
    }

    // --- Lógica do Botão Copiar PIX ---
    const copyBtn = document.getElementById("copy-pix-btn");
    const pixKeyText = document.getElementById("pix-key-text");

    if (copyBtn && pixKeyText) {
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(pixKeyText.innerText)
                .then(() => {
                    copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copiado!';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
                    }, 2000);
                })
                .catch(err => {
                    console.error("Falha ao copiar PIX: ", err);
                });
        });
    }
});