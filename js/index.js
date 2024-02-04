// const cursor = document.querySelector('.cursor')

// document.body.addEventListener('mousemove', e => {
// 	console.log(e)
// 	cursor.style.left = `${e.clientX}px`
// 	cursor.style.top = `${e.clientY}px`
// })
const copy = document.querySelector('.tokenomics__copy')

copy.addEventListener('click', () => {
	document
		.querySelector('.tokenomics__alert')
		.classList.add('tokenomics__alert--active')
	navigator.clipboard.writeText('79UQJKQJ3R1SMKXTY6BFLJZNW5HH4ZIJLA3JRKQYEXDG')
	setTimeout(() => {
		document
			.querySelector('.tokenomics__alert')
			.classList.remove('tokenomics__alert--active')
	}, 1000)
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
	document.querySelector('.accepted-modal__avatar').remove()
}
function changeModal() {
	document
		.querySelector('.modal__content')
		.classList.add('accepted-modal--hidden')
	document
		.querySelector('.modal__accepted')
		.classList.add('accepted-modal--visible')
	document.querySelector('.accepted-modal__avatar').play()
}

const endCall = () => {
	document.querySelector('.modal__lap').classList.add('modal__lap--active')
	setInterval(() => {
		changeModal()
		startStopwatch()
	}, 1000)
}

document.querySelector('.modal--end').addEventListener('click', endCall)

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

let body = document.body,
	html = document.documentElement

let height = Math.max(
	body.scrollHeight,
	body.offsetHeight,
	html.clientHeight,
	html.scrollHeight,
	html.offsetHeight,
)

const header = document.querySelector('.header')
if (header) {
	if (height > 1500) {
		window.addEventListener('scroll', e => {
			if (window.pageYOffset > 200) {
				header.classList.add('fixed')
				document.body.style.paddingTop = `${header.offsetHeight}px`
			} else {
				header.classList.remove('fixed')
				document.body.style.paddingTop = `0px`
			}
		})
	}
}

document.querySelectorAll('[data-img]').forEach(img => {
	img.addEventListener('click', () => {
		document.querySelector('.fit__video').src = `./video/${img.dataset.img}.mp4`
		document.querySelector('.fit__video').play()
	})
})
