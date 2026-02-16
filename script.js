let currentActive = -1;
let isMoving = false;
let touchStartX = 0;

function switchTab(newIdx) {
    if (newIdx === currentActive || isMoving) return;
    isMoving = true;

    window.location.hash = (newIdx + 1);

    // Fade Background Logic
    const bg1 = document.getElementById('bg-1');
    const bg2 = document.getElementById('bg-2');
    const nextPath = SHOP_DATA[newIdx].bg;

    if (bg1.classList.contains('active')) {
        bg2.style.backgroundImage = `url('${nextPath}')`;
        bg2.classList.add('active');
        bg1.classList.remove('active');
    } else {
        bg1.style.backgroundImage = `url('${nextPath}')`;
        bg1.classList.add('active');
        bg2.classList.remove('active');
    }

    const leftIdx = (newIdx + 2) % 3;
    const rightIdx = (newIdx + 1) % 3;
    const mapping = { [newIdx]: "pos-center", [leftIdx]: "pos-left", [rightIdx]: "pos-right" };
    const faces = { [newIdx]: "straight", [leftIdx]: "left", [rightIdx]: "right" };

    SHOP_DATA.forEach((cat, i) => {
        const container = document.getElementById(`char-${i}`);
        const frontImg = document.getElementById(`img-front-${i}`);
        const backImg = document.getElementById(`img-back-${i}`);
        const btn = document.getElementById(`btn-${i}`);

        if (container.classList.contains('pos-left') && mapping[i] === 'pos-right' || 
            container.classList.contains('pos-right') && mapping[i] === 'pos-left') {
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
    let html = `<h2 style="text-align:center; font-size:2rem; margin-bottom:40px;">${mainCat.name}</h2><div class="grid">`;
    html += mainCat.items.map(item => `
        <div class="card">
            <img src="${item.img}" class="product-img" onerror="this.src='https://via.placeholder.com/200x180'">
            <h3>${item.name}</h3><p>${item.price}</p>
            <a href="${item.link}" target="_blank" class="buy-btn">VIEW PRODUCT</a>
        </div>`).join('');
    store.innerHTML = html + `</div>`;
}

function loadFromHash() {
    const hash = window.location.hash.replace('#', '');
    let index = parseInt(hash) - 1;
    if (isNaN(index) || index < 0 || index > 2) index = 1;
    switchTab(index);
}

window.addEventListener('DOMContentLoaded', () => {
    const viewport = document.querySelector('.banner-viewport');
    viewport.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
    viewport.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) < 50) return;
        if (diff > 0) switchTab((currentActive + 1) % 3);
        else switchTab((currentActive + 2) % 3);
    }, {passive: true});
    loadFromHash();
});
window.addEventListener('hashchange', loadFromHash);
