import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import 'react-awesome-slider/dist/styles.css';
import anime from 'animejs/lib/anime.es.js';
import './Banner.css';

import slide1 from '../../../assets/images/slide1.jpg';
import slide2 from '../../../assets/images/slide2.jpg';
import slide4 from '../../../assets/images/slide4.jpg';

anime
	.timeline({ loop: true })
	.add({
		targets: '.ml2 .letter',
		scale: [4, 1],
		opacity: [0, 1],
		translateZ: 0,
		easing: 'easeOutExpo',
		duration: 950,
		delay: (el, i) => 70 * i,
	})
	.add({
		targets: '.ml2',
		opacity: 0,
		duration: 1000,
		easing: 'easeOutExpo',
		delay: 1000,
	});

const Banner = () => {
	return (
		<div className="mb-20">
			<AwesomeSlider animation="cubeAnimation">
				<div
					data-src={slide1}
					className="relative w-full h-full flex items-center justify-center"
				>
					<div className="absolute inset-0 bg-black opacity-50"></div>

					<div className="z-10 text-center">
						<h2 className="text-3xl md:text-7xl text-white mb-5 ml2">
							<span className="letter">Unlimited Classes</span>{' '}
							<br />
							<span className="letter">Unlimited learning!</span>
						</h2>
						<p className="text-white text-base md:text-2xl">
							Start speaking confidently - with live classes{' '}
							<br />
							taught by world-class instructors.
						</p>
					</div>
				</div>
				<div
					data-src={slide2}
					className="relative w-full h-full flex items-center justify-center"
				>
					<div className="absolute inset-0 bg-black opacity-50"></div>

					<div className="z-10 text-center">
						<h2 className="text-3xl md:text-7xl text-white mb-5 ml2">
							<span className="letter">
								Language Immersion Program
							</span>{' '}
							<br />
							<span className="letter">
								Language-rich Environment!
							</span>{' '}
						</h2>
						<p className="text-white text-base md:text-2xl">
							Immerse yourself in a language-rich environment.
							<br />
							Accelerate your learning with our intensive language
							immersion program.
						</p>
					</div>
				</div>
				<div
					data-src={slide4}
					className="relative w-full h-full flex items-center justify-center"
				>
					<div className="absolute inset-0 bg-black opacity-50"></div>

					<div className="z-10 text-center">
						<h2 className="text-3xl md:text-7xl text-white mb-5 ml2">
							<br />
							<span className="letter">
								Customized Language Courses
							</span>{' '}
							<br />
							<span className="letter">
								Learn in a way you like!
							</span>
						</h2>
						<p className="text-white text-base md:text-2xl">
							Tailor your language learning experience with our
							customized courses. <br />
							Personalized approach will help you achieve your
							language goals.
						</p>
					</div>
				</div>
			</AwesomeSlider>
		</div>
	);
};

export default Banner;
