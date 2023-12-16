
//add header redirects
function addHrefToHeader(){

    //get buttons
    const toProfile = document.getElementById('profile-href');
    const toMain = document.getElementById('to-main-link');
    const toMainHref = document.getElementById('to-main-href');

    //add profile redirect
    toProfile.addEventListener('click', ()=>{
        window.location.href = `/profile?lang=${urlParams.get('lang')}`; 
    });

    //add main page redirect
    toMain.href = `/?lang=${urlParams.get('lang')}`; 
 
    //add home page redirect
    toMainHref.addEventListener('click', ()=>{
        window.location.href = `/main?lang=${urlParams.get('lang')}`; 
    });

}

//start function
addHrefToHeader();