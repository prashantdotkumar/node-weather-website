console.log('Client side javascript file is loaded!')

const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault()
    message1.textContent = 'loading..'
    message2.textContent = ''
    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        
        if(data.error) {
            message1.textContent = data.error
            
        } else {
            message1.textContent = data.location
            message2.textContent = data.temperature + ' degree celcius'
        }
              
    })
})
})