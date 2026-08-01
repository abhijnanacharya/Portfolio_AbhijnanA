import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAddressCard,
	faArrowUpRightFromSquare,
	faCode,
	faEnvelope,
	faFileLines,
	faHouse,
	faLayerGroup,
	faMagnifyingGlass,
	faMap,
	faNewspaper,
	faTerminal,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import INFO from "../../data/user";
import { lockBodyScroll } from "../../utils/bodyScrollLock";

const normalize = (value) => value.toLowerCase().trim();

const CommandPalette = () => {
	const router = useRouter();
	const inputRef = useRef(null);
	const commandRefs = useRef([]);
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [activeIndex, setActiveIndex] = useState(0);
	const [notice, setNotice] = useState("");

	const commands = useMemo(
		() => [
			{
				id: "home",
				label: "Go Home",
				description: "Return to the main surface",
				group: "Navigation",
				icon: faHouse,
				keywords: "index landing hero",
				run: () => router.push("/"),
			},
			{
				id: "projects",
				label: "Open Projects",
				description: "View proof of build",
				group: "Navigation",
				icon: faLayerGroup,
				keywords: "portfolio work build log",
				run: () => router.push("/projects"),
			},
			{
				id: "articles",
				label: "Open Articles",
				description: "Read engineering notes",
				group: "Navigation",
				icon: faNewspaper,
				keywords: "blog writing cms posts",
				run: () => router.push("/articles"),
			},
			{
				id: "about",
				label: "Open About",
				description: "View profile",
				group: "Navigation",
				icon: faAddressCard,
				keywords: "bio experience profile",
				run: () => router.push("/about"),
			},
			{
				id: "contact",
				label: "Open Contact",
				description: "Start the conversation",
				group: "Navigation",
				icon: faEnvelope,
				keywords: "hire email form interest",
				run: () => router.push("/contact"),
			},
			{
				id: "copy-email",
				label: "Copy Email",
				description: INFO.main.email,
				group: "Actions",
				icon: faFileLines,
				keywords: "mail clipboard contact",
				run: async () => {
					if (navigator.clipboard) {
						await navigator.clipboard.writeText(INFO.main.email);
					}
					setNotice("Email copied to clipboard");
				},
			},
			{
				id: "terminal",
				label: "Open Terminal",
				description: "Launch portfolio shell",
				group: "Actions",
				icon: faTerminal,
				keywords: "shell console backtick tilde easter egg",
				run: () => {
					window.dispatchEvent(new Event("portfolio:open-terminal"));
				},
			},
			{
				id: "github",
				label: "Open GitHub",
				description: "View source and repositories",
				group: "External",
				icon: faGithub,
				keywords: "code repo source",
				run: () => window.open(INFO.socials.github, "_blank", "noreferrer"),
			},
			{
				id: "linkedin",
				label: "Open LinkedIn",
				description: "Open professional profile",
				group: "External",
				icon: faLinkedin,
				keywords: "social profile career",
				run: () => window.open(INFO.socials.linkedin, "_blank", "noreferrer"),
			},
			{
				id: "sitemap",
				label: "View Sitemap",
				description: "Open the static sitemap XML",
				group: "System",
				icon: faMap,
				keywords: "seo routes crawler xml",
				run: () => window.open("/sitemap.xml", "_blank", "noreferrer"),
			},
		],
		[router]
	);

	const filteredCommands = useMemo(() => {
		const normalizedQuery = normalize(query);

		if (!normalizedQuery) {
			return commands;
		}

		return commands.filter((command) => {
			const searchable = normalize(
				`${command.label} ${command.description} ${command.group} ${command.keywords}`
			);

			return searchable.includes(normalizedQuery);
		});
	}, [commands, query]);

	useEffect(() => {
		const handleOpenCommandPalette = () => setIsOpen(true);
		const handleKeyDown = (event) => {
			const isMacShortcut = event.metaKey && event.key.toLowerCase() === "k";
			const isWindowsShortcut = event.ctrlKey && event.key.toLowerCase() === "k";

			if (isMacShortcut || isWindowsShortcut) {
				event.preventDefault();
				setIsOpen((currentValue) => !currentValue);
			}
		};

		window.addEventListener(
			"portfolio:open-command-palette",
			handleOpenCommandPalette
		);
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener(
				"portfolio:open-command-palette",
				handleOpenCommandPalette
			);
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	useEffect(() => {
		if (!isOpen) {
			return undefined;
		}

		const unlockBodyScroll = lockBodyScroll();
		window.setTimeout(() => inputRef.current?.focus(), 0);

		return unlockBodyScroll;
	}, [isOpen]);

	useEffect(() => {
		setActiveIndex(0);
	}, [query]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		commandRefs.current[activeIndex]?.scrollIntoView({
			block: "nearest",
		});
	}, [activeIndex, isOpen, filteredCommands]);

	useEffect(() => {
		if (!notice) {
			return undefined;
		}

		const timeout = window.setTimeout(() => setNotice(""), 2400);

		return () => window.clearTimeout(timeout);
	}, [notice]);

	const closePalette = () => {
		setIsOpen(false);
		setQuery("");
		setActiveIndex(0);
	};

	const runCommand = async (command) => {
		if (!command) {
			return;
		}

		await command.run();
		closePalette();
	};

	const handlePaletteKeyDown = (event) => {
		if (event.key === "Escape") {
			event.preventDefault();
			closePalette();
			return;
		}

		if (event.key === "ArrowDown") {
			event.preventDefault();
			if (filteredCommands.length === 0) {
				return;
			}
			setActiveIndex((currentIndex) =>
				Math.min(currentIndex + 1, filteredCommands.length - 1)
			);
			return;
		}

		if (event.key === "ArrowUp") {
			event.preventDefault();
			if (filteredCommands.length === 0) {
				return;
			}
			setActiveIndex((currentIndex) => Math.max(currentIndex - 1, 0));
			return;
		}

		if (event.key === "Enter") {
			event.preventDefault();
			runCommand(filteredCommands[activeIndex]);
		}
	};

	return (
		<React.Fragment>
			<button
				className="command-palette-trigger"
				type="button"
				aria-label="Open command palette"
				onClick={() => setIsOpen(true)}
			>
				<FontAwesomeIcon icon={faTerminal} aria-hidden="true" />
				<span>CMD</span>
				<kbd>K</kbd>
			</button>

			{isOpen && (
				<div className="command-palette-layer" onKeyDown={handlePaletteKeyDown}>
					<button
						className="command-palette-backdrop"
						type="button"
						aria-label="Close command palette"
						onClick={closePalette}
					/>
					<section
						className="command-palette"
						role="dialog"
						aria-modal="true"
						aria-labelledby="command-palette-title"
					>
						<div className="command-palette-header">
							<div>
								<p className="command-palette-kicker">Operator console</p>
								<h2 id="command-palette-title">Command Palette</h2>
							</div>
							<button
								className="command-palette-close"
								type="button"
								aria-label="Close command palette"
								onClick={closePalette}
							>
								<FontAwesomeIcon icon={faXmark} aria-hidden="true" />
							</button>
						</div>

						<label className="command-palette-search">
							<FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
							<span className="sr-only">Search commands</span>
							<input
								ref={inputRef}
								type="text"
								value={query}
								placeholder="Type a command or route..."
								onChange={(event) => setQuery(event.target.value)}
								aria-controls="command-palette-results"
								aria-activedescendant={
									filteredCommands[activeIndex]
										? `command-${filteredCommands[activeIndex].id}`
										: undefined
								}
							/>
						</label>

						<div
							className="command-palette-results"
							id="command-palette-results"
							role="listbox"
							aria-label="Available commands"
						>
							{filteredCommands.length > 0 ? (
								filteredCommands.map((command, index) => (
									<button
										ref={(element) => {
											commandRefs.current[index] = element;
										}}
										className={
											index === activeIndex
												? "command-palette-item is-active"
												: "command-palette-item"
										}
										id={`command-${command.id}`}
										key={command.id}
										type="button"
										role="option"
										aria-selected={index === activeIndex}
										onMouseEnter={() => setActiveIndex(index)}
										onClick={() => runCommand(command)}
									>
										<span className="command-palette-icon">
											<FontAwesomeIcon icon={command.icon} aria-hidden="true" />
										</span>
										<span className="command-palette-copy">
											<strong>{command.label}</strong>
											<span>{command.description}</span>
										</span>
										<span className="command-palette-group">
											{command.group}
											{command.group === "External" && (
												<FontAwesomeIcon
													icon={faArrowUpRightFromSquare}
													aria-hidden="true"
												/>
											)}
										</span>
									</button>
								))
							) : (
								<div className="command-palette-empty" role="status">
									<FontAwesomeIcon icon={faCode} aria-hidden="true" />
									<span>No matching command found.</span>
								</div>
							)}
						</div>

						<div className="command-palette-footer">
							<span>
								<kbd>Enter</kbd> run
							</span>
							<span>
								<kbd>Esc</kbd> close
							</span>
							<span>
								<kbd>↑</kbd>
								<kbd>↓</kbd> move
							</span>
						</div>
					</section>
				</div>
			)}

			{notice && (
				<div className="command-palette-notice" role="status">
					{notice}
				</div>
			)}
		</React.Fragment>
	);
};

export default CommandPalette;
