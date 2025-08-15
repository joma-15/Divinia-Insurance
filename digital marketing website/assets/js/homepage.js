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
    window.addEventListener("load", function(){
      setTimeout(function(){
        document.getElementById("preloader").classList.add("fade-out");
      }, 2000);
    });
}
handlePreloader();