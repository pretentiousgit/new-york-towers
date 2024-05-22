// TODO: Add a GUID or other random number generator to this to make it unique
// maybe a hash of the building state at the time it was written, for rehydration elsewhere

export default function saveSVGAs() {
  console.log('SaveAs');
  const exportString = document.getElementsByTagName('svg')[0];
  const s = new XMLSerializer();
  const str = s.serializeToString(exportString);
  const blob = new Blob([str], { type: 'image/svg+xml' });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a'); // Or maybe get it from the current document
  link.href = blobUrl;
  link.download = 'image_from_canvas.svg';
  link.innerHTML = 'Click here to download the file';
  document.body.appendChild(document.createElement('br')); // Or append it wherever you want
  document.body.appendChild(link); // Or append it wherever you want
}
