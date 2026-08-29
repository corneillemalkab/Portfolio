/**
 * ============================================================================
 * Corneille Engineer · Portfolio Logic & Interactivity (main.js)
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

    // 3. Interactive Architecture Data & Switcher
    const archData = {
        aethernet: {
            title: "Project AetherNet: Azure Hybrid Zero-Trust Mesh",
            problem: "Challenge: Hybrid enterprises struggle with lateral movement vulnerabilities, complex hybrid routing failovers, and asymmetric packet drops when routing through central firewalls.",
            solution: "Engineered a production-grade multi-region Hub-and-Spoke topology with Azure Firewall Premium IDPS. All spoke egress is strictly forced through UDRs, while on-premises Hyper-V datacenters communicate via redundant BGP-routed IPsec S2S tunnels with automated failover.",
            metrics: [
                { label: "Public IPs on Data Tier", value: "0 (100% Private Link)" },
                { label: "Firewall IDPS Mode", value: "Alert & Deny Strict" },
                { label: "Dynamic Failover Time", value: "< 2.8 Seconds" }
            ]
        },
        dns: {
            title: "Split-Horizon Private Link DNS Resolver Engine",
            problem: "Challenge: On-premises clients cannot resolve Azure Private Endpoints (*.privatelink.blob.core.windows.net) without creating DNS loops or deploying high-maintenance custom VM forwarders.",
            solution: "Deployed Azure Private DNS Resolver with Inbound & Outbound endpoints linked to Windows Server 2022 Active Directory DNS conditional forwarders, establishing continuous bi-directional resolution.",
            metrics: [
                { label: "Average DNS Query Latency", value: "2.1 ms" },
                { label: "VM Forwarders Required", value: "0 (Native PaaS)" },
                { label: "Resolution Reliability", value: "99.999% SLA" }
            ]
        },
        bgp: {
            title: "Windows RRAS & Azure VPN Gateway BGP Mesh",
            problem: "Challenge: Static routes in hybrid cloud fail during network maintenance and WAN brownouts, causing extended downtime.",
            solution: "Configured Windows Server RRAS on Hyper-V (ASN 65010) with dynamic BGP route peering to Azure Virtual Network Gateway (ASN 65515). Routes automatically converge and redistribute across physical and cloud interfaces.",
            metrics: [
                { label: "Dynamic Routes Exchanged", value: "24 Prefixes" },
                { label: "Failover Type", value: "Dual-Tunnel Active/Active" },
                { label: "Manual Route Interventions", value: "0" }
            ]
        },
        finops: {
            title: "Automated FinOps Network Drift & Compliance Engine",
            problem: "Challenge: Stale Route Tables, unassociated Public IPs, and idle VPN gateways quietly inflate cloud infrastructure costs without triggering security alarms.",
            solution: "Created custom PowerShell automation integrated into GitHub Actions CI/CD that scans Azure subscriptions for orphaned networking artifacts, unattached NICs, and over-permissive NSG rules.",
            metrics: [
                { label: "Orphaned PIP Cost Saved", value: "100% Detected" },
                { label: "NSG Compliance Coverage", value: "Continuous GitOps" },
                { label: "Execution Time", value: "< 45 Seconds" }
            ]
        }
    };

    const archTabs = document.querySelectorAll('.arch-tab');
    const archContent = document.getElementById('archContent');

    function renderArch(key) {
        const item = archData[key];
        if (!item || !archContent) return;

        archContent.innerHTML = `
            <div class="arch-card-body">
                <h3>${item.title}</h3>
                <div class="arch-problem-box">
                    <strong>${item.problem}</strong>
                </div>
                <p class="arch-solution-text">${item.solution}</p>
                <div class="arch-metrics-grid">
                    ${item.metrics.map(m => `
                        <div class="arch-metric">
                            <span class="metric-title">${m.label}</span>
                            <p class="metric-val">${m.value}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Default Architecture Render
    renderArch('aethernet');

    archTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            archTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const key = tab.getAttribute('data-arch');
            renderArch(key);
        });
    });

    // 4. Interactive Terminal CLI
    const cliInput = document.getElementById('cliInput');
    const terminalBody = document.getElementById('terminalBody');

    if (cliInput && terminalBody) {
        cliInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = cliInput.value.trim().toLowerCase();
                cliInput.value = '';
                if (!cmd) return;

                // Echo command
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
                        • <span class="t-cyan">skills</span> - View verified competencies<br>
                        • <span class="t-cyan">certifications</span> - View active credentials<br>
                        • <span class="t-cyan">dns</span> - Query Private Link DNS resolution<br>
                        • <span class="t-cyan">ping</span> - Test hybrid link latency to Azure Hub<br>
                        • <span class="t-cyan">routes</span> - Display dynamic BGP route table<br>
                        • <span class="t-cyan">clear</span> - Clear the terminal output`;
                        break;
                    case 'skills':
                        response.innerHTML = `<span class="t-green">Cloud:</span> Azure VNets, Azure Firewall Premium, Private Link, DNS Resolver, ExpressRoute<br>
                        <span class="t-green">Networking:</span> BGP, OSPF, VLANs, Subnetting, IPsec IKEv2, Wireshark, NAT/ACL<br>
                        <span class="t-green">Systems:</span> Windows Server 2022 (AD, DNS, RRAS), Hyper-V Virtual Switch, PowerShell 7`;
                        break;
                    case 'certifications':
                        response.innerHTML = `<span class="t-green">✔ Microsoft Certified: Azure Network Engineer Associate (AZ-700)</span><br>
                        <span class="t-cyan">✔ CCNA-Level Core Routing & Switching (Enterprise Proficiency)</span>`;
                        break;
                    case 'dns':
                        response.innerHTML = `Resolving: corp-db.privatelink.database.windows.net<br>
                        Server: 10.100.2.4 (Azure Private DNS Resolver Inbound)<br>
                        Address: 10.102.0.12 (PaaS Private Endpoint)<br>
                        <span class="t-green">Status: Success (Latency: 2.1ms · 0 Public IP Exposure)</span>`;
                        break;
                    case 'ping':
                        response.innerHTML = `Pinging Azure Firewall Hub (10.100.1.4) from Hyper-V Datacenter (10.0.10.10):<br>
                        Reply from 10.100.1.4: bytes=32 time=11ms TTL=126<br>
                        Reply from 10.100.1.4: bytes=32 time=12ms TTL=126<br>
                        <span class="t-green">Packets: Sent = 2, Received = 2, Lost = 0 (0% loss)</span>`;
                        break;
                    case 'routes':
                        response.innerHTML = `BGP Route Table (Peer: 10.100.0.254 - Azure ASN 65515):<br>
                        *&gt; 10.101.0.0/16 via 10.100.0.254 (App Spoke VNet)<br>
                        *&gt; 10.102.0.0/16 via 10.100.0.254 (Data Spoke VNet)<br>
                        <span class="t-green">State: Established · BGP Convergence Stable</span>`;
                        break;
                    case 'clear':
                        terminalBody.innerHTML = '';
                        return;
                    default:
                        response.innerHTML = `<span style="color:#ef4444">Command '${cmd}' not recognized. Type 'help' for command list.</span>`;
                }

                terminalBody.appendChild(response);
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }
});
