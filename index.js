// Footer
const path = (window.location.pathname.split("/").at(-2) === "builderment-builds") ? "./pages/versions/index.html" : "../versions/index.html";
const file = await fetch(path);
const text = await file.text();
const d = document.createElement("div");
d.innerHTML = `<footer>
<p>For any inquiries, ask on <a href="https://discord.gg/U8SgSsRFKM" target="_blank">The Builderment Vault</a> discord server :D</p>
<p><a href="${path}">${new DOMParser().parseFromString(text, 'text/html').getElementsByTagName("h2").item(0).innerHTML}</a></p>
</footer>`;
document.body.appendChild(d.firstChild);

// Removes file name from path
if (!new URLSearchParams(window.location.search).get("build")) history.replaceState(null, null, "./");
