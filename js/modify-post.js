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
   $('#tag').tagsInput({
        minChars: 0,
        maxChars: null,
        limit: null,
        validationPattern: null,
        unique: true
    })

    //BOTON DE CERRAR REGRESA A HOME
   $('#btnClose').click(function(){
        alert("You've made changes to your post. Do you want to navigate to leave this page?")
        window.location.pathname = "/"
    })

    //DESCARTA CAMBIOS Y REGRESA AL POST
    $('#discardChanges').click(function(){
        window.location.pathname = `/post.html`
    })
    
    
    
})