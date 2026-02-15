let currentActive = -1;
let isMoving = false;

function switchTab(newIdx) {
    if (newIdx === currentActive || isMoving) return;
    isMoving = true;

    // Update the URL hash without reloading
    window.location.hash = (newIdx + 1);

    const leftIdx = (newIdx + 2) % 3;
    const rightIdx = (newIdx + 1) % 3;

    const mapping = { [newIdx]: "pos-center", [leftIdx]: "pos-left", [rightIdx]: "pos-right" };
    const faces = { [newIdx]: "straight", [leftIdx]: "left", [rightIdx]: "right" };

    SHOP_DATA.forEach((cat, i) => {
        const container = document.getElementById(`char-${i}`);
        const frontImg = document.getElementById(`img-front-${i}`);
        const backImg = document.getElementById(`img-back-${i}`);
        const btn = document.getElementById(`btn-${i}`);

        if ((container.classList.contains('pos-left') && mapping[i] === 'pos-right') || 
            (container.classList.contains('pos-right') && mapping[i] === 'pos-left')) {
            container.classList.add('teleporting');
        }

        backImg.src = `characters/${cat.prefix}_${faces[i]}.png`;
        frontImg.style.opacity = '0';
        backImg.style.opacity = '1';
        container.className = "char-container " + mapping[i];
        btn.classList.toggle('active', i === newIdx);

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
    
    let html = `<h2>${mainCat.name} Collection</h2><div class="grid">`;
    html += mainCat.items.map(item => `
        <div class="card">
            <img src="${item.img}" class="product-img" onerror="this.src='https://via.placeholder.com/200x180?text=No+Image'">
            <b>${item.name}</b>
            <p>${item.price}</p>
            <a href="${item.link}" target="_blank" class="buy-btn">BUY NOW</a>
        </div>`).join('');
    html += `</div>`;

    html += `<h2>Complete the Set</h2><div class="grid">`;
    SHOP_DATA.forEach((cat, cIdx) => {
        if (cIdx !== idx) {
            html += cat.items.slice(0, 2).map(item => `
                <div class="card">
                    <img src="${item.img}" class="product-img" onerror="this.src='https://via.placeholder.com/200x180?text=No+Image'">
                    <b>${item.name}</b>
                    <p>${item.price}</p>
                    <a href="${item.link}" target="_blank" class="buy-btn">BUY NOW</a>
                </div>`).join('');
        }
    });
    html += `</div>`;
    store.innerHTML = html;
}

// Initial Load Logic
function loadFromHash() {
    const hash = window.location.hash.replace('#', '');
    let index = parseInt(hash) - 1;
    
    if (isNaN(index) || index < 0 || index > 2) {
        index = Math.floor(Math.random() * 3);
    }
    switchTab(index);
}

window.addEventListener('DOMContentLoaded', loadFromHash);
// Handle back/forward button
window.addEventListener('hashchange', loadFromHash);
