let nextAllowedTime = 0;
let smokedToday = 0;

const timerEl = document.getElementById("timer");
const countEl = document.getElementById("count");

document.getElementById("enableNotifications").onclick = async () => {
    const permission = await Notification.requestPermission();
    alert(permission === "granted" ? "Уведомления включены" : "Разреши уведомления в настройках");
};

document.getElementById("smokedButton").onclick = () => {
    const now = Date.now();
    const interval = Number(document.getElementById("interval").value) * 60000;
    const limit = Number(document.getElementById("dailyLimit").value);

    if (smokedToday >= limit) {
        alert("Лимит на сегодня достигнут");
        return;
    }

    if (now < nextAllowedTime) {
        alert("Рано. Жди уведомления.");
        return;
    }

    smokedToday++;
    countEl.innerText = smokedToday;

    nextAllowedTime = now + interval;
    notify("Можно будет через " + Math.floor(interval / 60000) + " минут");
};

function notify(text) {
    if (Notification.permission === "granted") {
        new Notification(text);
    }
}

setInterval(() => {
    const now = Date.now();
    if (now >= nextAllowedTime) {
        timerEl.innerText = "Можно";
        return;
    }

    const diff = nextAllowedTime - now;
    const m = Math.floor(diff / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    timerEl.innerText = `${m}:${s.toString().padStart(2, "0")}`;
}, 500);