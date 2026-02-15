const categories = [
    { 
        name: "Outfits", 
        prefix: "kha", 
        items: [
            { name: "Cyber Suit", price: "$120", link: "YOUR_STRIPE_LINK_1" },
            { name: "Ghost Cloak", price: "$85", link: "YOUR_STRIPE_LINK_2" }
        ] 
    },
    { 
        name: "Accessories", 
        prefix: "saf", 
        items: [
            { name: "Tech Visor", price: "$45", link: "YOUR_STRIPE_LINK_3" },
            { name: "Utility Belt", price: "$60", link: "YOUR_STRIPE_LINK_4" }
        ] 
    },
    { 
        name: "Silver", 
        prefix: "dav", 
        items: [
            { name: "Heavy Ring", price: "$150", link: "YOUR_STRIPE_LINK_5" },
            { name: "Silver Chain", price: "$210", link: "YOUR_STRIPE_LINK_6" }
        ] 
    }
];

let currentActive = 1;
let isMoving = false;

function switchTab(newIdx) {
    if (newIdx === currentActive || isMoving) return;
    isMoving = true;

    const leftIdx = (newIdx + 2) % 3;
    const rightIdx = (newIdx + 1) % 3;

    const mapping = { [newIdx]: "pos-center", [leftIdx]: "pos-left", [rightIdx]: "pos-right" };
    const faces = { [newIdx]: "straight", [leftIdx]: "left", [rightIdx]: "right" };

    categories.forEach((cat, i) => {
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
    const mainCat = categories[idx];
    
    // Main Section
    let html = `<h2>${mainCat.name} Collection</h2><div class="grid">`;
    html += mainCat.items.map(item => `
        <div class="card">
            <div class="box"></div>
            <b>${item.name}</b>
            <p>${item.price}</p>
            <a href="${item.link}" class="buy-btn">BUY NOW</a>
        </div>`).join('');
    html += `</div>`;

    // Cross-sell Section (You might also like)
    html += `<h2>Complete the Set</h2><div class="grid">`;
    categories.forEach((cat, i) => {
        if(i !== idx) {
            const item = cat.items[0];
            html += `
                <div class="card">
                    <div class="box"></div>
                    <b>${item.name}</b>
                    <p>${item.price}</p>
                    <a href="${item.link}" class="buy-btn">BUY NOW</a>
                </div>`;
        }
    });
    html += `</div>`;

    store.innerHTML = html;
}

window.onload = () => switchTab(1);
