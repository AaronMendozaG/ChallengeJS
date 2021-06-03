// Funcion Crear
let functionCreate = async (post)=>{
    try{
      let newPost = 
        await $.post('https://desafiojs-vic-carlos-aaron-default-rtdb.firebaseio.com/Posts/.json', JSON.stringify(post), 
        function(response){window.location.pathname = '/index.html'})            
    }catch(err){
        console.log(err.message)
    }
  }

//Returns a random number between min (inclusive) and max (exclusive)
 const between = (min, max) => {  
    return Math.floor( Math.random() * (max - min) + min)
  }

  // crear usuario
  $('#btnPublish').click(function(){
    let dataDate = new Date()
    let datePost = dataDate.getDate()
    let dateMonth = ''
    switch (dataDate.getMonth()+1) {
        case 1:
            dateMonth = 'Enero'
            break;
        case 2:
            dateMonth = 'Febrero'
            break;
        case 3:
            dateMonth = 'Marzo'
            break;
        case 4:
            dateMonth = 'Abril'
            break;
        case 5:
            dateMonth = 'Mayo'
            break;
        case 6:
            dateMonth = 'Junio'
            break;
        case 7:
            dateMonth = 'Julio'
            break;
        case 8:
            dateMonth = 'Agosto'
            break;
        case 9:
            dateMonth = 'Septiembre'
            break;
        case 10:
            dateMonth = 'Octubre'
            break;
        case 11:
            dateMonth = 'Noviembre'
            break;
        case 12:
            dateMonth = 'Diciembre'
            break;
    } 
        

    date = `${datePost} de ${dateMonth}`

    // date = new Date().toISOString().split('T')[0]

    title = $('#titlePost').val()
    lectura = between(0,120)
    tags = $('#tagsPost').val()
    content = quill.root.innerHTML
    image = $('#formFileLg').val()
    user = {
        ImagenUsuario: $('#userImage').val(),
        Nombre: $('#user').val()
    }

    let newPostObj = {
        FechaDeCreacion: date,
        MinutosDeLectura: lectura,
        titulo: title,
        Tags: tags,
        ContenidoPost: content,
        urlImage: image,
        Usuario: user
    }
    if(date !== '' && title !== '' && lectura !== '' && tags !== '' && content !== '' && image !== '' && user.ImagenUsuario !== '' && user.Nombre !== ''){
        functionCreate(newPostObj)
        alert("Post Publish")
    }else{
        alert('Llene todos los campos')
    }
  })

$('#btnClose').click(function(){
    alert("You've made changes to your post. Do you want to navigate to leave this page?")
    window.location.pathname = "/"
})



var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];

if($('#editor').length>0){
    var quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
          toolbar: toolbarOptions
      },
    });
}


$('#tagsPost').tagsInput({
    minChars: 0,
    maxChars: null,
    limit: null,
    validationPattern: null,
    unique: true
})

$('#user').click(function(){
    $('#infoArea').html('<p> <strong> </> Nombre de Usuario</strong> <br>Agrega tu nombre de Usuario, este sera mostrado en el Post. </p>')
})

$('#userImage').click(function(){
    $('#infoArea').html('<p> <strong> </> Imagen de Perfil</strong> <br> La imagen de Perfil de Usuario se muestra en el Post y te identifica, es importante colocarla para que los demas te conozcan. </p>')
})

$('#formFileLg').click(function(){
    $('#infoArea').html('<p> <strong> </> Imagen del Post</strong> <br> La imagen del Post se mostrara a los Usuarios, piensa en una imagen que describa tu Post.</p>')
})


$('#titlePost').click(function(){
    $('#infoArea').html(
        '<strong> </> Escribe un Gran Titulo</strong> <br> Piense en el título de su publicación como una descripción súper corta ¡pero convincente!. Utilice palabras clave cuando sea apropiado para ayudar a garantizar que las personas puedan encontrar su publicación mediante la búsqueda.</p>')
})

$('#editor').click(function(){
    $('#infoArea').html(
        '<strong> </> Editor Basico</strong> <br> Use Markdown para escribir y dar formato a las publicaciones. Puede usar etiquetas Liquid para agregar contenido enriquecido como tweets, videos de YouTube, etc. Además de las imágenes del contenido de la publicación, también puede arrastrar y soltar una imagen de portada.</p>')
})

