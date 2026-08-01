import React from "react";
import Head from "next/head";

import CTAButton from "../components/common/CTAButton";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";

import INFO from "../data/user";

const ThankYou = () => {
	return (
		<React.Fragment>
			<Head>
				<title>{`Message Sent | ${INFO.main.title}`}</title>
				<meta name="robots" content="noindex" />
			</Head>

			<div className="page-content">
				<NavBar active="contact" />
				<div className="content-wrapper">
					<div className="thank-you-container">
						<div className="section-label">Signal Received</div>
						<h1 className="title thank-you-title">Message sent.</h1>
						<p className="subtitle thank-you-subtitle">
							Thanks for reaching out. I&apos;ll read your note and follow up
							by email.
						</p>
						<div className="thank-you-actions">
							<CTAButton to="/">Back Home</CTAButton>
							<CTAButton to="/projects" variant="secondary">
								View Projects
							</CTAButton>
						</div>
					</div>

					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ThankYou;
