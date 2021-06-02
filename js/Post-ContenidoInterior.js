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
        urlImagen,
        Usuario: { Nombre, ImagenUsuario },
        minutosDeLectura,
        FechaDeCreacion,
        ContenidoPost,
      } = Post;
      console.log("Manejado como Array", Tags);
      Tags = Tags.split(",");
      console.log(Tags);
      //LLenadoDinamico
      $(document).prop("title", `${titulo}`);
      $(".post-article .img-post-center").html(
        ` <img src="${urlImagen}" alt="">`
      );
      $(".post-article .contenido-Post h1").html(`${titulo}`);
      $(".post-article .contenido-Post .avatar-post ").html(`  
      <img src="${ImagenUsuario}" alt="">`);
      $(".post-article .contenido-Post .Usuario-Nombre").html(`${Nombre}`);
      $(".post-article .contenido-Post .Fecha-Creacion").html(
        `${FechaDeCreacion}. Originally published at <a href="">the${Nombre}agi.com</a>・${minutosDeLectura} min read`
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
    }
  } catch (error) {
    console.log(error);
  }
};
//impresion de Post
$(() => {
  printPostFetchjQuery();
});

// const printKoders = (obKoders) => {
//     let acc = ''

//     for(key in  obKoders){
//         let {name, lastname, } = obKoders[key]
//         acc += `
//         <li class="list-group-item d-flex justify-content-between">
//             <p class="pr-4 text-left">${name} ${lastname}</p>
//             <div class="options__koder">
//                 <a href="/koder.html?idkoder=${key}" class="pr-4 ml-3 btn  btn-primary">Ver koder</a>
//                 <a href="#" class="pr-4 ms-2 btn btn-danger deletekoder" data-id="${key}">Eliminar</a>
//                 <a href="/editkoder.html?idkoder=${key}" class="pr-4 ms-2 btn btn-primary">Editar koder</a>
//             </div>
//         </li>
//         `
//     }

//     $('.list__koders').html(acc)

// }
