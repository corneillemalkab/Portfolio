/**
 * ============================================================================
 * Corneille Malonga · Portfolio Logic & Interactivity (main.js)
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
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

    // 2. Animated Number Counters
    const counters = document.querySelectorAll('.highlight-number[data-target]');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const speed = 20;
                const updateCount = () => {
                    const inc = target / speed;
                    if (count < target) {
                        count += inc;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 40);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

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
                        • <span class="t-cyan">experience</span> - View 6-year career timeline (ISP → On-Prem/Identity → Azure)<br>
                        • <span class="t-cyan">skills</span> - List verified cloud, networking & systems competencies<br>
                        • <span class="t-cyan">certifications</span> - Display active credentials (AZ-700)<br>
                        • <span class="t-cyan">dns</span> - Query Private Link DNS resolution lifecycle<br>
                        • <span class="t-cyan">ping</span> - Test hybrid link latency between on-prem Hyper-V and Azure Hub<br>
                        • <span class="t-cyan">contact</span> - Display email and verified LinkedIn/GitHub links<br>
                        • <span class="t-cyan">clear</span> - Clear terminal window`;
                        break;

                    case 'experience':
                        response.innerHTML = `<span class="t-green">2024 — Present:</span> Senior Azure Cloud & Hybrid Network Engineer (VNets, Firewall, S2S VPN, ExpressRoute, Hyper-V, Entra ID)<br>
                        <span class="t-green">2021 — 2024:</span> On-Premises Network, Windows Identity & Governance Engineer (Wired/Wireless, 802.1X, AD DS, DNS/DHCP, GPO, WFAS)<br>
                        <span class="t-green">Early Career:</span> Junior Network Engineer @ Internet Service Provider (BGP/OSPF, Edge Routers, IPAM, NOC)`;
                        break;

                    case 'skills':
                        response.innerHTML = `<span class="t-green">Azure Cloud (AZ-700):</span> VNets, Azure Firewall Premium, Private DNS Resolver, Private Endpoints, ExpressRoute, S2S VPN, AppGW WAF v2, Compute, Storage, Entra ID<br>
                        <span class="t-green">On-Premises Networking:</span> BGP, OSPF, VLANs, 802.1Q, STP, 802.1X, RADIUS (NPS), IPsec IKEv2, Wireshark, Subnetting/VLSM<br>
                        <span class="t-green">Systems & Virtualization:</span> Windows Server 2016-2022, Active Directory, DNS/DHCP, Hyper-V Virtual Switch, NIC Teaming, RRAS, PowerShell`;
                        break;

                    case 'certifications':
                        response.innerHTML = `<span class="t-green">✔ Microsoft Certified: Azure Network Engineer Associate (AZ-700)</span><br>
                        <span class="t-cyan">✔ Enterprise On-Premises & Windows Networking (6+ Years Production Track Record)</span>`;
                        break;

                    case 'dns':
                        response.innerHTML = `Query: corp-sql.privatelink.database.windows.net<br>
                        Resolver: 10.100.2.4 (Azure Private DNS Resolver Inbound Endpoint)<br>
                        Target IP: 10.102.1.18 (PaaS Private Endpoint)<br>
                        <span class="t-green">Status: Success (Latency: 2.1ms · 0 Public IP Exposure)</span>`;
                        break;

                    case 'ping':
                        response.innerHTML = `Pinging Azure Hub Firewall (10.100.1.4) from Hyper-V Datacenter (10.0.10.10):<br>
                        Reply from 10.100.1.4: bytes=32 time=11ms TTL=126<br>
                        Reply from 10.100.1.4: bytes=32 time=12ms TTL=126<br>
                        <span class="t-green">Ping statistics: 2 packets transmitted, 0% packet loss</span>`;
                        break;

                    case 'contact':
                        response.innerHTML = `Email: <span class="t-green">cmalonga.work@gmail.com</span><br>
                        GitHub: <span class="t-cyan">https://github.com/cmalonga</span><br>
                        LinkedIn: <span class="t-cyan">https://linkedin.com/in/corneille-malonga</span>`;
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
