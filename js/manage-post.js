$(() => {
    //EXTRAE EL ID DEL POST QUE SE QUIERE EDITAR
    const params = new URLSearchParams(window.location.search)
    let idPost = params.get('idpost')

    //IMPRIME POST SELECCIONADO 
    const printPost = async () => {
        let newTag=''
        try {
            let post = await $.get(`https://desafiojs-vic-carlos-aaron-default-rtdb.firebaseio.com/Posts/${idPost}.json`)
            
            //SI POST ES DIFERENTE A NULO
            if (post !== null) {
                
                let { Tags, titulo,FechaDeCreacion} = post
                Tags.split(",").forEach((e)=>{
                    newTag+= `#${e}`
                })
                $('#title').text(titulo)
                $('#published').text(`Published: ${FechaDeCreacion}`)
                $('#tags').text(newTag)
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    //FUNCION DE IMPRIMIR
    printPost()

    //FUNCION DE ELIMINAR POST
    async function deletePost (idPost){
        try {
    
            let deletePost = await $.ajax({
                url : `https://desafiojs-vic-carlos-aaron-default-rtdb.firebaseio.com/Posts/${idPost}.json`,
                method: 'DELETE',
                dataType : 'json',
                success : function(response) {
                    alert("Se elimino de Manera correcta.")
                    //SE REGRESA A HOME
                    window.location.pathname = "/"
                },
                error : function(xhr) {
                    console.log(xhr)
                },
                complete : function(xhr, status) {
                    console.log(xhr, status)
                }
            });

            return deletePost
            
    
        } catch (error) {
            console.log(error)
            console.log(error.message)
        }
        
      
    }

    //BOTON QUE REDIRIGE A EDITAR
    $("#btn-editar").attr('href',`edit-post.html?idpost=${idPost}`)

    //BOTON QUE ELIMINA POST
    $("#btn-delete").click((e)=>{
        e.preventDefault()
        deletePost(idPost)
        
    })

    //BOTON PARA REGRESAR AL INTERIOR DEL POST
    $('#discardChanges').click(function(){
        window.location.pathname = `/post.html`
    })
  });
  