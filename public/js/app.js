

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwe = document.querySelector('#message-2')



weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    messageOne.textContent='Loading'
    messageTwe.textContent=''

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent=data.error
                console.log(data.error)
    
            } else {
                messageOne.textContent=data.error
                messageTwe.textContent=data.forecast
                
                

            }
    
        })
    })



    console.log(location)
})