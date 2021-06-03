$(() => {
    const params = new URLSearchParams(window.location.search)
    let idPost = params.get('idpost')

    const printPost = async () => {
        let newTag=''
        try {
            let post = await $.get(`https://desafiojs-vic-carlos-aaron-default-rtdb.firebaseio.com/Posts/${idPost}.json`)
            
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
    printPost()

    async function deletePost (idPost){
        try {
    
            let deletePost = await $.ajax({
                url : `https://desafiojs-vic-carlos-aaron-default-rtdb.firebaseio.com/Posts/${idPost}.json`,
                method: 'DELETE',
                dataType : 'json',
                success : function(response) {
                    console.log(response)
                    //getAllKodersJquery()
                    alert("Se elimino de Manera correcta.")
                    //SE RECARGA LA PAGINA CADA QUE SE ELIMINE
                    window.location.pathname = "/"
                },
                error : function(xhr) {
                    //console.log(xhr)
                },
                complete : function(xhr, status) {
                    //console.log(xhr, status)
                }
            });

            return deletePost
            
    
        } catch (error) {
            console.log(error)
            console.log(error.message)
        }
        
      
    }

    $("#btn-editar").attr('href',`edit-post.html?idpost=${idPost}`)
    $("#btn-delete").click((e)=>{
        e.preventDefault()
        deletePost(idPost)
        
    })
    $('#discardChanges').click(function(){
        window.location.pathname = `/post.html`
    })
  });
  