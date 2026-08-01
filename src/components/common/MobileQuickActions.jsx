import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import quickActions from "../../data/quickActions.json";

const iconMap = {
	email: faEnvelope,
	resume: faFileLines,
	linkedin: faLinkedin,
	github: faGithub,
};

const MobileQuickActions = () => {
	const enabledActions = quickActions.filter((action) => action.enabled);

	if (enabledActions.length === 0) {
		return null;
	}

	return (
		<nav className="mobile-quick-actions" aria-label="Recruiter quick actions">
			{enabledActions.map((action) => {
				const isExternal = action.href.startsWith("http");
				const icon = iconMap[action.icon] || faFileLines;

				return (
					<a
						className="mobile-quick-action"
						href={action.href}
						key={action.id}
						target={isExternal ? "_blank" : undefined}
						rel={isExternal ? "noreferrer" : undefined}
					>
						<FontAwesomeIcon icon={icon} aria-hidden="true" />
						<span>{action.label}</span>
					</a>
				);
			})}
		</nav>
	);
};

export default MobileQuickActions;
