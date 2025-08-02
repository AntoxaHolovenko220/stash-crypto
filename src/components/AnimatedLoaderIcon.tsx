import React from 'react'

const rays = [
	'M8 3a.638.638 0 00-.639.639v1.675a.639.639 0 101.277 0V3.639A.639.639 0 008 3z', //12
	'M9.899 6.74a.636.636 0 00.451-.188l1.185-1.184a.639.639 0 00-.904-.904L9.447 5.65a.639.639 0 00.452 1.09z', //01:30
	'M12.362 7.36h-1.675a.639.639 0 000 1.278h1.675a.639.639 0 000-1.277z', //3
	'M10.35 9.448a.64.64 0 00-.903.904l1.184 1.184a.639.639 0 00.904-.903L10.35 9.448z', //04:30
	'M8 10.048a.638.638 0 00-.639.639v1.675a.639.639 0 001.277 0v-1.675A.638.638 0 008 10.048z', //6
	'M5.649 9.448l-1.185 1.185a.64.64 0 00.904.903l1.184-1.184a.638.638 0 10-.903-.904z', //07:30
	'M5.952 8a.639.639 0 00-.639-.64H3.64a.638.638 0 100 1.278h1.674a.639.639 0 00.639-.639z', //9
	'M5.35 4.448a.64.64 0 00-.903.904l1.184 1.184a.639.639 0 00.904-.903L5.35 4.448z', //10:30
]

const AnimatedLoaderIcon = ({
	size = 16,
	duration = 1.5,
}: {
	size?: number
	duration?: number
}) => {
	const rayCount = rays.length
	const delayStep = duration / rayCount

	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<rect width='16' height='16' rx='8' fill='#F4D800' fillOpacity='0.15' />
			{rays.map((d, i) => (
				<path
					key={i}
					d={d}
					fill='#F4D800'
					style={{
						animation: `pulse ${duration}s linear infinite`,
						animationDelay: `${i * delayStep}s`,
						transformOrigin: 'center',
					}}
				/>
			))}
			<style>
				{`
					@keyframes pulse {
						0% { opacity: 0; }
						10% { opacity: 1; }
						70% { opacity: 1; }
						100% { opacity: 0; }
					}
				`}
			</style>
		</svg>
	)
}

export default AnimatedLoaderIcon
