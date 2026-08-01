let activeLockCount = 0;
let originalBodyOverflow = "";
let originalHtmlOverflow = "";

export const lockBodyScroll = () => {
	if (typeof document === "undefined") {
		return () => {};
	}

	if (activeLockCount === 0) {
		originalBodyOverflow = document.body.style.overflow;
		originalHtmlOverflow = document.documentElement.style.overflow;
		document.body.style.overflow = "hidden";
		document.documentElement.style.overflow = "hidden";
	}

	activeLockCount += 1;

	let isUnlocked = false;

	return () => {
		if (isUnlocked) {
			return;
		}

		isUnlocked = true;
		activeLockCount = Math.max(0, activeLockCount - 1);

		if (activeLockCount === 0) {
			document.body.style.overflow = originalBodyOverflow;
			document.documentElement.style.overflow = originalHtmlOverflow;
		}
	};
};
