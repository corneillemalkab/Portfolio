/**
 * ============================================================================
 * Corneille Malonga · Portfolio Logic & Interactivity (main.js)
 * Aligned 100% with CV & LinkedIn Profile
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Light / Dark Mode Toggle with LocalStorage Persistence
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'light') {
            themeIcon.className = 'fa-solid fa-sun text-orange';
        } else {
            themeIcon.className = 'fa-solid fa-moon text-azure';
        }
    }

    // 2. Mobile Navigation Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 3. Interactive Terminal CLI
    const cliInput = document.getElementById('cliInput');
    const terminalBody = document.getElementById('terminalBody');

    if (cliInput && terminalBody) {
        cliInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = cliInput.value.trim().toLowerCase();
                cliInput.value = '';
                if (!cmd) return;

                // Echo user command
                const cmdLine = document.createElement('div');
                cmdLine.className = 'term-line';
                cmdLine.innerHTML = `<span class="t-prompt">PS C:\\&gt;</span> <span class="t-cmd">${cmd}</span>`;
                terminalBody.appendChild(cmdLine);

                // Command processing
                const response = document.createElement('div');
                response.className = 't-output';

                switch (cmd) {
                    case 'help':
                        response.innerHTML = `Available commands:<br>
                        • <span class="t-cyan">experience</span> - View career history (LTM, HCLTech, Microcom)<br>
                        • <span class="t-cyan">skills</span> - List diagnostic tools, cloud, routing &amp; security skills<br>
                        • <span class="t-cyan">certifications</span> - Display Microsoft AZ-700 &amp; Cisco credentials<br>
                        • <span class="t-cyan">education</span> - Display BSc in Computer Science details<br>
                        • <span class="t-cyan">project</span> - View Project AetherNet architecture &amp; endpoint map<br>
                        • <span class="t-cyan">contact</span> - Display email, phone &amp; verified LinkedIn/GitHub links<br>
                        • <span class="t-cyan">clear</span> - Clear terminal window`;
                        break;

                    case 'experience':
                        response.innerHTML = `<span class="t-green">Mar 2025 — Present:</span> Cloud &amp; Infrastructure Engineer (Azure &amp; Windows Net) @ LTM, Krakow<br>
                        <span class="t-green">Mar 2024 — Feb 2025:</span> Cloud &amp; Infrastructure Engineer (Azure Net) @ LTM, Krakow<br>
                        <span class="t-green">Aug 2021 — Feb 2024:</span> Senior IT Analyst @ HCLTech, Krakow (99.95% uptime, 1000+ users)<br>
                        <span class="t-green">Feb 2017 — Jul 2018:</span> Junior Network Engineer @ Microcom S.A.R.L., DR Congo (OSPF, VLANs, STP)`;
                        break;

                    case 'skills':
                        response.innerHTML = `<span class="t-green">Diagnostics:</span> Azure Network Watcher, KQL, Grafana, Wireshark, tcpdump, Packet Capture<br>
                        <span class="t-green">Cloud &amp; Hybrid:</span> Azure, ExpressRoute, Virtual WAN, VPN Gateway, Azure Firewall, Check Point NVAs<br>
                        <span class="t-green">Routing &amp; Switching:</span> BGP, OSPF, EIGRP, VLANs, VXLAN, STP, NAT, ACLs, QoS, DNS, DHCP<br>
                        <span class="t-green">Identity &amp; Security:</span> Cisco ISE, RADIUS, 802.1X, Entra ID, RBAC, Conditional Access, NSGs`;
                        break;

                    case 'certifications':
                        response.innerHTML = `<span class="t-green">✔ Microsoft Certified: Azure Network Engineer Associate (AZ-700)</span><br>
                        <span class="t-cyan">✔ Cisco: Network Support &amp; Security</span><br>
                        <span class="t-cyan">✔ Cisco: Network Devices &amp; Configuration</span>`;
                        break;

                    case 'education':
                        response.innerHTML = `<span class="t-green">BSc in Computer Science</span><br>
                        Vistula University of Finance and Business · Warsaw, Poland (Sep 2019 — Mar 2023)`;
                        break;

                    case 'project':
                    case 'aethernet':
                        response.innerHTML = `<span class="t-green">Project:</span> Project AetherNet (Azure Hybrid Zero-Trust Mesh)<br>
                        <span class="t-green">On-Premises:</span> Hyper-V Host · Windows RRAS Router (ASN 65010) · AD DS/DNS (10.0.10.10)<br>
                        <span class="t-green">Transit:</span> Dual IPsec IKEv2 S2S VPN with BGP Dynamic Peering (ASN 65515 · &lt; 2.8s convergence)<br>
                        <span class="t-green">Azure Hub (10.100.0.0/16):</span> Azure Firewall Premium (10.100.1.4 IDPS) · Private DNS Resolver (10.100.2.4)<br>
                        <span class="t-green">Spokes (10.101 &amp; 10.102):</span> App VMSS (10.101.1.0/24) · Data Private Endpoints (10.102.1.0/24 · 0 Public IPs)`;
                        break;

                    case 'contact':
                        response.innerHTML = `Location: <span class="t-green">Krakow, Poland</span><br>
                        Phone: <span class="t-green">+48 579 227 833</span><br>
                        Email: <span class="t-green">cmalonga.work@gmail.com</span><br>
                        LinkedIn: <span class="t-cyan">https://linkedin.com/in/corneille-malonga/</span><br>
                        GitHub: <span class="t-cyan">https://github.com/cmalonga</span>`;
                        break;

                    case 'clear':
                        terminalBody.innerHTML = '';
                        return;

                    default:
                        response.innerHTML = `<span style="color:#ef4444">Command '${cmd}' not recognized. Type 'help' for available commands.</span>`;
                }

                terminalBody.appendChild(response);
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }
});
