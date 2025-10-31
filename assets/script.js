// ======= Gemini API integration =======
const API_KEY = "AQ.Ab8RN6IIQCE6z6hEmzGFmsZGbuGUIq7TZCmKK08IuCoKdjofgg"; // ganti dengan API milikmu
const chatContainer = document.getElementById("chat-container");
const sendBtn = document.getElementById("sendBtn");

if (sendBtn) {
  sendBtn.onclick = async () => {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    input.value = "";

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text }] }] }),
      }
    );
    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, tidak ada respons.";
    addMessage("ai", reply);
  };
}

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `msg ${sender}`;
  div.textContent = text;
  chatContainer.appendChild(div);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
