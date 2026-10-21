const btnCrear = document.getElementById('btnCrear');
const btnDescargar = document.getElementById('btnDescargar');
const btnSlice = document.getElementById('btnSlice');
const resultado = document.getElementById('resultado');

let blobActual = null;

const textoOriginal = 'Este es un archivo de texto generado con Blob en JavaScript. Universidad Católica de Salta - Lenguaje IV.';

btnCrear.addEventListener('click', () => {
  blobActual = new Blob([textoOriginal], { type: 'text/plain' });
  resultado.textContent = `Blob creado.\nTipo: ${blobActual.type}\nTamaño: ${blobActual.size} bytes`;
});

btnDescargar.addEventListener('click', () => {
  if (!blobActual) {
    resultado.textContent = 'Primero tenés que crear el Blob.';
    return;
  }

  const url = URL.createObjectURL(blobActual);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = 'archivo.txt';
  enlace.click();
  URL.revokeObjectURL(url);

  resultado.textContent = 'Blob descargado como archivo.txt';
});

btnSlice.addEventListener('click', () => {
  if (!blobActual) {
    resultado.textContent = 'Primero tenés que crear el Blob.';
    return;
  }

  const blobParcial = blobActual.slice(0, 20, 'text/plain');

  const lector = new FileReader();
  lector.onload = () => {
    resultado.textContent = `Blob original (${blobActual.size} bytes) recortado con slice(0, 20).\nContenido del fragmento:\n"${lector.result}"`;
  };
  lector.readAsText(blobParcial);
});
