import React from "react";

import "./styles/statusTicker.css";

const tickerItems = [
	"SYSTEMS ONLINE",
	"AI WORKFLOWS",
	"REACT / JAVA / NODE / PYTHON",
	"K8S READY",
	"OPEN TO BUILD",
	"SF BASED",
];

const StatusTicker = () => {
	const groups = Array.from({ length: 4 }, (_, index) => index);

	return (
		<div className="status-ticker" aria-label="Site status highlights">
			<div className="status-ticker-track">
				{groups.map((groupIndex) => (
					<div
						className="status-ticker-group"
						aria-hidden={groupIndex === 0 ? undefined : "true"}
						key={groupIndex}
					>
						{tickerItems.map((item) => (
							<span
								className="status-ticker-item"
								key={`${groupIndex}-${item}`}
							>
								<span className="status-dot" aria-hidden="true" />
								{item}
							</span>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default StatusTicker;
