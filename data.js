const SHOP_DATA = [
    { 
        name: "Outfits", 
        prefix: "kha", 
        bg: "bgs/green.png", 
        items: [
            { 
                name: "Cyber Suit", 
                price: "$120", 
                desc: "High-durability stealth plating with neon trim.",
                link: "#", 
                imgs: ["products/outfit1.jpg", "products/outfit1_alt.jpg"] 
            },
            { 
                name: "Ghost Cloak", 
                price: "$85", 
                desc: "Semi-transparent fabric for urban infiltration.",
                link: "#", 
                imgs: ["products/outfit2.jpg"] 
            },
            { 
                name: "Phase Armor", 
                price: "$150", 
                desc: "Experimental tech for short-range blinking.",
                link: "#", 
                imgs: ["products/outfit3.jpg"] 
            },
            { 
                name: "Neon Tunic", 
                price: "$95", 
                desc: "Stylish daily wear with bio-luminescent fiber.",
                link: "#", 
                imgs: ["products/outfit4.jpg"] 
            }
        ] 
    },
    { 
        name: "Accessories", 
        prefix: "saf", 
        bg: "bgs/silver.png", 
        items: [
            { name: "Tech Visor", price: "$45", link: "#", desc: "", imgs: [
                "products/acc1_0.png",
                "products/acc1_1.png",
                "products/acc1_2.png"
            ] },
            { name: "Utility Belt", price: "$60", link: "#", desc: "", imgs: [
                "products/acc2_0.png",
                "products/acc2_1.png",
                "products/acc2_2.png",
                "products/acc2_3.png"
            ] },
            { name: "Pulse Link", price: "$30", link: "#", desc: "", imgs: ["products/acc3.png"] },
            { name: "Scout Mask", price: "$55", link: "#", desc: "", imgs: ["products/acc4.png"] }
        ] 
    },
    { 
        name: "Silver", 
        prefix: "dav", 
        bg: "bgs/red.png", 
        items: [
            { name: "Silver Chain L", price: "$382", link: "https://dashboard.stripe.com/acct_1RyDZOQFwT9DsgsK/payment-links/plink_1T1Cs6QFwT9DsgsKTcD0DI0t",
                desc: "108g of 825 Sterling Silver. Rough industrial look.",
                imgs: ["products/silver4.jpg"] },
            { name: "Heart Bracelet M", price: "$210", link: "#",
                desc: "???g of 825 Sterling Silver. Rough industrial look. Smooth heart",
                imgs: ["products/silver1.jpg"] },
            { name: "Barbed Wire Bracelet", price: "$150", link: "#",
                desc: "???g of 825 Sterling Silver. Pokey.",
                imgs: ["products/silver3.jpg"] },
            { name: "Link Bracelet L", price: "$180", link: "#",
                desc: "???g of 825 Sterling Silver. Rough industrial look. Wire strengths 2 and 4 mm.",
                imgs: ["products/silver2.jpg"] }
        ] 
    }
];
