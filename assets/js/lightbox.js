(function () {
  var box = document.getElementById("lightbox");
  if (!box) return;
  var img = box.querySelector("img");
  var t = box.querySelector(".t");
  var d = box.querySelector(".d");
  var links = [];
  var i = 0;

  function show(n) {
    i = (n + links.length) % links.length;
    var a = links[i];
    img.src = a.href;
    img.alt = a.dataset.title || "";
    t.textContent = a.dataset.title || "";
    d.textContent = a.dataset.details || "";
  }
  function open(a) {
    links = Array.prototype.slice.call(a.closest(".grid").querySelectorAll("a"));
    show(links.indexOf(a));
    box.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function close() {
    box.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".piece a").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); open(a); });
  });
  box.querySelector(".lb-close").onclick = close;
  box.querySelector(".lb-prev").onclick = function () { show(i - 1); };
  box.querySelector(".lb-next").onclick = function () { show(i + 1); };
  box.addEventListener("click", function (e) { if (e.target === box || e.target.tagName === "FIGURE") close(); });
  document.addEventListener("keydown", function (e) {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(i - 1);
    if (e.key === "ArrowRight") show(i + 1);
  });

  var x0 = null;
  box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1));
    x0 = null;
  });
})();
