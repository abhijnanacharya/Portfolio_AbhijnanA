import React from "react";


const tickerItems = [
	"SYSTEMS BUILDER",
	"AI WORKFLOWS",
	"BACKEND / CLOUD",
	"REACT / NODE / PYTHON",
	"K8S READY",
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
