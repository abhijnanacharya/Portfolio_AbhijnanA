import React, { useEffect } from "react";
import Head from "next/head";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import Socials from "../components/about/socials";

import INFO from "../data/user";
import SEO from "../data/seo";

const Contact = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "contact");

	return (
		<React.Fragment>
			<Head>
				<title>{`Contact | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Head>

			<div className="page-content">
				<NavBar active="contact" />
				<div className="content-wrapper">
					<div className="contact-logo-container">
						<div className="contact-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="contact-container">
						<div className="section-label">Signal Channel</div>
						<div className="title contact-title">
							Let&apos;s build the next thing.
						</div>

						<div className="subtitle contact-subtitle">
							For roles, collaborations, or technical
							conversations, email me at &nbsp;{" "}
							<a href={`mailto:${INFO.main.email}`}>
								{INFO.main.email}
							</a>
							&nbsp;or send a quick note below. I&apos;ll reply
							when I&apos;ve had time to read it properly.
						</div>

						<form
							name="interest"
							method="POST"
							action="/thank-you/"
							data-netlify="true"
							netlify-honeypot="bot-field"
							className="interest-form"
						>
							<input
								type="hidden"
								name="form-name"
								value="interest"
							/>
							<p className="form-hidden">
								<label>
									Don&apos;t fill this out if you&apos;re
									human:
									<input name="bot-field" />
								</label>
							</p>

							<div className="interest-form-header">
								<div className="section-label">
									Interest Form
								</div>
								<p>
									Share a little context and I&apos;ll follow
									up by email.
								</p>
							</div>

							<div className="form-grid">
								<label className="form-field">
									<span>Name</span>
									<input
										type="text"
										name="name"
										autoComplete="name"
										required
									/>
								</label>

								<label className="form-field">
									<span>Email</span>
									<input
										type="email"
										name="email"
										autoComplete="email"
										required
									/>
								</label>

								<label className="form-field">
									<span>Interest</span>
									<select
										name="interestType"
										required
										defaultValue=""
									>
										<option value="" disabled>
											Select one
										</option>
										<option value="collaboration">
											Collaboration
										</option>
										<option value="consulting">
											Consulting
										</option>
										<option value="startup">
											Startup / product idea
										</option>
										<option value="speaking">
											Speaking / writing
										</option>
										<option value="mentorship">
											Mentorship
										</option>
										<option value="other">Other</option>
									</select>
								</label>

								<label className="form-field">
									<span>Timeline</span>
									<select name="timeline" defaultValue="">
										<option value="">Flexible</option>
										<option value="now">Now</option>
										<option value="1-3-months">
											1-3 months
										</option>
										<option value="later">Later</option>
									</select>
								</label>
							</div>

							<label className="form-field form-field-full">
								<span>Message</span>
								<textarea
									name="message"
									rows="6"
									placeholder="What are you building, hiring for, or curious about?"
									required
								/>
							</label>

							<button className="form-submit" type="submit">
								Send Signal
							</button>
						</form>
					</div>

					<div className="socials-container">
						<div className="contact-socials">
							<Socials />
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

export default Contact;
