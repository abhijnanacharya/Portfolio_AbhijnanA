import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles/sticker.css";

const Sticker = ({
	children,
	icon,
	tone = "yellow",
	className = "",
	style,
	"aria-hidden": ariaHidden,
}) => {
	return (
		<div
			className={`sticker sticker-${tone} ${className}`.trim()}
			style={style}
			aria-hidden={ariaHidden}
		>
			{icon && <FontAwesomeIcon icon={icon} aria-hidden="true" />}
			{children && <span>{children}</span>}
		</div>
	);
};

export default Sticker;
