fetch('/public/doc/doc.md')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error al cargar el contenido de la pagina')
    }
    return response.text()
  })
  .then((content) => {
    document.getElementById('content').innerHTML = marked.parse(content)
  })
  .catch((error) => console.error('Error en la petición'))
