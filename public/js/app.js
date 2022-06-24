console.log('Client side javascript is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const forecastImg = document.querySelector('#forecastImg')
const loadingImg = document.querySelector('#loadingImg')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    loadingImg.hidden = false
    forecastImg.hidden = true
    forecastImg.src = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            loadingImg.hidden = true
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                forecastImg.src = data.image
                forecastImg.hidden = false
            }
        })
    })
})