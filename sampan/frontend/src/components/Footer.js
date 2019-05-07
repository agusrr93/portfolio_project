import React from 'react';
import { MDBFooter } from 'mdbreact';

const Footer1 = () => {
	return (
		<MDBFooter className="text-center font-small dark-green" id="footer">
			<p className="footer-copyright mb-0 py-3 text-center">
				&copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> SampAn </a>
			</p>
		</MDBFooter>
	);
};

export default Footer1;
