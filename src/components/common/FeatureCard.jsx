import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const FeatureCard = ({ icon, label, title, children, tone = "yellow" }) => {
	return (
		<section className={`feature-card feature-card-${tone}`}>
			<div className="feature-card-label">
				{icon && <FontAwesomeIcon icon={icon} aria-hidden="true" />}
				<span>{label}</span>
			</div>
			<h2>{title}</h2>
			<div className="feature-card-body">{children}</div>
		</section>
	);
};

export default FeatureCard;
