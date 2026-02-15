let currentActive = -1;
let isMoving = false;

function switchTab(newIdx) {
    if (newIdx === currentActive || isMoving) return;
    isMoving = true;

    const leftIdx = (newIdx + 2) % 3;
    const rightIdx = (newIdx + 1) % 3;

    const mapping = { [newIdx]: "pos-center", [leftIdx]: "pos-left", [rightIdx]: "pos-right" };
    const faces = { [newIdx]: "straight", [leftIdx]: "left", [rightIdx]: "right" };

    SHOP_DATA.forEach((cat, i) => {
        const container = document.getElementById(`char-${i}`);
        const frontImg = document.getElementById(`img-front-${i}`);
        const backImg = document.getElementById(`img-back-${i}`);
        const btn = document.getElementById(`btn-${i}`);

        // Handle the loop teleportation
        if ((container.classList.contains('pos-left') && mapping[i] === 'pos-right') || 
            (container.classList.contains('pos-right') && mapping[i] === 'pos-left')) {
            container.classList.add('teleporting');
        }

        // Trigger Cross-fade
        backImg.src = `characters/${cat.prefix}_${faces[i]}.png`;
        frontImg.style.opacity = '0';
        backImg.style.opacity = '1';
        
        // Move container
        container.className = "char-container " + mapping[i];
        btn.classList.toggle('active', i === newIdx);

        // Reset for next movement
        setTimeout(() => {
            frontImg.src = backImg.src;
            frontImg.style.transition = 'none';
            frontImg.style.opacity = '1';
            backImg.style.opacity = '0';
            setTimeout(() => {
                frontImg.style.transition = '';
                container.classList.remove('teleporting');
            }, 50);
        }, 800);
    });

    currentActive = newIdx;
    renderShop(newIdx);
    setTimeout(() => { isMoving = false; }, 850);
}

function renderShop(idx) {
    const store = document.getElementById('storefront');
    const mainCat = SHOP_DATA[idx];
    
    // Main Section
    let html = `<h2>${mainCat.name} Collection</h2><div class="grid">`;
    html += mainCat.items.map(item => `
        <div class="card">
            <div class="box"></div>
            <b>${item.name}</b>
            <p>${item.price}</p>
            <a href="${item.link}" target="_blank" class="buy-btn">BUY NOW</a>
        </div>`).join('');
    html += `</div>`;

    // "Complete the Set" (Cross-sell: 2 items from each other character)
    html += `<h2>Complete the Set</h2><div class="grid">`;
    SHOP_DATA.forEach((cat, cIdx) => {
        if (cIdx !== idx) {
            html += cat.items.slice(0, 2).map(item => `
                <div class="card">
                    <div class="box"></div>
                    <b>${item.name}</b>
                    <p>${item.price}</p>
                    <a href="${item.link}" target="_blank" class="buy-btn">BUY NOW</a>
                </div>`).join('');
        }
    });
    html += `</div>`;
    store.innerHTML = html;
}

// Startup Logic
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const shopParam = params.get('shop')?.toLowerCase();
    
    let startIndex = SHOP_DATA.findIndex(c => c.slug === shopParam);
    if (startIndex === -1) startIndex = Math.floor(Math.random() * 3);

    switchTab(startIndex);
});
