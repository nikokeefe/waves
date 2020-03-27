import React, { Component } from 'react';

import Header from '../Header';
import Footer from '../Footer';

export class Layout extends Component {
	render() {
		return (
			<div>
				<Header />
				<div className='app_container'>{this.props.children}</div>
				<Footer />
			</div>
		);
	}
}

export default Layout;
