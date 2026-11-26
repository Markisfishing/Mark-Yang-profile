// 背景節點網絡：呼應知識圖譜與 R-GCN，在整頁背景畫緩慢漂動的節點，距離近的兩點之間連線。
// 顏色取 design-tokens.css 的 --color-accent，切換深淺色時跟著換；整層透明度由 CSS 的 --network-opacity 控制
// 效能：節點數依畫面面積計算並設上限；分頁不在前景時 requestAnimationFrame 會自動暫停；
//       系統開了「減少動態效果」就只畫一張靜止的圖
const MAX_NODES = 70;          // 上限，連線計算是節點數的平方，70 個約 2,400 組
const AREA_PER_NODE = 18000;   // 每 18,000 px²（約 134×134）放一個節點，手機自然變少
const LINK_DISTANCE = 140;     // 兩點距離小於這個才連線，越近線越清楚
const SPEED = 0.15;            // 每格移動的像素，60fps 下一秒約 9px，慢到幾乎感覺不到在動
const NODE_RADIUS = 1.6;
const LINK_ALPHA = 0.35;       // 最近的兩點連線的不透明度
const NODE_ALPHA = 0.6;

export function createNodeNetwork(canvas) {
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let color = "";
  const nodes = [];

  function readColor() {
    color = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim();
  }

  function randomNode() {
    const angle = Math.random() * Math.PI * 2;
    return { x: Math.random() * width, y: Math.random() * height, vx: Math.cos(angle) * SPEED, vy: Math.sin(angle) * SPEED };
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // 超過 2 倍肉眼看不出差別，只會多耗效能
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(MAX_NODES, Math.round((width * height) / AREA_PER_NODE));
    while (nodes.length < count) nodes.push(randomNode());
    nodes.length = count;
    // 視窗縮小後跑到畫面外的節點放回畫面內
    nodes.forEach((node) => {
      if (node.x > width) node.x = Math.random() * width;
      if (node.y > height) node.y = Math.random() * height;
    });
  }

  // 畫一格；move 為 false 時只重畫不移動（靜止模式、換主題色）
  function step(move = true) {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 1;

    if (move) {
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      });
    }

    const maxSquared = LINK_DISTANCE * LINK_DISTANCE;
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const squared = dx * dx + dy * dy;
        if (squared > maxSquared) continue;
        ctx.globalAlpha = (1 - Math.sqrt(squared) / LINK_DISTANCE) * LINK_ALPHA;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }

    ctx.globalAlpha = NODE_ALPHA;
    ctx.beginPath();
    nodes.forEach((node) => {
      ctx.moveTo(node.x + NODE_RADIUS, node.y);
      ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
    });
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  readColor();
  resize();
  return { step, resize, readColor, get nodeCount() { return nodes.length; } };
}

export function startNodeNetwork() {
  const canvas = document.createElement("canvas");
  canvas.className = "node-network";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const network = createNodeNetwork(canvas);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0;

  function loop() {
    network.step();
    frame = requestAnimationFrame(loop);
  }

  function render() {
    cancelAnimationFrame(frame);
    if (reduceMotion.matches) network.step(false);
    else loop();
  }

  window.addEventListener("resize", () => {
    network.resize();
    if (reduceMotion.matches) network.step(false);
  });
  // app.js 切換深淺色時改的是 <html data-theme>，主色跟著變
  new MutationObserver(() => {
    network.readColor();
    if (reduceMotion.matches) network.step(false);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  reduceMotion.addEventListener("change", render);

  render();
}
