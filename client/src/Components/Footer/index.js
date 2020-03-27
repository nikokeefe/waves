import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

const Footer = () => {
	return (
		<footer className='bck_b_dark'>
			<div className='container'>
				<div className='logo'>Waves</div>
				<div className='wrapper'>
					<div className='left'>
						<h2>Contact Information</h2>
						<div className='business_nfo'>
							<div className='tag'>
								<FontAwesomeIcon icon={faCompass} className='icon' />
								<div className='nfo'>
									<div className=''>Address</div>
									<div className=''>Kramer St</div>
								</div>
							</div>
							<div className='tag'>
								<FontAwesomeIcon icon={faPhone} className='icon' />
								<div className='nfo'>
									<div className=''>Phone</div>
									<div className=''>022-632-8182</div>
								</div>
							</div>
							<div className='tag'>
								<FontAwesomeIcon icon={faClock} className='icon' />
								<div className='nfo'>
									<div className=''>Opening Hours</div>
									<div className=''>Tues-Sun 9am-8pm</div>
								</div>
							</div>
							<div className='tag'>
								<FontAwesomeIcon icon={faEnvelope} className='icon' />
								<div className='nfo'>
									<div className=''>Email</div>
									<div className=''>waves@email.com</div>
								</div>
							</div>
						</div>
					</div>
					<div className='left'>
						Be the first to know
						<div>get all the latest info, events, sales first!</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
