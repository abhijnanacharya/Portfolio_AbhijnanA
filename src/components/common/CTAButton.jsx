import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import "./styles/ctaButton.css";

const CTAButton = ({
	to,
	href,
	children,
	variant = "primary",
	icon,
	className = "",
	...rest
}) => {
	const classes = `cta-button cta-button-${variant} ${className}`.trim();
	const content = (
		<React.Fragment>
			<span>{children}</span>
			<FontAwesomeIcon icon={icon || faArrowRight} aria-hidden="true" />
		</React.Fragment>
	);

	if (to) {
		return (
			<Link to={to} className={classes} {...rest}>
				{content}
			</Link>
		);
	}

	return (
		<a href={href} className={classes} {...rest}>
			{content}
		</a>
	);
};

export default CTAButton;
