function handleDrawer(){
    const drawer = document.getElementById("drawer");
    document.getElementById("openDrawer").addEventListener("click", () => {
      drawer.classList.add("open");
    });
    document.getElementById("closeDrawer").addEventListener("click", () => {
      drawer.classList.remove("open");
    });
}
handleDrawer(); 


function handlePreloader(){
    // Preloader fade-out after 3 seconds
    // window.addEventListener("load", function(){
    //   setTimeout(function(){
    //     document.getElementById("preloader").classList.add("fade-out");
    //   }, 1000);
    // });

    const preloader = document.getElementById("preloader"); 

    if (!sessionStorage.getItem("preloaderShown")) {
      setTimeout(() => {
        preloader.classList.add("fade-out"); 
        sessionStorage.setItem("preloaderShown", "true"); 
      }, 3000);
    }else{
      preloader.style.display = "none"; //dont show anything in the screen
    }
}
handlePreloader();