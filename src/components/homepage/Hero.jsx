import React from "react";
import {
	faCodeBranch,
	faEnvelopeOpenText,
	faRobot,
	faTerminal,
} from "@fortawesome/free-solid-svg-icons";

import CTAButton from "../common/CTAButton";
import Sticker from "../common/Sticker";
import INFO from "../../data/user";

import "./styles/hero.css";

const Hero = () => {
	return (
		<section className="hero-section" aria-labelledby="hero-title">
			<div className="hero-decor hero-decor-left" aria-hidden="true">
				<Sticker tone="purple" icon={faTerminal}>
					SHIP MODE
				</Sticker>
				<Sticker tone="blue" className="hero-mini-sticker">
					API FIRST
				</Sticker>
			</div>

			<div className="hero-copy">
				<div className="hero-eyebrow">SOFTWARE ENGINEER · MICROSOFT XBOX ADS</div>
				<h1 id="hero-title" className="hero-title">
					<span>BUILDING ADS,</span>
					<span>PRODUCT SYSTEMS</span>
					<span>
						<span className="hero-highlight">& AI</span> THAT SCALE.
					</span>
				</h1>
				<p className="hero-description">{INFO.homepage.description}</p>
				<div className="hero-actions" aria-label="Primary actions">
					<CTAButton to="/projects">View Projects</CTAButton>
					<CTAButton to="/contact" variant="secondary" icon={faEnvelopeOpenText}>
						Contact Me
					</CTAButton>
				</div>
			</div>

			<div className="hero-decor hero-decor-right" aria-hidden="true">
				<Sticker tone="coral" icon={faRobot}>
					XBOX ADS
				</Sticker>
				<Sticker tone="yellow" icon={faCodeBranch} className="hero-mini-sticker">
					CLEAN DAGs
				</Sticker>
			</div>
		</section>
	);
};

export default Hero;
