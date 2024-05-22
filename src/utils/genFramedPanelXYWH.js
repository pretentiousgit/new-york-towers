function genFramedPanelXYWH(w, x, y, h) {
  const innerPaneScale = 0.98;
  const paneDiff = (1 - innerPaneScale) / 2;

  const outer = {
    x,
    y,
    w,
    h
  };
  const inner = {
    x: x + (w / 2) * 0.02,
    y: y + (h / 2) * 0.02,
    w: w * innerPaneScale,
    h: h * innerPaneScale
  };

  return {
    outer,
    inner
  };
}

export default genFramedPanelXYWH;
