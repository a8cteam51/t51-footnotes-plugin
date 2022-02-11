function handleMarkerClick( event ) {
	document.querySelector( '#footnote-' + event.target.dataset.id ).classList.toggle( 'footnote-visible' );
}

function positionFootnotes() {
	const positions = [];

	document.querySelectorAll( '.footnote-marker' ).forEach( ( el ) => {
		if ( false === el.parentElement.classList.contains( 'footnote' ) ) {
			positions.push( el.offsetTop );

			el.addEventListener( 'click', handleMarkerClick );
		}
	} );

	let lastPosition = 0;

	document.querySelectorAll( '.footnote .footnote-marker' ).forEach( ( el ) => {
		let newTop = positions.shift();
		let parentHeight = el.parentElement.getBoundingClientRect().height;

		if ( lastPosition > newTop ) {
			newTop = lastPosition + 20;
		} else {
			newTop = newTop + 20;
		}

		el.parentElement.style.top = newTop + 'px';

		lastPosition =  parentHeight + newTop;
	} );
}

document.addEventListener( 'DOMContentLoaded', positionFootnotes );
window.addEventListener( 'resize', positionFootnotes );
