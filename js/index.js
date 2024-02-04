// const cursor = document.querySelector('.cursor')

// document.body.addEventListener('mousemove', e => {
// 	console.log(e)
// 	cursor.style.left = `${e.clientX}px`
// 	cursor.style.top = `${e.clientY}px`
// })
const copy = document.querySelector('.tokenomics__copy')

copy.addEventListener('click', () => {
	navigator.clipboard.writeText('79UQJKQJ3R1SMKXTY6BFLJZNW5HH4ZIJLA3JRKQYEXDG')
})

document.body.style.cursor = 'url("../images/cursor.png"), auto'

const gotoSection = () => {
	const links = document.querySelectorAll('[data-goto-section]')
	const header = document.querySelector('.fixed')

	links.forEach(link => {
		link.addEventListener('click', e => {
			if (link.dataset.gotoSection) {
				e.preventDefault()
				const section = document.querySelector(e.target.dataset.gotoSection)
				const sectionTop = header
					? section.getBoundingClientRect().top - header.offsetHeight
					: section.getBoundingClientRect().top

				if (
					document
						.querySelector('.menu__icon')
						.classList.contains('menu__icon--lock')
				) {
					document.body.classList.remove('page__body--lock')
					const iconMenu = document
						.querySelector('.menu__icon')
						.classList.remove('menu__icon--active')
					const menuBody = document
						.querySelector('.menu__body')
						.classList.remove('menu__body--active')
				}

				window.scrollBy({
					top: sectionTop,
					behavior: 'smooth',
				})
			}
		})
	})
}

gotoSection()

setTimeout(openModal, 3000)

function openModal() {
	document.getElementById('modal').setAttribute('open', true)
}

function closeModal() {
	document.getElementById('modal').removeAttribute('open')
}
function changeModal() {
	document
		.querySelector('.modal__content')
		.classList.add('accepted-modal--hidden')
	document
		.querySelector('.modal__accepted')
		.classList.add('accepted-modal--visible')
}
let stopwatchInterval
let elapsedTime = 1
let isRunning = false

function startStopwatch() {
	if (!isRunning) {
		stopwatchInterval = setInterval(updateStopwatch, 1000)
		isRunning = true
	}
}

function stopStopwatch() {
	clearInterval(stopwatchInterval)
	isRunning = false
}

function resetStopwatch() {
	clearInterval(stopwatchInterval)
	elapsedTime = 0
	isRunning = false
	updateStopwatch()
}

const time = document.querySelectorAll('.accepted-modal__time')

function updateStopwatch() {
	let hours = Math.floor(elapsedTime / 3600)
	let minutes = Math.floor((elapsedTime % 3600) / 60)
	let seconds = elapsedTime % 60

	let formattedTime = `${padZero(minutes)}:${padZero(seconds)}`

	time.forEach(time => {
		time.innerHTML = formattedTime
	})

	elapsedTime++
}

function padZero(num) {
	return num < 10 ? `0${num}` : num
}

document.querySelectorAll('.modal--accept').forEach(btn => {
	btn.addEventListener('click', () => {
		changeModal()
		startStopwatch()
	})
})

function openModalRobot() {
	document.querySelector('.robot-dialog').setAttribute('open', true)
}

function closeModalRobot() {
	document.querySelector('.robot-dialog').removeAttribute('open')
}
