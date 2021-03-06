$(()=> { 
    const printPost = (objPost) => {
        let acc = ''
        let newTag=''
        let tags=[]
        for(key in  objPost){
            let {FechaDeCreacion, Tags, minutosDeLectura, titulo } = objPost[key]
            tags=Tags.split(",")
            acc += `
        
              <div class="img-post-center">
                <img
                  src="https://res.cloudinary.com/practicaldev/image/fetch/s--YqaOA8Wu--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0wu3mzqv62p75jsr8mks.jpg"
                  alt="">
              </div>
              <div class="pl-2 pr-2 pb-2  content-post">
                <div class="d-flex align-items-center user-information mt-2">
                  <div class="avatar-img">
                    <img
                      src="https://res.cloudinary.com/practicaldev/image/fetch/s--tjEcwByM--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/350031/9de7de32-e1b3-438e-b86e-375c9e85f10b.jpeg"
                      alt="">
                  </div>
                  <div class="d-flex flex-column ml-2 ">
                    <h3>Ankur Tyagy</h3>
                    <p>${FechaDeCreacion}</p>
                  </div>

                </div>
                <h1 class="mt-3 ">${titulo}</h1>
                <div class="post-bottom">
                <ul class="ul-post">
                
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
                      <small>${minutosDeLectura}min read</small>

                      <button class="ml-2 post-button">Save</button>
                    </div>

                  </div>

                </div>
              </div>



            
            `
            
            let newElementHTML=tags.forEach(e=>{
               newTag+= `<a>#${e}</a>&nbsp&nbsp`
               
            })
        
            
        }
        
        $('.card-center-principal').html(acc)
        $('.ul-post').html(newTag)
        
        
        
    }
    
    
    
    const getAllPost = async () => { 
        try {
            let posts = await $.get('https://desafiojs-vic-carlos-aaron-default-rtdb.firebaseio.com/Posts.json')
            printPost(posts)
        } catch (error) {
            console.log(error)
        }  
    }

    getAllPost()
    
    
    

})