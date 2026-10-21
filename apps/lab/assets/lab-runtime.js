import { firebaseConfig, API_BASE, FILES_BASE } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth(initializeApp(firebaseConfig));
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
const $ = (id) => document.getElementById(id);
let currentUser = null;
let conversationId = null;
let messages = [];
let busy = false;

function toast(message) {
  const node = $("toast");
  if (!node) return;
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(window.__vossFitRuntimeToast);
  window.__vossFitRuntimeToast = setTimeout(() => node.classList.remove("show"), 3200);
}
function setStatus(message, ok) {
  const node = $("apiStatus");
  if (node) { node.textContent = message; node.style.color = ok ? "var(--mint)" : "var(--orange)"; }
  const providerNode = $("providerStatus");
  if (providerNode) { providerNode.textContent = message; providerNode.style.color = ok ? "var(--mint)" : "var(--orange)"; }
}
function addMessage(role, text, pending = false) {
  const log = $("chatLog");
  const row = document.createElement("div");
  row.className = role === "user" ? "msg user" : "msg";
  const icon = document.createElement("div");
  icon.className = "msg-icon";
  icon.textContent = role === "user" ? "V" : "✳";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  const label = document.createElement("small");
  label.textContent = role === "user" ? "Du" : "VoßBot";
  bubble.appendChild(label);
  const content = document.createElement("span");
  content.textContent = pending ? "Denke nach …" : String(text ?? "");
  bubble.appendChild(content);
  row.append(icon, bubble);
  log.appendChild(row);
  log.scrollTop = log.scrollHeight;
  return { row, bubble, content };
}
function renderHistory() {
  const log = $("chatLog");
  log.innerHTML = "";
  if (!messages.length) {
    addMessage("assistant", "Ich bin bereit. Melde dich an, damit ich Gemini sicher über die Sandbox-API nutzen und Verläufe speichern kann.");
    return;
  }
  for (const item of messages) addMessage(item.role === "assistant" ? "assistant" : "user", item.text || "");
}
async function token() {
  if (!currentUser) throw new Error("Bitte zuerst mit Google anmelden.");
  return currentUser.getIdToken();
}
async function requestJson(base, path, options = {}) {
  const idToken = await token();
  const response = await fetch(base + path, {
    ...options,
    headers: { ...(options.headers || {}), Authorization: "Bearer " + idToken }
  });
  if (response.status === 204) return null;
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || data.error || ("HTTP " + response.status));
  return data;
}
async function checkConnection() {
  try {
    const [filesHealth, apiOptions] = await Promise.all([
      fetch(FILES_BASE + "/health", { cache: "no-store" }),
      fetch(API_BASE, { method: "OPTIONS", headers: { "Access-Control-Request-Method": "POST", "Access-Control-Request-Headers": "authorization,content-type" } })
    ]);
    const ok = filesHealth.ok && apiOptions.ok;
    setStatus(ok ? "Sandbox API verbunden" : "API prüfen", ok);
  } catch { setStatus("API nicht erreichbar", false); }
}
function renderFiles(files) {
  const host = $("filesList");
  if (!host) return;
  host.innerHTML = "";
  if (!files.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "Noch keine Dateien gespeichert.";
    host.appendChild(empty);
  }
  for (const file of files) {
    const row = document.createElement("div");
    row.className = "task";
    const icon = document.createElement("div");
    icon.className = "activity-icon";
    icon.textContent = "▤";
    const body = document.createElement("div");
    body.className = "task-body";
    const name = document.createElement("div");
    name.className = "task-title";
    name.textContent = file.name || file.id;
    const meta = document.createElement("div");
    meta.className = "task-desc";
    meta.textContent = (file.type || "Datei") + " · " + (Number(file.size || 0) / 1024).toFixed(1) + " KB";
    body.append(name, meta);
    const actions = document.createElement("div");
    actions.className = "task-meta";
    const download = document.createElement("button");
    download.className = "button small";
    download.textContent = "Download";
    download.dataset.downloadId = file.id;
    const remove = document.createElement("button");
    remove.className = "button small ghost";
    remove.textContent = "Löschen";
    remove.dataset.deleteId = file.id;
    actions.append(download, remove);
    row.append(icon, body, actions);
    host.appendChild(row);
  }
  if ($("statFiles")) $("statFiles").textContent = String(files.length).padStart(2, "0");
}
async function loadFiles() {
  if (!currentUser) return;
  const result = await requestJson(FILES_BASE, "/files");
  renderFiles(result.files || []);
}
async function saveConversation() {
  if (!currentUser || !messages.length) return;
  messages = messages.slice(-80);
  const result = await requestJson(FILES_BASE, "/conversations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: conversationId, messages })
  });
  if (result?.id) conversationId = result.id;
}
async function loadConversation() {
  if (!currentUser) return;
  const listed = await requestJson(FILES_BASE, "/conversations");
  const conversations = (listed.conversations || []).sort((a, b) => new Date(b.updated || 0) - new Date(a.updated || 0));
  if (!conversations.length) {
    conversationId = crypto.randomUUID();
    messages = [];
    renderHistory();
    return;
  }
  conversationId = conversations[0].id;
  const saved = await requestJson(FILES_BASE, "/conversations/" + encodeURIComponent(conversationId));
  messages = Array.isArray(saved?.messages) ? saved.messages.slice(-80) : [];
  renderHistory();
}
async function sendMessage(text) {
  if (!currentUser) { toast("Bitte zuerst mit Google anmelden."); $("loginBtn")?.focus(); return; }
  if (busy) return;
  busy = true;
  const priorMessages = messages.slice(-12);
  addMessage("user", text);
  const pending = addMessage("assistant", "", true);
  $("chatInput").value = "";
  try {
    const result = await requestJson(API_BASE, "/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        v: 2,
        message: text,
        history: priorMessages,
        system: "Du bist VoßBot im VoßFit Sandbox Lab. Antworte auf Deutsch, strukturiert und praktisch. Behaupte nicht, Dateien, Websites oder Systeme verändert zu haben, wenn dies nicht tatsächlich erfolgt ist.",
        context: "VoßFit Sandbox Lab"
      })
    });
    const answer = result.text || "Gemini hat keine Textantwort geliefert.";
    pending.content.textContent = answer;
    messages.push({ role: "user", text }, { role: "assistant", text: answer });
    await saveConversation();
  } catch (error) {
    pending.content.textContent = "Fehler: " + (error?.message || "Anfrage fehlgeschlagen.");
    toast("VoßBot-Anfrage fehlgeschlagen.");
  } finally {
    busy = false;
    $("chatLog").scrollTop = $("chatLog").scrollHeight;
  }
}
async function uploadFiles(fileList) {
  if (!currentUser) { toast("Bitte zuerst mit Google anmelden."); return; }
  const files = Array.from(fileList || []);
  if (!files.length) return;
  for (const file of files) {
    if (file.size > 25 * 1024 * 1024) { toast(file.name + " ist größer als 25 MB."); continue; }
    try {
      await requestJson(FILES_BASE, "/upload", {
        method: "POST",
        headers: { "Content-Type": file.type || "application/octet-stream", "X-File-Name": encodeURIComponent(file.name) },
        body: file
      });
    } catch (error) { toast(file.name + ": " + (error?.message || "Upload fehlgeschlagen")); }
  }
  await loadFiles();
  toast("Upload abgeschlossen.");
}
async function downloadFile(id) {
  const idToken = await token();
  const response = await fetch(FILES_BASE + "/files/" + encodeURIComponent(id), { headers: { Authorization: "Bearer " + idToken } });
  if (!response.ok) throw new Error("Download fehlgeschlagen (" + response.status + ")");
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = id;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
async function deleteFile(id) {
  await requestJson(FILES_BASE, "/files/" + encodeURIComponent(id), { method: "DELETE" });
  await loadFiles();
  toast("Datei gelöscht.");
}
$("loginBtn")?.addEventListener("click", async () => {
  try {
    if (currentUser) await signOut(auth);
    else await signInWithPopup(auth, provider);
  } catch (error) {
    if (error?.code === "auth/popup-blocked" || error?.code === "auth/operation-not-supported-in-this-environment") {
      await signInWithRedirect(auth, provider);
      return;
    }
    toast("Google-Login: " + (error?.message || "fehlgeschlagen"));
  }
});
document.addEventListener("submit", (event) => {
  if (event.target?.id !== "chatForm") return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const text = $("chatInput")?.value.trim();
  if (text) void sendMessage(text);
}, true);
document.addEventListener("change", (event) => {
  if (event.target?.id !== "filesInput") return;
  event.stopImmediatePropagation();
  void uploadFiles(event.target.files).finally(() => { event.target.value = ""; });
}, true);
document.addEventListener("click", (event) => {
  const download = event.target.closest("[data-download-id]");
  const remove = event.target.closest("[data-delete-id]");
  if (download) {
    event.preventDefault();
    void downloadFile(download.dataset.downloadId).catch(error => toast(error.message));
  } else if (remove) {
    event.preventDefault();
    void deleteFile(remove.dataset.deleteId).catch(error => toast(error.message));
  }
}, true);
onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  const state = $("authState");
  const button = $("loginBtn");
  const name = $("profileName");
  const email = $("profileEmail");
  const avatar = $("profileAvatar");
  if (state) state.textContent = user ? "Angemeldet" : "Nicht angemeldet";
  if (button) button.textContent = user ? "Abmelden" : "Mit Google anmelden";
  if (name) name.textContent = user?.displayName || (user ? "VoßFit Owner" : "Sandbox");
  if (email) email.textContent = user?.email || "Google Login erforderlich";
  if (avatar) avatar.textContent = (user?.displayName || user?.email || "V").slice(0, 1).toUpperCase();
  if (!user) {
    messages = [];
    conversationId = null;
    renderHistory();
    return;
  }
  try {
    await Promise.all([loadFiles(), loadConversation()]);
    toast("Sandbox angemeldet.");
  } catch (error) { toast("Daten konnten nicht geladen werden: " + (error?.message || "Fehler")); }
});
void checkConnection();
