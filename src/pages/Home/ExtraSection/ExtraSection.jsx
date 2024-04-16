import { TiTick } from 'react-icons/ti';
import { motion } from 'framer-motion';
import bdimg from '../../../assets/images/flags/bd.jpg';
import chinaimg from '../../../assets/images/flags/china.jpg';
import franceimg from '../../../assets/images/flags/france.jpg';
import germanyimg from '../../../assets/images/flags/germany.jpg';
import indiaimg from '../../../assets/images/flags/india.jpg';
import italyimg from '../../../assets/images/flags/italy.jpg';
import scotlandimg from '../../../assets/images/flags/scotland.jpg';
import spainimg from '../../../assets/images/flags/spain.jpg';
import ukimg from '../../../assets/images/flags/uk.jpg';
import arabimg from '../../../assets/images/flags/arab.jpg';
import extraImg from '../../../assets/images/extra.jpg';

const ExtraSection = () => {
	return (
		<div>
			<div className="my-5">
				<h2 className="text-3xl font-bold text-black text-center">
					Talk Trove in a Nutshell
				</h2>
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						duration: 0.3,
						ease: [0, 0.71, 0.2, 1.01],
						scale: {
							type: 'spring',
							damping: 5,
							stiffness: 100,
							restDelta: 0.001,
						},
					}}
					className="box flex items-center justify-evenly my-3"
				>
					<img
						className="w-8 h-8 rounded-full border-2 border-black"
						src={bdimg}
						alt=""
					/>
					<img
						className="w-8 h-8 rounded-full border-2 border-black"
						src={chinaimg}
						alt=""
					/>
					<img
						className="w-8 h-8 rounded-full border-2 border-black"
						src={franceimg}
						alt=""
					/>
					<img
						className="w-8 h-8 rounded-full border-2 border-black"
						src={germanyimg}
						alt=""
					/>
					<img
						className="w-8 h-8 rounded-full border-2 border-black"
						src={indiaimg}
						alt=""
					/>
					<img
						className="w-8 h-8 rounded-full border-2 border-black"
						src={italyimg}
						alt=""
					/>
					<img
						className="w-8 h-8 rounded-full border-2 border-black"
						src={scotlandimg}
						alt=""
					/>
					<img
						className="w-8 h-8 rounded-full border-2 border-black"
						src={spainimg}
						alt=""
					/>
					<img
						className="w-8 h-8 rounded-full border-2 border-black"
						src={ukimg}
						alt=""
					/>
					<img
						className="w-8 h-8 rounded-full border-2 border-black"
						src={arabimg}
						alt=""
					/>
				</motion.div>
				<div className="mt-5 md:flex items-center">
					<div className="space-y-5">
						<div className="flex items-center">
							<TiTick className="w-6 h-6 text-green-600" />
							<p className="ml-5 text-xl">
								Deliver an outstanding language curriculum with
								an award-winning platform
							</p>
						</div>
						<div className="flex items-center">
							<TiTick className="w-6 h-6 text-green-600" />
							<p className="ml-5 text-xl">
								Thousands of purposeful, engaging activities
								that inspire and motivate learners
							</p>
						</div>
						<div className="flex items-center">
							<TiTick className="w-6 h-6 text-green-600" />
							<p className="ml-5 text-xl">
								High-quality printable resources and tools to
								make lesson planning easy
							</p>
						</div>
						<div className="flex items-center">
							<TiTick className="w-6 h-6 text-green-600" />
							<p className="ml-5 text-xl">
								Trusted and used daily by thousands of schools
								worldwide
							</p>
						</div>
					</div>
					<div>
						<img src={extraImg} alt="" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExtraSection;
