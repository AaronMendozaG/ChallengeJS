////////////////////////////HOME

const printPosts = (obPosts, bandera = 0) => {
  let acc = "";
  let counter = 1;
  let asideTags = [];
  for (key in obPosts) {
    let { titulo, Tags, urlImage, Usuario, MinutosDeLectura, FechaDeCreacion } =
      obPosts[key];
    htmltags = "";
    //Proceso Tags
    Tags.split(",").forEach((tag) => {
      asideTags.push(`<li><a href="">#${tag}</a></li>`);
    });
    Tags.split(",").forEach((tag) => {
      htmltags += `<li><a href="">#${tag}</a></li>`;
    });
    //If para imagen en la primera
    let imgPost =
      counter == 1
        ? `<div class="img-post-center">
    <img
      src="${urlImage}"
      alt="">
  </div>`
        : "";
    //Template Dinamico
    acc += `
      <article class="mt-2 mt-md-3 card-center-principal">
      ${imgPost}
      <div class="pl-2 pr-2 pb-2  content-post">
        <div class="d-flex align-items-center user-information mt-2">
          <div class="avatar-img">
            <img
              src="${Usuario.ImagenUsuario}"
              alt="">
          </div>
          <div class="d-flex flex-column ml-2 mt-3 ">
            <h3>${Usuario.Nombre}</h3>
            <p>${FechaDeCreacion}</p>
          </div>
        </div>                     
        <h1 class="mt-3 "><a href="/post.html?idpost=${key}" class="pr-4 ml-3 title-post">${titulo}</a></h1>
        <div class="post-bottom">
          <ul class="d-flex ul-post post-tags">
                ${htmltags}
          </ul>
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <a href=""><svg class="crayons-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z">
                  </path>
                </svg>
      
              </a>
              <p>28</p>
              <p class="d-none d-md-block d-lg-block ml-1">reactions</p>
              <a class="ml-4" href=""><svg class="crayons-icon fill" width="24" height="24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z">
                  </path>
                </svg>
              </a>
              <p>1</p>
              <p class="d-none d-md-block d-lg-block ml-1">comment</p>
            </div>
            <div class="d-flex align-items-center">
              <small>${MinutosDeLectura} min read</small>
              <button class="ml-2 post-button">Save</button>
            </div>
          </div>
        </div>
      </div>
      </article>
         `;
    counter++;
  }
  if (bandera === 1) {
    // console.log("Hola estoy entrando a if bandera");
    $(".ConcatenadoPostScroll").html(acc);
  } else {
    $(".ContenidoDinamico").html(acc);
  }
  const myUniqueArray = [...new Set(asideTags)];
  // console.log(myUniqueArray)
  $("#asideTags").html(myUniqueArray);
};

// const getAllPostsAjaxjQuery = async () => {
//   try {
//     let Posts = await $.get(
//       "https://desafiojs-vic-carlos-aaron-default-rtdb.firebaseio.com/Posts.json"
//     );
//     let postReverse = {};
//     Object.keys(Posts)
//       .reverse()
//       .forEach((Post) => {
//         postReverse[[Post]] = Posts[Post];
//       });

//     printPosts(postReverse);
//   } catch (error) {
//     console.log(error);
//   }
// };

const getAllPostsAjaxjQuery = async () => {
  try {
    let Posts = await $.get(
      "https://desafiojs-vic-carlos-aaron-default-rtdb.firebaseio.com/Posts.json"
    );
    // let postReverse = {};
    let postiniciales = {};
    let postRestantes = {};
    //Iniciales
    Object.keys(Posts)
      .reverse()
      .slice(0, 6)
      .forEach((elem) => {
        postiniciales[[elem]] = Posts[elem];
        // console.log("Dentro del Foreach valor traido num ", Posts[elem]);
        // console.log("Dentro del Foreach valor guardado", postiniciales[elem]);
      });
    // console.log("Todos", Posts);
    // console.log("Iniciales", postiniciales);
    printPosts(postiniciales);
    //Restantes
    Object.keys(Posts)
      .reverse()
      .slice(3, 6)
      .forEach((Post) => {
        postRestantes[[Post]] = Posts[Post];
      });
    // console.log("Restantes:", postRestantes);
    // If Scroll
    $(window).scroll(function () {
      if (
        $(window).scrollTop() >=
        $(document).height() - $(window).height() - 10
      ) {
        $(".ContenidoDinamico").append(
          '<div class="ConcatenadoPostScroll"></div>'
        );
        printPosts(postRestantes, 1);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

$(() => {
  getAllPostsAjaxjQuery();
});
