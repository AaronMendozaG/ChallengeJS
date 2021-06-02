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

    date = new Date()
    title = $('#titlePost').val()
    lectura = between(0,120)
    tags = $('#tagsPost').val()
    content = $('#editor').val()
    image = "https://picsum.photos/seed/picsum/200/300"
    user = {
        ImagenUsuario: "https://picsum.photos/seed/picsum/200/300",
        Nombre: 'Pedrito'
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
    functionCreate(newPostObj)
    alert("Post Publish")
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

var quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
      toolbar: toolbarOptions
  },
});
