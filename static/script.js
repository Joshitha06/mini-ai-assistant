const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => { if (e.key === "Enter") sendMessage(); });

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    userInput.value = "";
    addMessage("AI is typing...", "bot", true); // placeholder

    try {
        const res = await fetch("/chat", {                        // relative URL -> same host
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });
        const data = await res.json();

        // remove last "AI is typing..." placeholder
        removeTypingPlaceholder();

        addMessage(data.reply || "No reply received.", "bot");
    } catch (err) {
        removeTypingPlaceholder();
        addMessage("Error: could not reach server.", "bot");
        console.error(err);
    }
}

function addMessage(text, who, isPlaceholder = false) {
    const div = document.createElement("div");
    div.className = who;
    div.innerText = text;
    if (isPlaceholder) div.dataset.placeholder = "true";
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingPlaceholder() {
    const placeholders = chatBox.querySelectorAll('[data-placeholder="true"]');
    placeholders.forEach(p => p.remove());
}
