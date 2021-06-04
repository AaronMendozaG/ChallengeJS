var quill
//EXTRAE EL ID DEL POST QUE SE QUIERE EDITAR
const params = new URLSearchParams(window.location.search)
let idPost = params.get('idpost')

//FUNCION PARA IMPRIMIR POST
const printPost = async () => {
        try {
            let post = await $.get(`https://desafiojs-vic-carlos-aaron-default-rtdb.firebaseio.com/Posts/${idPost}.json`)
            if (post !== null) {
                let { ContenidoPost, Tags, titulo, urlImage } = post
                $('.ql-editor ').html(ContenidoPost)
                $('#tag').val(Tags)
                $('#title').text(titulo)
                $('#urlImg').attr("src",urlImage)
                $('#imgInput').val(urlImage)
            }
            
        } catch (error) {
            console.log(error)
        }
    }


    
$(document).ready(function(){
    // console.log('ready')
    

    printPost()
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

    if( $('#editor').length > 0 ){
        quill = new Quill('#editor', {
            theme: 'snow',
            modules: {
                toolbar: toolbarOptions
            },
            placeholder:'Write your post content here'
        })
    }

    //BONTON LA IMAGEN DE POST
    $('.remove').click(()=>{$('#urlImg').attr("src",'http://via.placeholder.com/640x360')})
    
    //BONTON ABRE EL IMPUT PARA CAMBIAR LA IMAGEN DE POST
    $('.change').click((e)=>{$('#imgInput').attr('class','tags-edit mt-3').focus()})

    //FUNCION DE EDITAR POST
    async function modifyPost (idPost,newPost){
        try {
    
            let post = await $.ajax({
                url: `https://desafiojs-vic-carlos-aaron-default-rtdb.firebaseio.com/Posts/${idPost}.json`,
                method:'PATCH',
                data: JSON.stringify(newPost),
                dataType: '',
                success: function() {
                    window.alert('POST MODIFICADO CON EXITO')
                    window.location.pathname = "/"
                },
                error: function(xhr){
                    console.log(xhr)
                },
                complete: function(xhr){
                    // console.log(xhr)
                },
            })
            return post
    
        } catch (error) {
            console.log(error)
            console.log(error.message)
        }
    }

    //EVENTO CLICK QUE GUARDA LOS CAMBIOS DE EDICION
    $('#saveChanges').click(()=>{
        let ContenidoPost=$('.ql-editor ').html()
        let Tags=$('#tag').val()
        let titulo=$('.title').val()
        let urlImage=$('#imgInput').val()

        //VALIDA CAMPOS VACIOS
        if (ContenidoPost=='<p> </p>' || Tags == '' || titulo=='' || urlImage == '') {
            window.alert('Ingresa todos los datos solicitados' )
            return
        }
        //CREA NUEVO OBJETO
        let newPostModify={
            ContenidoPost:ContenidoPost, 
            Tags:Tags, 
            titulo:titulo, 
            urlImage:urlImage
        }
        //SE LLAMA LA FUNCION DE MODIFICAR
        modifyPost(idPost,newPostModify)
   })

   
    //TAGS
//    $('#tag').tagsInput({
//         minChars: 0,
//         maxChars: null,
//         limit: null,
//         validationPattern: null,
//         unique: true
//     })

    //BOTON DE CERRAR REGRESA A HOME
   $('#btnClose').click(function(){
        alert("You've made changes to your post. Do you want to navigate to leave this page?")
        window.location.pathname = "/"
    })

    //DESCARTA CAMBIOS Y REGRESA AL POST
    $('#discardChanges').click(function(){
        window.location.pathname = `/post.html`
    })
    

$('#tag').click(()=>{
    $('#infoArea').html('<p> <strong> </> Agrega tus Tags</strong> <br> Las etiquetas ayudan a las personas a encontrar tu publicación. Piense en las etiquetas como los temas o categorías que mejor describen su publicación.</p>')
    $('#tag').tagsInput({
        minChars: 0,
        maxChars: null,
        limit: null,
        validationPattern: null,
        unique: true
    })
    
})


$('#imgInput').click(function(){
    $('#infoArea').html('<p> <strong> </> Imagen del Post</strong> <br> La imagen del Post se mostrara a los Usuarios, piensa en una imagen que describa tu Post.</p>')
})


$('#title').click(function(){
    $('#infoArea').html(
        '<strong> </> Escribe un Gran Titulo</strong> <br> Piense en el título de su publicación como una descripción súper corta ¡pero convincente!. Utilice palabras clave cuando sea apropiado para ayudar a garantizar que las personas puedan encontrar su publicación mediante la búsqueda.</p>')
})

$('#editor').click(function(){
    $('#infoArea').html(
        '<strong> </> Editor Basico</strong> <br> Use Markdown para escribir y dar formato a las publicaciones. Puede usar etiquetas Liquid para agregar contenido enriquecido como tweets, videos de YouTube, etc. Además de las imágenes del contenido de la publicación, también puede arrastrar y soltar una imagen de portada.</p>')
})

})