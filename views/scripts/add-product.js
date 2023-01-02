let successMessage;

if (document.querySelector('.succesful-post')) {
    successMessage = document.querySelector('.succesful-post');
    setTimeout(() => {
        successMessage.parentNode.removeChild(successMessage);
    }, 2000);
}