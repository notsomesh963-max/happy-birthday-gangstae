document.addEventListener("DOMContentLoaded", () => {
    const pageIndex = document.body.getAttribute("data-page");
    
    initGoldDustBackground();
    initCustomCursorAndTrails();
    initLuxuryAudioController();

    if (pageIndex === "1") initChronographCountdown();
    if (pageIndex === "2") initSpiralReelScroll();
    if (pageIndex === "3") initStarCatchGame();
});

/* BACKGROUND SYSTEM */
function initGoldDustBackground() {
    const canvas = document.getElementById("goldDustCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener("resize", resize);
    resize();

    for (let i = 0; i < 35; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.8 + 0.5,
            speed: Math.random() * 0.3 + 0.1,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.fillStyle = `rgba(214, 175, 55, ${p.opacity})`;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();

            p.y -= p.speed;
            if (p.y < -10) {
                p.y = canvas.height + 10;
                p.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(render);
    }
    render();
}

/* CUSTOM SPARKS */
function initCustomCursorAndTrails() {
    const cursor = document.getElementById("custom-cursor");
    window.addEventListener("mousemove", (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        }
        if (Math.random() < 0.08) {
            const sparkle = document.createElement("div");
            sparkle.className = "trail-sparkle";
            sparkle.innerHTML = Math.random() > 0.5 ? "✨" : "🌸";
            sparkle.style.left = e.clientX + "px";
            sparkle.style.top = e.clientY + "px";
            document.body.appendChild(sparkle);
            setTimeout(() => { sparkle.remove(); }, 1000);
        }
    });
}

/* AUDIO MANAGER */
function initLuxuryAudioController() {

    const audio = document.getElementById("luxe-audio-engine");
    const playBtn = document.getElementById("luxe-play-btn");
    const volume = document.getElementById("luxe-volume");

    if (!audio) {
        console.log("Audio element not found");
        return;
    }

    if (!playBtn) {
        console.log("Play button not found");
        return;
    }


    // Default volume
    audio.volume = 0.5;


    playBtn.addEventListener("click", function () {


        if (audio.paused) {


            audio.play()
            .then(() => {

                playBtn.innerHTML =
                '<i class="fas fa-pause"></i>';

                console.log("Music Playing");

            })
            .catch(error => {

                console.log("Music Error:", error);

            });


        } 
        
        else {


            audio.pause();

            playBtn.innerHTML =
            '<i class="fas fa-play"></i>';

            console.log("Music Paused");

        }


    });



    if(volume){

        volume.addEventListener("input", function(){

            audio.volume = this.value;

        });

    }



    // Reset icon when song ends
    audio.addEventListener("ended", function(){

        playBtn.innerHTML =
        '<i class="fas fa-play"></i>';

    });


}


document.addEventListener(
"DOMContentLoaded",
function(){

    initLuxuryAudioController();

});
/* TOASTS */
function launchLuxeToast(message) {
    const toast = document.getElementById("luxe-toast-notification");
    if (!toast) return;
    toast.innerHTML = message;
    toast.classList.remove("hidden");
    
    clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => { toast.classList.add("hidden"); }, 2500);
}

/* CONFETTI SYSTEMS */
function spawnGoldConfetti(targetX, targetY) {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.className = "gold-confetti-particle";
        particle.style.background = Math.random() > 0.5 ? "#ff80ab" : "#D4AF37";
        particle.style.setProperty("--bx", targetX + "px");
        particle.style.setProperty("--by", targetY + "px");

        const castAngle = Math.random() * Math.PI * 2;
        const radiusVelocity = Math.random() * 100 + 30;
        
        particle.style.setProperty("--cx", Math.cos(castAngle) * radiusVelocity + "px");
        particle.style.setProperty("--cy", Math.sin(castAngle) * radiusVelocity + "px");

        document.body.appendChild(particle);
        setTimeout(() => { particle.remove(); }, 600);
    }
}

function burstGoldConfettiFromButton(e) { spawnGoldConfetti(e.clientX, e.clientY); }

function burstGoldConfettiThenNavigate(e, targetUrl) {
    spawnGoldConfetti(e.clientX, e.clientY);
    const mainViewport = document.getElementById("view-viewport");
    if (mainViewport) mainViewport.classList.add("zoom-out-exit");
    setTimeout(() => { window.location.href = targetUrl; }, 400);
}

/* PAGE 1: FIXED SURPRISE LIFT TARGET DATE */
function unpackRoyalInvitation(e) {
    spawnGoldConfetti(e.clientX, e.clientY);
    document.getElementById("invitation-envelope").classList.add("envelope-opened");
}

function initChronographCountdown() {
    // Exact requested deadline locked to July 11, 2026
    const targetTime = new Date("July 11, 2026 00:00:00").getTime();

    function cycleChronograph() {
        const now = new Date().getTime();
        const separation = targetTime - now;

        if (separation <= 0) {
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            
            const para = document.querySelector(".luxe-paragraph");
            if (para) para.innerHTML = "🎉 **IT'S JULY 11! Happy Birthday Shelly!** Your complete sanctuary lounge is officially active! Enjoy!";
            return;
        }

        const d = Math.floor(separation / (1000 * 60 * 60 * 24));
        const h = Math.floor((separation % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((separation % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((separation % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(d).padStart(2, "0");
        document.getElementById("hours").innerText = String(h).padStart(2, "0");
        document.getElementById("minutes").innerText = String(m).padStart(2, "0");
        document.getElementById("seconds").innerText = String(s).padStart(2, "0");
    }
    setInterval(cycleChronograph, 1000);
    cycleChronograph();
}

/* PAGE 2: SCROLL SYSTEM */
function initSpiralReelScroll() {
    const track = document.getElementById("luxe-spiral-viewport");
    if (!track) return;
    track.addEventListener("wheel", (e) => {
        e.preventDefault();
        track.scrollLeft += e.deltaY * 0.8;
    }, { passive: false });
}

/* PAGE 3: INTERACTIVE FUN LAYOUT GAMES */
let isWheelSpinning = false;
function spinRoyalWheel() {
    if (isWheelSpinning) return;
    isWheelSpinning = true;

    const wheel = document.getElementById("main-fortune-wheel");
    const outcomes = ["Best Smile Choice!", "A Giant Free Hug!", "Food Treat on Me!", "Big Wish Unlocked!", "Pure Queen Vibes!", "Super Lucky Day!"];

    const randomDegrees = Math.floor(Math.random() * 360) + 1440; 
    wheel.style.transform = `rotate(${randomDegrees}deg)`;

    setTimeout(() => {
        isWheelSpinning = false;
        const normalized = (360 - (randomDegrees % 360)) % 360;
        const sectorIndex = Math.floor(normalized / 60);
        launchLuxeToast(`Landed on: <strong>${outcomes[sectorIndex % 6]}</strong> 🎁`);
    }, 4000);
}

// Fixed Star Catcher Game using Input Range Bar
function initStarCatchGame() {
    const container = document.getElementById("star-game-container");
    const canvas = document.getElementById("starGameCanvas");
    const basket = document.getElementById("game-basket");
    const slider = document.getElementById("basket-controller-slider");
    if (!canvas || !container || !basket || !slider) return;

    const ctx = canvas.getContext("2d");
    let score = 0;
    let stars = [];

    function resize() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    resize();

    // Move basket using the slider bar value
    slider.addEventListener("input", (e) => {
        const value = e.target.value; 
        const maxLeft = canvas.width - 30;
        const currentLeft = (value / 100) * maxLeft;
        basket.style.left = (currentLeft + 15) + "px";
    });

    function runStarTick() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (Math.random() < 0.03) {
            stars.push({ x: Math.random() * (canvas.width - 30) + 15, y: 0, speed: Math.random() * 1.5 + 1.5 });
        }

        // Get basket location relative to layout
        const basketRectLeft = basket.offsetLeft;

        for (let i = stars.length - 1; i >= 0; i--) {
            let s = stars[i];
            s.y += s.speed;

            ctx.fillStyle = "#D4AF37";
            ctx.beginPath();
            ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
            ctx.fill();

            // Catch test boundary check
            if (s.y >= canvas.height - 25 && s.y <= canvas.height - 5) {
                if (s.x >= basketRectLeft - 20 && s.x <= basketRectLeft + 35) {
                    score++;
                    document.getElementById("star-score-val").innerText = score;
                    stars.splice(i, 1);
                    continue;
                }
            }

            if (s.y > canvas.height) {
                stars.splice(i, 1);
                launchLuxeToast("Aww, no problem! Keep going! 🌟");
            }
        }
        requestAnimationFrame(runStarTick);
    }
    runStarTick();
}

// Fully Fixed Panda Clicker Game
let pandaClicks = 0;
let isPandaRunning = true;

setInterval(() => {
    if (!isPandaRunning) return;
    const panda = document.getElementById("target-panda");
    if (panda) panda.style.left = (Math.random() * 75) + "%";
}, 850);

function handlePandaClick(e) {
    e.stopPropagation(); // Stop click from sliding away early
    if (pandaClicks >= 10) return;
    
    spawnGoldConfetti(e.clientX, e.clientY);
    pandaClicks++;
    document.getElementById("panda-click-counter").innerText = pandaClicks;

    if (pandaClicks === 10) {
        isPandaRunning = false;
        document.getElementById("target-panda").style.display = "none";
        document.getElementById("panda-win-banner").classList.remove("hidden");
        launchLuxeToast("Status Unlocked: GANGSTER 🐼🏆");
    }
}

/* PAGE 4: BLOW CANDLE COLLAPSE PACK */
function initiateCosmicCollapse() {
    const fl = document.getElementById("main-candle-flame");
    if (fl) fl.style.display = "none";

    document.getElementById("cake-system-node").classList.add("collapsed-singularity");
    document.getElementById("control-panel-node").classList.add("collapsed-singularity");

    setTimeout(() => {
        document.getElementById("cake-system-node").style.display = "none";
        document.getElementById("control-panel-node").style.display = "none";
        
        document.body.classList.add("deep-space-darkness");
        
        // Fireworks canvas boom
        const canvas = document.getElementById("fireworksCanvas");
        if (canvas) {
            const ctx = canvas.getContext("2d");
            canvas.width = window.innerWidth; canvas.height = window.innerHeight;
            let sparks = [];
            for (let i = 0; i < 100; i++) {
                const rad = Math.random() * Math.PI * 2;
                const vel = Math.random() * 5 + 2;
                sparks.push({ x: canvas.width/2, y: canvas.height/3, vx: Math.cos(rad)*vel, vy: Math.sin(rad)*vel, alpha: 1, color: Math.random() > 0.5 ? "#D4AF37" : "#ff4081" });
            }
            function anim() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                let live = false;
                sparks.forEach(s => {
                    if (s.alpha <= 0) return; live = true;
                    s.x += s.vx; s.y += s.vy; s.alpha -= 0.02;
                    ctx.fillStyle = s.color; ctx.globalAlpha = s.alpha;
                    ctx.beginPath(); ctx.arc(s.x, s.y, 3, 0, Math.PI*2); ctx.fill();
                });
                if (live) requestAnimationFrame(anim);
            }
            anim();
        }

        document.getElementById("secret-letter-box").classList.remove("reality-shifted-hidden");
        document.getElementById("replay-btn").classList.remove("reality-shifted-hidden");
    }, 900);
}

function restartJourney() {
    window.location.href = "index.html";
}
