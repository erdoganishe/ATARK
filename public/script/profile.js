async function getProfileData(){
    const responce = await fetch('/api/user');
    const resData = await responce.json();

    return resData;
}


async function saveChangesAddEventListener(){
    resData = await getProfileData();
    const saveChangesButton = document.getElementById('save-changes-profile-button');
    saveChangesButton.addEventListener('click', async () => {
        jsonData = { "uId": `${resData._id}`, "isProfile": true 
    }
    const myFiles = document.getElementById('myFiles').files[0];

    const formData = new FormData();

    formData.append('file', myFiles);
    formData.append('jsonData', JSON.stringify(jsonData));
    const fileUpResponce = await fetch('/fileUpload', {
      method: 'POST',
      body: formData
    });
    const fileUpData = await fileUpResponce.json();
    console.log(fileUpData);
    });
}

const getImageOrFallback = (path, fallback) => {
    return new Promise(resolve => {
      const img = new Image();
      img.src = path;
      img.onload = () => resolve(path);
      img.onerror = () => resolve(fallback);
    });
  };

async function getStartProfileInfo(){
    resData = await getProfileData();
    profileImage = document.getElementById('profile-img');


    const link = getImageOrFallback(
        `/img/profile/${resData._id}.png`,
        '/img/profile/avatar.png'
        ).then(result =>  profileImage.src = result || result);

    
    
}

saveChangesAddEventListener();
getStartProfileInfo();