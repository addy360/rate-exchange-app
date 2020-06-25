const BASE_URL = 'https://api.exchangeratesapi.io'

function getlatestRates(){
	return fetch(`${BASE_URL}/latest`)
}

const amount1 = document.querySelector('.amount-1')
const amount2 = document.querySelector('.amount-2')
const currency1 = document.querySelector('.currency-1')
const currency2 = document.querySelector('.currency-2')
getlatestRates()
.then(res=>res.json())
.then(res=> {
	let option = ''
	for(let key in res.rates){

		option = option + `<option value="${key}" >${key}</option>`
	}
	currency1.innerHTML = option
	currency2.innerHTML = option
})
.catch(err=> console.log(err))


amount1.addEventListener('input', calculateRate)
amount2.addEventListener('input', calculateRate)
currency1.addEventListener('change', calculateRate)
currency2.addEventListener('change', calculateRate)
document.querySelector('.rates-container button').addEventListener('click',e=>{
	let temp = currency1.value
	currency1.value = currency2.value
	currency2.value = temp
	calculateRate('d')
})


function calculateRate(e){
	let val1 = currency1.value
	let val2 = currency2.value
	document.querySelector('.rates').innerHTML = `1 ${val1} = <small>Calculating...</small> ${val2}`
	fetch(`${BASE_URL}/latest?base=${val1}`)
	.then(res=>res.json())
	.then(res=>{
		let rate = res.rates[val2]
		document.querySelector('.rates').innerHTML = `1 ${val1} = ${rate} ${val2}`
		amount2.value = (amount1.value * rate).toFixed(2)
	})
	.catch(err=>{
		console.log(err)
	})
}