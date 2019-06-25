function saveAs() {
  const exportString = document.getElementsByTagName('svg')[0];
  var s = new XMLSerializer();
  var str = s.serializeToString(exportString);
  let blob = new Blob([str], {type: 'image/svg+xml'});
  let blobUrl = URL.createObjectURL(blob);
  let link = document.createElement("a"); // Or maybe get it from the current document
  link.href = blobUrl;
  link.download = "tower.svg";
  link.innerHTML = "Click here to download the file";
  document.body.appendChild(link); // Or append it wherever you want
}