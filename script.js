document.addEventListener("DOMContentLoaded", () => {
    // 1. Animación de aparición al hacer scroll (Fade-In)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Si la sección contiene contadores, iniciarlos
                const counters = entry.target.querySelectorAll('.counter');
                if (counters.length > 0) {
                    counters.forEach(counter => animateCounter(counter));
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate');
    animatedElements.forEach(el => observer.observe(el));

    // 2. Animación de números en las estadísticas
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = target / 50; // Velocidad de conteo

        const updateCount = () => {
            count += speed;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target + (target > 50 ? "+" : "");
            }
        };

        updateCount();
    }
});