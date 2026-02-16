let currentActive = -1;
let isMoving = false;
let touchStartX = 0;

function switchTab(newIdx) {
    if (newIdx === currentActive || isMoving) return;
    isMoving = true;

    window.location.hash = (newIdx + 1);

    // Cross-fade Backgrounds
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
    const cat = SHOP_DATA[idx];
    const sectionColor = cat.color; // Get the specific section color
    
    let html = `<h2 style="text-align:center; font-size:2rem; margin-bottom:40px">${cat.name}</h2><div class="grid">`;
    
    html += cat.items.map((item, itemIdx) => {
        const imgsHtml = item.imgs.map((src, i) => 
            `<img src="${src}" class="gallery-img ${i === 0 ? 'active' : ''}" data-index="${i}">`
        ).join('');

        const dotsHtml = item.imgs.length > 1 ? 
            `<div class="gallery-dots">${item.imgs.map((_, i) => `<div class="dot ${i === 0 ? 'active' : ''}"></div>`).join('')}</div>` : '';

        return `
        <div class="card">
            <div class="product-gallery" onclick="handleGalleryClick(event, this)">
                ${imgsHtml}
                ${dotsHtml}
            </div>
            <h3>${item.name}</h3>
            <p><strong>${item.price}</strong></p>
            <p class="product-desc">${item.desc}</p>
            <a href="${item.link}" target="_blank" class="buy-btn" style="background-color: ${sectionColor}">BUY</a>
        </div>`;
    }).join('');
    
    store.innerHTML = html + `</div>`;
}


function handleGalleryClick(event, galleryEl) {
    const rect = galleryEl.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;

    const images = galleryEl.querySelectorAll('.gallery-img');
    const dots = galleryEl.querySelectorAll('.dot');
    let activeIdx = Array.from(images).findIndex(img => img.classList.contains('active'));

    // Center Click (33% to 66%): Full Screen
    if (x > width * 0.33 && x < width * 0.66) {
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-img');
        modalImg.src = images[activeIdx].src;
        modal.style.display = 'flex';
        return;
    }

    // Edge Clicks: Scroll
    if (images.length <= 1) return;
    images[activeIdx].classList.remove('active');
    if (dots.length) dots[activeIdx].classList.remove('active');

    if (x <= width * 0.33) {
        activeIdx = (activeIdx - 1 + images.length) % images.length;
    } else {
        activeIdx = (activeIdx + 1) % images.length;
    }

    images[activeIdx].classList.add('active');
    if (dots.length) dots[activeIdx].classList.add('active');
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
