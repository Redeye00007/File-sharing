const fileInput = document.getElementById("fileInput");
const fileCount = document.getElementById("fileCount");
const form = document.getElementById("uploadForm");
const uploadBtn = document.getElementById("uploadBtn");

if (fileInput) {
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length === 0) fileCount.textContent = "No file chosen";
    else if (fileInput.files.length === 1) fileCount.textContent = fileInput.files[0].name;
    else fileCount.textContent = `${fileInput.files.length} files selected`;
  });
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData();
  for (const f of fileInput.files) fd.append("files", f);

  uploadBtn.disabled = true;
  uploadBtn.textContent = "Uploading...";

  const res = await fetch("/upload", { method: "POST", body: fd });
  const data = await res.json();

  uploadBtn.disabled = false;
  uploadBtn.textContent = "Upload";

  if (data.ok) location.reload();
  else alert(data.error || "Upload failed");
});

document.querySelectorAll(".delete").forEach(btn=>{
  btn.addEventListener("click", async ()=>{
    if(!confirm(`Delete ${btn.dataset.name}?`)) return;
    const fd = new FormData(); fd.append("name", btn.dataset.name);
    const res = await fetch("/delete", {method:"POST", body:fd});
    const data = await res.json();
    if(data.ok) location.reload(); else alert("Delete failed");
  })
});
