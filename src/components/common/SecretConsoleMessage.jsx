import React, { useEffect, useState } from "react";

import AchievementToast from "./AchievementToast";

const SECRET_CONSOLE_UNLOCK_KEY = "portfolio-secret-console-unlocked";

const SecretConsoleMessage = () => {
	const [showAchievement, setShowAchievement] = useState(false);

	useEffect(() => {
		const styles = [
			"background:#111111",
			"color:#FFD84D",
			"font-size:16px",
			"font-weight:900",
			"padding:8px 10px",
			"border:3px solid #FFD84D",
		].join(";");
		const subStyles = [
			"background:#F7F4EA",
			"color:#111111",
			"font-size:12px",
			"font-weight:800",
			"padding:6px 10px",
			"border:2px solid #111111",
		].join(";");

		console.log("%cPORTFOLIO DEBUG PORT OPEN", styles);
		console.log(
			"%cRun window.portfolio.unlock() to claim the hidden console achievement.",
			subStyles
		);
		console.log(
			"%cBonus: window.portfolio.terminal(), window.portfolio.palette(), window.portfolio.stack()",
			subStyles
		);

		window.portfolio = {
			unlock: () => {
				localStorage.setItem(SECRET_CONSOLE_UNLOCK_KEY, "true");
				setShowAchievement(true);
				window.dispatchEvent(new Event("portfolio:open-command-palette"));
				return "ACHIEVEMENT_UNLOCKED: CONSOLE OPERATIONS";
			},
			terminal: () => {
				window.dispatchEvent(new Event("portfolio:open-terminal"));
				return "opening developer terminal";
			},
			palette: () => {
				window.dispatchEvent(new Event("portfolio:open-command-palette"));
				return "opening command palette";
			},
			stack: () => ({
				frontend: ["React", "Next.js", "CSS"],
				backend: ["Node.js", "Python", "Java"],
				infra: ["Kubernetes", "Docker", "cloud-native systems"],
				ai: ["agent workflows", "RAG", "automation"],
			}),
		};

		return () => {
			delete window.portfolio;
		};
	}, []);

	return (
		<React.Fragment>
			{showAchievement && (
				<AchievementToast
					title="Hidden achievement unlocked"
					message="Console operations"
					onDismiss={() => setShowAchievement(false)}
					duration={5200}
				/>
			)}
		</React.Fragment>
	);
};

export default SecretConsoleMessage;
