import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import CTAButton from "./CTAButton";
import INFO from "../../data/user";
import StatusTicker from "./StatusTicker";
import "./styles/navBar.css";

const NavBar = (props) => {
	const { active, showTicker = false } = props;
	const links = [
		{ id: "home", label: "Home", to: "/" },
		{ id: "about", label: "About", to: "/about" },
		{ id: "projects", label: "Projects", to: "/projects" },
		{ id: "contact", label: "Contact", to: "/contact" },
	];

	return (
		<header className="site-header">
			<nav className="navbar" aria-label="Primary navigation">
				<Link to="/" className="nav-logo" aria-label="Go to homepage">
					<span className="nav-logo-mark">AA</span>
					<span className="nav-logo-text">{INFO.main.name}</span>
				</Link>

				<ul className="nav-list">
					{links.map((link) => (
						<li
							className={
								active === link.id ? "nav-item active" : "nav-item"
							}
							key={link.id}
						>
							<Link to={link.to}>{link.label}</Link>
						</li>
					))}
				</ul>

				<div className="nav-actions">
					<a
						className="nav-action-secondary"
						href={INFO.socials.github}
						target="_blank"
						rel="noreferrer"
					>
						<span>GitHub</span>
						<FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" />
					</a>
					<CTAButton to="/contact" className="nav-cta">
						Hire Me
					</CTAButton>
				</div>
			</nav>
			{showTicker && <StatusTicker />}
		</header>
	);
};

export default NavBar;
