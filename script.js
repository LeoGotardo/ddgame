let gold = 0;
let totalGoldEarned = 0;
let clickPower = 1;
let passiveIncome = 0;
let diceBonus = 0;
let bonusEndTime = 0;
let rollCooldown = 0;
let totalClicks = 0;
let totalUpgrades = 0;
let criticalRolls = 0;

let settings = {
    particles: true,
    clickEffects: true,
    achievementNotifications: true,
    autosave: true,
    sounds: true
};

let customSounds = {
    click: null,
    upgrade: null,
    achievement: null
};

let achievements = [
    { 
        id: 'first_click', 
        icon: '👆',
        name: 'Primeiro Passo', 
        desc: 'Faça seu primeiro clique', 
        achieved: false, 
        check: () => totalClicks >= 1,
        progress: () => Math.min(totalClicks, 1),
        max: 1
    },
    { 
        id: 'clicks_100', 
        icon: '⚔️',
        name: 'Aventureiro', 
        desc: 'Faça 100 cliques', 
        achieved: false, 
        check: () => totalClicks >= 100,
        progress: () => Math.min(totalClicks, 100),
        max: 100
    },
    { 
        id: 'clicks_1000', 
        icon: '🗡️',
        name: 'Veterano', 
        desc: 'Faça 1000 cliques', 
        achieved: false, 
        check: () => totalClicks >= 1000,
        progress: () => Math.min(totalClicks, 1000),
        max: 1000
    },
    { 
        id: 'gold_1k', 
        icon: '💰',
        name: 'Rico', 
        desc: 'Acumule 1.000 XP', 
        achieved: false, 
        check: () => totalGoldEarned >= 1000,
        progress: () => Math.min(totalGoldEarned, 1000),
        max: 1000
    },
    { 
        id: 'gold_100k', 
        icon: '💎',
        name: 'Magnata', 
        desc: 'Acumule 100.000 XP', 
        achieved: false, 
        check: () => totalGoldEarned >= 100000,
        progress: () => Math.min(totalGoldEarned, 100000),
        max: 100000
    },
    { 
        id: 'gold_1m', 
        icon: '👑',
        name: 'Lendário', 
        desc: 'Acumule 1.000.000 XP', 
        achieved: false, 
        check: () => totalGoldEarned >= 1000000,
        progress: () => Math.min(totalGoldEarned, 1000000),
        max: 1000000
    },
    { 
        id: 'critical', 
        icon: '🎲',
        name: 'Sorte Crítica', 
        desc: 'Role um 20 no D20', 
        achieved: false, 
        check: () => criticalRolls >= 1,
        progress: () => Math.min(criticalRolls, 1),
        max: 1
    },
    { 
        id: 'critical_10', 
        icon: '🍀',
        name: 'Abençoado', 
        desc: 'Role 10 críticos no D20', 
        achieved: false, 
        check: () => criticalRolls >= 10,
        progress: () => Math.min(criticalRolls, 10),
        max: 10
    },
    { 
        id: 'upgrades_5', 
        icon: '🛒',
        name: 'Colecionador', 
        desc: 'Compre 5 upgrades', 
        achieved: false, 
        check: () => totalUpgrades >= 5,
        progress: () => Math.min(totalUpgrades, 5),
        max: 5
    },
    { 
        id: 'upgrades_50', 
        icon: '🏰',
        name: 'Construtor de Império', 
        desc: 'Compre 50 upgrades', 
        achieved: false, 
        check: () => totalUpgrades >= 50,
        progress: () => Math.min(totalUpgrades, 50),
        max: 50
    },
    { 
        id: 'passive_100', 
        icon: '⚡',
        name: 'Automação', 
        desc: 'Atinja 100 XP/s passivo', 
        achieved: false, 
        check: () => passiveIncome >= 100,
        progress: () => Math.min(passiveIncome, 100),
        max: 100
    },
    { 
        id: 'click_power_100', 
        icon: '💪',
        name: 'Força Suprema', 
        desc: 'Atinja 100 XP por clique', 
        achieved: false, 
        check: () => clickPower >= 100,
        progress: () => Math.min(clickPower, 100),
        max: 100
    }
];

const upgrades = [
    {
        id: 'sword',
        name: "Espada Curta",
        icon: "🗡️",
        description: "Uma espada básica para iniciantes",
        baseCost: 15,
        count: 0,
        clickBonus: 1,
        passiveBonus: 0,
        unlockAt: 0
    },
    {
        id: 'apprentice',
        name: "Aprendiz de Mago",
        icon: "🧙‍♂️",
        description: "Gera XP automaticamente enquanto você aventura",
        baseCost: 100,
        count: 0,
        clickBonus: 0,
        passiveBonus: 1,
        unlockAt: 50
    },
    {
        id: 'longsword',
        name: "Espada Longa",
        icon: "⚔️",
        description: "Uma arma mais poderosa para guerreiros experientes",
        baseCost: 500,
        count: 0,
        clickBonus: 5,
        passiveBonus: 0,
        unlockAt: 250
    },
    {
        id: 'archer',
        name: "Arqueiro Élfico",
        icon: "🏹",
        description: "Ataca inimigos à distância constantemente",
        baseCost: 1200,
        count: 0,
        clickBonus: 0,
        passiveBonus: 5,
        unlockAt: 800
    },
    {
        id: 'cleric',
        name: "Clérigo Devoto",
        icon: "⚕️",
        description: "Cura e abençoa a party continuamente",
        baseCost: 3000,
        count: 0,
        clickBonus: 0,
        passiveBonus: 12,
        unlockAt: 2000
    },
    {
        id: 'paladin',
        name: "Paladino Sagrado",
        icon: "🛡️",
        description: "Defende o grupo com poder divino",
        baseCost: 7500,
        count: 0,
        clickBonus: 0,
        passiveBonus: 30,
        unlockAt: 5000
    },
    {
        id: 'staff',
        name: "Cajado Místico",
        icon: "🔮",
        description: "Amplifica tremendamente seu poder mágico",
        baseCost: 15000,
        count: 0,
        clickBonus: 50,
        passiveBonus: 0,
        unlockAt: 10000
    },
    {
        id: 'wizard',
        name: "Arquimago Sábio",
        icon: "🧙",
        description: "Mestre das artes arcanas",
        baseCost: 30000,
        count: 0,
        clickBonus: 0,
        passiveBonus: 80,
        unlockAt: 20000
    },
    {
        id: 'dragon',
        name: "Dragão Ancestral",
        icon: "🐉",
        description: "Um dragão lendário empresta seu poder",
        baseCost: 75000,
        count: 0,
        clickBonus: 0,
        passiveBonus: 200,
        unlockAt: 50000
    },
    {
        id: 'artifact',
        name: "Artefato Lendário",
        icon: "👑",
        description: "Um item de poder incomensurável",
        baseCost: 150000,
        count: 0,
        clickBonus: 250,
        passiveBonus: 0,
        unlockAt: 100000
    },
    {
        id: 'lich',
        name: "Lich Ancestral",
        icon: "💀",
        description: "Um mago imortal que comanda legiões",
        baseCost: 300000,
        count: 0,
        clickBonus: 0,
        passiveBonus: 500,
        unlockAt: 200000
    },
    {
        id: 'deity',
        name: "Avatar Divino",
        icon: "✨",
        description: "O poder dos próprios deuses",
        baseCost: 1000000,
        count: 0,
        clickBonus: 1000,
        passiveBonus: 1000,
        unlockAt: 500000
    }
];

function createDefaultSounds() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playBeep(frequency, duration) {
        if (!settings.sounds) return;
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (e) {
            console.log('Erro ao tocar som:', e);
        }
    }
    
    return {
        playClick: () => playBeep(800, 0.1),
        playUpgrade: () => {
            playBeep(600, 0.15);
            setTimeout(() => playBeep(800, 0.15), 100);
        },
        playAchievement: () => {
            playBeep(600, 0.2);
            setTimeout(() => playBeep(800, 0.2), 150);
            setTimeout(() => playBeep(1000, 0.3), 300);
        }
    };
}

const defaultSounds = createDefaultSounds();

function playSound(type) {
    if (!settings.sounds) return;
    
    if (customSounds[type]) {
        customSounds[type].currentTime = 0;
        customSounds[type].play().catch(e => console.log('Erro ao tocar som:', e));
    } else {
        if (type === 'click') defaultSounds.playClick();
        else if (type === 'upgrade') defaultSounds.playUpgrade();
        else if (type === 'achievement') defaultSounds.playAchievement();
    }
}

function uploadSound(type) {
    const input = document.getElementById(type + 'SoundInput');
    const file = input.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const audio = new Audio(e.target.result);
            customSounds[type] = audio;
            updateSoundFileList();
            showAchievement('🎵 Som Personalizado', `Som de ${type === 'click' ? 'clique' : type === 'upgrade' ? 'upgrade' : 'conquista'} atualizado!`);
        };
        reader.readAsDataURL(file);
    }
}

function updateSoundFileList() {
    const list = document.getElementById('soundFileList');
    list.innerHTML = '';
    
    Object.keys(customSounds).forEach(type => {
        if (customSounds[type]) {
            const item = document.createElement('div');
            item.className = 'file-item';
            item.innerHTML = `
                <span class="file-item-name">🎵 ${type === 'click' ? 'Clique' : type === 'upgrade' ? 'Upgrade' : 'Conquista'}</span>
                <button class="file-item-remove" onclick="removeSound('${type}')">Remover</button>
            `;
            list.appendChild(item);
        }
    });
}

function removeSound(type) {
    customSounds[type] = null;
    updateSoundFileList();
}

function openAchievements() {
    document.getElementById('achievementsModal').classList.add('active');
    renderAchievements();
    updateAchievementBadge();
}

function closeAchievements() {
    document.getElementById('achievementsModal').classList.remove('active');
}

function renderAchievements() {
    const grid = document.getElementById('achievementGrid');
    grid.innerHTML = '';
    
    achievements.forEach(ach => {
        const card = document.createElement('div');
        card.className = `achievement-card ${ach.achieved ? 'achieved' : 'locked'}`;
        
        const progressPercent = (ach.progress() / ach.max * 100).toFixed(0);
        
        card.innerHTML = `
            <div class="achievement-icon">${ach.icon}</div>
            <div class="achievement-name">${ach.name}</div>
            <div class="achievement-desc">${ach.desc}</div>
            ${!ach.achieved ? `
                <div class="achievement-progress">
                    <div class="achievement-progress-bar" style="width: ${progressPercent}%">
                        ${progressPercent}%
                    </div>
                </div>
            ` : ''}
        `;
        
        grid.appendChild(card);
    });
}

function updateAchievementBadge() {
    const newAchievements = achievements.filter(a => !a.achieved && a.check()).length;
    const badge = document.getElementById('achievementBadge');
    if (newAchievements > 0) {
        badge.textContent = newAchievements;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

function checkAchievements() {
    achievements.forEach(ach => {
        if (!ach.achieved && ach.check()) {
            ach.achieved = true;
            playSound('achievement');
            if (settings.achievementNotifications) {
                showAchievement(ach.icon + ' ' + ach.name, ach.desc);
            }
            updateAchievementBadge();
        }
    });
}

function showAchievement(title, desc) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
        <div class="achievement-popup-header">
            <div class="achievement-popup-icon">${title.split(' ')[0]}</div>
            <div>
                <div class="achievement-title">${title.substring(title.indexOf(' ') + 1)}</div>
                <div class="achievement-desc">${desc}</div>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add('show'), 100);
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 500);
    }, 4000);
}

function openSettings() {
    document.getElementById('settingsModal').classList.add('active');
    updateSoundFileList();
}

function closeSettings() {
    document.getElementById('settingsModal').classList.remove('active');
}

function toggleParticles() {
    settings.particles = !settings.particles;
    document.getElementById('particlesToggle').classList.toggle('active');
    document.getElementById('particles').style.display = settings.particles ? 'block' : 'none';
}

function toggleClickEffects() {
    settings.clickEffects = !settings.clickEffects;
    document.getElementById('clickEffectsToggle').classList.toggle('active');
}

function toggleSounds() {
    settings.sounds = !settings.sounds;
    document.getElementById('soundsToggle').classList.toggle('active');
}

function toggleAchievementNotifications() {
    settings.achievementNotifications = !settings.achievementNotifications;
    document.getElementById('achievementsToggle').classList.toggle('active');
}

function toggleAutosave() {
    settings.autosave = !settings.autosave;
    document.getElementById('autosaveToggle').classList.toggle('active');
}

function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        container.appendChild(particle);
    }
}

function saveGame() {
    const saveData = {
        gold, totalGoldEarned, clickPower, passiveIncome, totalClicks, totalUpgrades, criticalRolls,
        upgrades: upgrades.map(u => ({ id: u.id, count: u.count })),
        achievements: achievements.map(a => ({ id: a.id, achieved: a.achieved })),
        settings
    };
    try {
        localStorage.setItem('dndClickerSave', JSON.stringify(saveData));
        showAchievement('💾 Jogo Salvo', 'Seu progresso foi salvo com sucesso!');
    } catch (e) {
        console.error('Erro ao salvar:', e);
    }
}

function loadGame() {
    try {
        const saveData = localStorage.getItem('dndClickerSave');
        if (saveData) {
            const data = JSON.parse(saveData);
            gold = data.gold || 0;
            totalGoldEarned = data.totalGoldEarned || 0;
            clickPower = data.clickPower || 1;
            passiveIncome = data.passiveIncome || 0;
            totalClicks = data.totalClicks || 0;
            totalUpgrades = data.totalUpgrades || 0;
            criticalRolls = data.criticalRolls || 0;
            
            if (data.upgrades) {
                data.upgrades.forEach(savedUpgrade => {
                    const upgrade = upgrades.find(u => u.id === savedUpgrade.id);
                    if (upgrade) upgrade.count = savedUpgrade.count;
                });
            }
            
            if (data.achievements) {
                data.achievements.forEach(savedAch => {
                    const ach = achievements.find(a => a.id === savedAch.id);
                    if (ach) ach.achieved = savedAch.achieved;
                });
            }
            
            if (data.settings) {
                Object.assign(settings, data.settings);
                updateSettingsUI();
            }
            
            updateDisplay();
            renderUpgrades();
            updateAchievementBadge();
            showAchievement('📂 Jogo Carregado', 'Seu progresso foi restaurado!');
        }
    } catch (e) {
        console.error('Erro ao carregar:', e);
    }
}

function updateSettingsUI() {
    document.getElementById('particlesToggle').classList.toggle('active', settings.particles);
    document.getElementById('clickEffectsToggle').classList.toggle('active', settings.clickEffects);
    document.getElementById('soundsToggle').classList.toggle('active', settings.sounds);
    document.getElementById('achievementsToggle').classList.toggle('active', settings.achievementNotifications);
    document.getElementById('autosaveToggle').classList.toggle('active', settings.autosave);
    document.getElementById('particles').style.display = settings.particles ? 'block' : 'none';
}

function resetGame() {
    if (confirm('Tem certeza que deseja resetar todo o progresso?')) {
        localStorage.removeItem('dndClickerSave');
        location.reload();
    }
}

function getCost(upgrade) {
    return Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.count));
}

function isUnlocked(upgrade) {
    return totalGoldEarned >= upgrade.unlockAt;
}

function formatNumber(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return Math.floor(num).toString();
}

function updateDisplay() {
    document.getElementById('goldDisplay').textContent = formatNumber(gold);
    document.getElementById('perClickDisplay').textContent = formatNumber(clickPower);
    document.getElementById('perSecondDisplay').textContent = passiveIncome.toFixed(1);
    document.getElementById('totalProduction').textContent = passiveIncome.toFixed(1);
}

function showClickEffect(value) {
    if (!settings.clickEffects) return;
    const button = document.getElementById('diceButton');
    const rect = button.getBoundingClientRect();
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.textContent = `+${formatNumber(value)}`;
    effect.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 100) + 'px';
    effect.style.top = (rect.top + rect.height / 2 + (Math.random() - 0.5) * 100) + 'px';
    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 1200);
}

function handleClick() {
    const totalPower = Math.floor(clickPower * (1 + diceBonus));
    gold += totalPower;
    totalGoldEarned += totalPower;
    totalClicks++;
    playSound('click');
    showClickEffect(totalPower);
    updateDisplay();
    renderUpgrades();
    checkAchievements();
}

function rollDice() {
    if (rollCooldown > 0) return;

    const button = document.getElementById('diceButton');
    button.classList.add('dice-rolling');
    
    setTimeout(() => {
        button.classList.remove('dice-rolling');
        const roll = Math.floor(Math.random() * 20) + 1;
        const resultDiv = document.getElementById('diceResult');
        
        let bonus = 0;
        let duration = 30000;
        let message = '';
        
        if (roll === 20) {
            bonus = 5;
            message = '🌟 CRÍTICO! +500% XP! 🌟';
            resultDiv.className = 'dice-result critical';
            criticalRolls++;
            playSound('achievement');
            checkAchievements();
        } else if (roll >= 16) {
            bonus = 1;
            message = '⚡ Excelente! +100% XP!';
            resultDiv.className = 'dice-result';
            playSound('upgrade');
        } else if (roll >= 11) {
            bonus = 0.5;
            message = '✨ Ótimo! +50% XP!';
            resultDiv.className = 'dice-result';
            playSound('upgrade');
        } else if (roll >= 6) {
            bonus = 0.25;
            message = '👍 Bom! +25% XP!';
            resultDiv.className = 'dice-result';
            playSound('click');
        } else {
            bonus = 0.1;
            message = '🎲 +10% XP';
            resultDiv.className = 'dice-result';
            playSound('click');
        }
        
        diceBonus = bonus;
        bonusEndTime = Date.now() + duration;
        resultDiv.textContent = roll;
        
        document.getElementById('rollInfo').innerHTML = `
            ${message}<br>
            Bônus ativo por 30 segundos!
        `;
        
        rollCooldown = 60;
        updateRollButton();
    }, 600);
}

function updateRollButton() {
    const button = document.getElementById('rollButton');
    if (rollCooldown > 0) {
        button.disabled = true;
        button.textContent = `Aguarde ${Math.ceil(rollCooldown)}s`;
    } else {
        button.disabled = false;
        button.textContent = 'Rolar D20';
    }
}

function buyUpgrade(upgrade) {
    const cost = getCost(upgrade);
    if (!isUnlocked(upgrade)) return;
    if (gold >= cost) {
        gold -= cost;
        upgrade.count++;
        totalUpgrades++;
        clickPower += upgrade.clickBonus;
        passiveIncome += upgrade.passiveBonus;
        playSound('upgrade');
        updateDisplay();
        renderUpgrades();
        checkAchievements();
    }
}

function renderUpgrades() {
    const container = document.getElementById('upgradesList');
    container.innerHTML = '';
    
    upgrades.forEach(upgrade => {
        const cost = getCost(upgrade);
        const unlocked = isUnlocked(upgrade);
        const affordable = gold >= cost && unlocked;
        
        const div = document.createElement('div');
        div.className = `upgrade-item ${unlocked ? 'unlocked' : 'locked'} ${affordable ? 'affordable' : ''}`;
        
        if (unlocked) {
            div.onclick = () => buyUpgrade(upgrade);
        }
        
        const totalClick = upgrade.clickBonus * upgrade.count;
        const totalPassive = upgrade.passiveBonus * upgrade.count;
        
        div.innerHTML = `
            <div class="upgrade-header">
                <div class="upgrade-icon">${upgrade.icon}</div>
                <div class="upgrade-info">
                    <div class="upgrade-name">${upgrade.name}</div>
                    <div class="upgrade-description">${upgrade.description}</div>
                    ${!unlocked ? `<div class="unlock-requirement">🔒 Desbloqueado com ${formatNumber(upgrade.unlockAt)} XP total</div>` : ''}
                </div>
            </div>
            <div class="upgrade-stats">
                <div class="upgrade-cost">💰 ${formatNumber(cost)} XP</div>
                <div class="upgrade-count">Quantidade: ${upgrade.count}</div>
            </div>
            ${unlocked && (totalClick > 0 || totalPassive > 0) ? `
                <div class="upgrade-production">
                    ${totalClick > 0 ? `⚔️ +${formatNumber(totalClick)} por clique` : ''}
                    ${totalPassive > 0 ? `⚡ +${formatNumber(totalPassive)} XP/s` : ''}
                </div>
            ` : ''}
        `;
        
        container.appendChild(div);
    });
}

let lastUpdate = Date.now();

function gameLoop() {
    const now = Date.now();
    const deltaTime = (now - lastUpdate) / 1000;
    lastUpdate = now;
    
    if (passiveIncome > 0) {
        const earned = passiveIncome * deltaTime;
        gold += earned;
        totalGoldEarned += earned;
    }
    
    if (bonusEndTime > 0 && now >= bonusEndTime) {
        diceBonus = 0;
        bonusEndTime = 0;
        document.getElementById('diceResult').textContent = '?';
        document.getElementById('rollInfo').innerHTML = `
            Role para ganhar bônus temporário!<br>
            1-5: +10% | 6-10: +25% | 11-15: +50%<br>
            16-19: +100% | 20: <span style="color: #ffd700;">⭐ CRÍTICO +500% ⭐</span>
        `;
    }
    
    if (rollCooldown > 0) {
        rollCooldown = Math.max(0, rollCooldown - deltaTime);
        updateRollButton();
    }
    
    updateDisplay();
    checkAchievements();
    
    requestAnimationFrame(gameLoop);
}

setInterval(() => {
    if (settings.autosave) {
        saveGame();
    }
}, 60000);

document.getElementById('diceButton').addEventListener('click', handleClick);
document.getElementById('rollButton').addEventListener('click', rollDice);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSettings();
        closeAchievements();
    }
});

createParticles();
renderUpgrades();
renderAchievements();
updateDisplay();
loadGame();
gameLoop();

document.getElementById('diceButton').addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

console.log('🎲 D&D Adventure Clicker iniciado!');
console.log('⚔️ Boa aventura, herói!');