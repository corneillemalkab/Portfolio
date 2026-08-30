/**
 * ============================================================================
 * Corneille Malonga · Hybrid Transit Matrix Background Engine (network-canvas.js)
 * Supports dynamic Light & Dark mode palette adjustments
 * ============================================================================
 */

(function () {
    const canvas = document.getElementById('networkMeshCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let nodes = [];
    let packets = [];

    // Configuration
    const NODE_COUNT = window.innerWidth < 768 ? 26 : 52;
    const MAX_DISTANCE = 160;
    const MOUSE_RADIUS = 180;
    const PACKET_SPEED = 1.1;

    let mouse = { x: null, y: null };

    // Resize Handler
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Check Theme
    function isLightMode() {
        return document.documentElement.getAttribute('data-theme') === 'light';
    }

    // Node Class (Represents Cloud Gateways, On-Prem DC Nodes, PaaS endpoints)
    class Node {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = (Math.random() - 0.5) * 0.45;
            this.radius = Math.random() > 0.85 ? 3.5 : 2;
            this.type = Math.random() > 0.5 ? 'cloud' : 'onprem';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off boundaries
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Subtle mouse repulsion
            if (mouse.x !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_RADIUS) {
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    this.x += (dx / dist) * force * 1.4;
                    this.y += (dy / dist) * force * 1.4;
                }
            }
        }

        draw() {
            const light = isLightMode();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            
            if (light) {
                ctx.fillStyle = this.type === 'cloud' ? 'rgba(0, 102, 184, 0.75)' : 'rgba(2, 132, 199, 0.85)';
            } else {
                ctx.fillStyle = this.type === 'cloud' ? 'rgba(0, 120, 212, 0.75)' : 'rgba(0, 210, 255, 0.85)';
                ctx.shadowBlur = this.radius > 2 ? 8 : 0;
                ctx.shadowColor = this.type === 'cloud' ? '#0078d4' : '#00d2ff';
            }
            
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    // Packet Class (Data flowing over virtual VPN/ExpressRoute circuits)
    class Packet {
        constructor(nodeA, nodeB) {
            this.from = nodeA;
            this.to = nodeB;
            this.progress = 0;
            this.speed = (0.005 + Math.random() * 0.008) * PACKET_SPEED;
        }

        update() {
            this.progress += this.speed;
        }

        draw() {
            if (this.progress > 1) return;
            const px = this.from.x + (this.to.x - this.from.x) * this.progress;
            const py = this.from.y + (this.to.y - this.from.y) * this.progress;

            const light = isLightMode();
            ctx.beginPath();
            ctx.arc(px, py, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = light ? '#0066b8' : '#00d2ff';
            if (!light) {
                ctx.shadowBlur = 6;
                ctx.shadowColor = '#00d2ff';
            }
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    // Initialize Nodes
    function init() {
        resize();
        nodes = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push(new Node());
        }
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        const light = isLightMode();

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MAX_DISTANCE) {
                    const alpha = (1 - dist / MAX_DISTANCE) * (light ? 0.18 : 0.22);
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = light ? `rgba(148, 163, 184, ${alpha})` : `rgba(30, 41, 59, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    // Randomly spawn data packets between connected links
                    if (Math.random() < 0.0008 && packets.length < 14) {
                        packets.push(new Packet(nodes[i], nodes[j]));
                    }
                }
            }
        }

        // Draw cursor connection web
        if (mouse.x !== null) {
            for (let i = 0; i < nodes.length; i++) {
                const dx = nodes[i].x - mouse.x;
                const dy = nodes[i].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_RADIUS) {
                    const alpha = (1 - dist / MOUSE_RADIUS) * (light ? 0.3 : 0.35);
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = light ? `rgba(0, 102, 184, ${alpha})` : `rgba(0, 210, 255, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        // Update and draw packets
        for (let i = packets.length - 1; i >= 0; i--) {
            packets[i].update();
            packets[i].draw();
            if (packets[i].progress >= 1) {
                packets.splice(i, 1);
            }
        }

        // Update and draw nodes
        nodes.forEach(node => {
            node.update();
            node.draw();
        });

        requestAnimationFrame(animate);
    }

    init();
    animate();
})();
