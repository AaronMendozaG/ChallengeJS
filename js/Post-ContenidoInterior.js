const params = new URLSearchParams(window.location.search);
let idPost = params.get("idpost");

const printPostFetchjQuery = async () => {
  try {
    let Post = await $.get(
      `https://desafiojs-vic-carlos-aaron-default-rtdb.firebaseio.com/Posts/${idPost}.json`
    );
    if (Post !== null) {
      let {
        titulo,
        Tags,
        urlImage,
        Usuario: { Nombre, ImagenUsuario },
        MinutosDeLectura,
        FechaDeCreacion,
        ContenidoPost,
      } = Post;
      // console.log("Manejado como Array", Tags);
      Tags = Tags.split(",");
      // console.log(Tags);
      //LLenadoDinamico
      $(document).prop("title", `${titulo}`);
      $(".post-article .img-post-center").html(
        ` <img src="${urlImage}" alt="">`
      );
      $(".post-article .contenido-Post h1").html(`${titulo}`);
      $(".post-article .contenido-Post .avatar-post ").html(`  
      <img src="${ImagenUsuario}" alt="">`);
      $(".post-article .contenido-Post .Usuario-Nombre").html(`${Nombre}`);
      $(".post-article .contenido-Post .Fecha-Creacion").html(
        `${FechaDeCreacion}. Originally published at <a href="">the${Nombre}agi.com</a>・${MinutosDeLectura} min read`
      );
      $(".post-article .contenido-Post .informacion").html(
        `— ${Nombre}💻🎧💪 (@The${Nombre}) <a href="">${FechaDeCreacion}, 2021</a> `
      );
      $(".post-article .contenido-Post .insercionInformacion").html(
        `${ContenidoPost}`
      );
      $(".name-owner").html(`${Nombre}`);
      $(".Nombre").html(`${Nombre}`);
      $(".InformacionArticulo").html(`Software Engineer • Mentor • Author
      ▫ Writing at http://${Nombre}.com
      ▫ Talk to me 1-1 👉 hiretheauthor.com/${Nombre}
      ▫ I love to help people grow and share what I learned`);
      //Imagenes
      $(" .ComentariosImagen ").html(`  
      <img src="${ImagenUsuario}" alt="">`);
      $(" .ImagenArticulo ").html(`  
      <img src="${ImagenUsuario}" alt="">`);

      //Proceso para los Tags
      $(".post-article .contenido-Post .post-tags").html(function () {
        const content = Tags.map((tag) => `<a href="">#${tag}</a>`);
        return content.join("");
      });

      $("#btn-editar").attr('href',`edit-post.html?idpost=${idPost}`)
      $("#btn-manage").attr('href',`manage-post.html?idpost=${idPost}`)
    }
  } catch (error) {
    console.log(error);
  }
};

//impresion de Posts
$(() => {
  printPostFetchjQuery();
});
