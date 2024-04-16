import logoWhite from '../../../assets/logoWhite.png';
import { FaFacebookF, FaInstagramSquare, FaTwitter } from 'react-icons/fa';

const Footer = () => {
	return (
		<>
			<footer className="footer p-10 bg-white text-black border-2 border-black">
				<div>
					<span className="footer-title">Contact Us</span>
					<p>Call : 1-800-375-474</p>
					<p>Email : tt@service.com</p>
					<p>(8AM-5PM CST M-Th 8AM-12PM CST F)</p>
				</div>
				<div>
					<span className="footer-title">Address</span>
					<p>Talk Trove E-Learning Platform</p>
					<p>House No-5, Block-E , Road-3</p>
					<p>EduTower, California, USA</p>
				</div>
				<div>
					<span className="footer-title">Legal</span>
					<a className="link link-hover">Terms of use</a>
					<a className="link link-hover">Privacy policy</a>
					<a className="link link-hover">Cookie policy</a>
				</div>
			</footer>
			<footer className="footer px-10 py-4 border-t text-white bg-black border-black">
				<div className="items-center grid-flow-col">
					<img className="w-[200px]" src={logoWhite} alt="" />
					<p>
						Talk Trove E-Learning Platform <br /> Copyright © 2023 -
						All right reserved by Talk Trove
					</p>
				</div>
				<div className="md:place-self-center md:justify-self-end">
					<div className="grid grid-flow-col gap-4">
						<a>
							<FaTwitter className="w-8 h-8 " />
						</a>
						<a>
							<FaInstagramSquare className="w-8 h-8 " />
						</a>
						<a>
							<FaFacebookF className="w-8 h-8 " />
						</a>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
