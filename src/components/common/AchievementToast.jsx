import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "./styles/achievementToast.css";

const AchievementToast = ({
	title = "Achievement unlocked",
	message,
	onDismiss,
	duration = 4000,
}) => {
	const [isLeaving, setIsLeaving] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLeaving(true);
		}, duration);

		return () => clearTimeout(timer);
	}, [duration]);

	useEffect(() => {
		if (!isLeaving) {
			return;
		}

		const timer = setTimeout(() => {
			onDismiss();
		}, 220);

		return () => clearTimeout(timer);
	}, [isLeaving, onDismiss]);

	return (
		<div
			className={
				isLeaving
					? "achievement-toast achievement-toast-leaving"
					: "achievement-toast"
			}
			role="status"
			aria-live="polite"
		>
			<div className="achievement-toast-art" aria-hidden="true">
				<img src="/achievement-unlocked.svg" alt="" />
			</div>

			<div className="achievement-toast-copy">
				<div className="achievement-toast-title">{title}</div>
				<div className="achievement-toast-message">{message}</div>
			</div>

			<button
				className="achievement-toast-close"
				type="button"
				aria-label="Dismiss achievement"
				onClick={() => setIsLeaving(true)}
			>
				<FontAwesomeIcon icon={faXmark} aria-hidden="true" />
			</button>
		</div>
	);
};

export default AchievementToast;
