import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal, faXmark } from "@fortawesome/free-solid-svg-icons";

import INFO from "../../data/user";
import { lockBodyScroll } from "../../utils/bodyScrollLock";

const createLine = (text, tone = "default") => ({
	id: `${Date.now()}-${Math.random()}`,
	text,
	tone,
});

const initialLines = [
	createLine("portfolio shell v1.0.0 // static export runtime", "muted"),
	createLine("Type `help` to list commands.", "ok"),
];

const TerminalOverlay = () => {
	const router = useRouter();
	const inputRef = useRef(null);
	const outputRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [lines, setLines] = useState(initialLines);

	const commands = useMemo(
		() => ({
			help: {
				description: "List available terminal commands",
				run: () => [
					createLine("available commands:", "muted"),
					createLine("whoami        print operator profile"),
					createLine("stack         list core technologies"),
					createLine("projects      navigate to /projects"),
					createLine("contact       navigate to /contact"),
					createLine("github        open GitHub"),
					createLine("email         copy email address"),
					createLine("sudo hire-me  open contact form"),
					createLine("clear         clear terminal output"),
				],
			},
			whoami: {
				description: "Print operator profile",
				run: () => [
					createLine(INFO.main.name, "ok"),
					createLine("Software Engineer at Microsoft Xbox Ads"),
					createLine(
						"building backend systems, AI workflows, and product infrastructure",
					),
				],
			},
			stack: {
				description: "List core technologies",
				run: () => [
					createLine("frontend: React, Next.js", "ok"),
					createLine(
						"backend: Node.js, Python, Java",
					),
					createLine(
						"infra: Kubernetes, Docker, cloud systems",
					),
					createLine(
						"ai: agents, RAG, automation",
					),
				],
			},
			projects: {
				description: "Navigate to projects",
				run: () => {
					router.push("/projects");
					return [createLine("routing -> /projects", "ok")];
				},
			},
			contact: {
				description: "Navigate to contact",
				run: () => {
					router.push("/contact");
					return [createLine("routing -> /contact", "ok")];
				},
			},
			github: {
				description: "Open GitHub",
				run: () => {
					window.open(INFO.socials.github, "_blank", "noreferrer");
					return [
						createLine("opening github repository index", "ok"),
					];
				},
			},
			email: {
				description: "Copy email address",
				run: async () => {
					if (navigator.clipboard) {
						await navigator.clipboard.writeText(INFO.main.email);
						return [createLine(`copied ${INFO.main.email}`, "ok")];
					}

					return [
						createLine(INFO.main.email),
						createLine("clipboard unavailable", "warn"),
					];
				},
			},
			"sudo hire-me": {
				description: "Open contact form",
				run: () => {
					router.push("/contact");
					return [
						createLine("[sudo] permission granted", "ok"),
						createLine("routing -> /contact", "ok"),
					];
				},
			},
			clear: {
				description: "Clear terminal output",
				run: () => [],
			},
		}),
		[router],
	);

	useEffect(() => {
		const handleOpenTerminal = () => setIsOpen(true);

		window.addEventListener("portfolio:open-terminal", handleOpenTerminal);

		return () =>
			window.removeEventListener(
				"portfolio:open-terminal",
				handleOpenTerminal,
			);
	}, []);

	useEffect(() => {
		const handleKeyDown = (event) => {
			const target = event.target;
			const isTyping =
				target instanceof HTMLElement &&
				(target.tagName === "INPUT" ||
					target.tagName === "TEXTAREA" ||
					target.isContentEditable);

			if (event.key === "Escape" && isOpen) {
				event.preventDefault();
				setIsOpen(false);
				return;
			}

			if ((event.key === "`" || event.key === "~") && !isTyping) {
				event.preventDefault();
				setIsOpen((currentValue) => !currentValue);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) {
			return undefined;
		}

		const unlockBodyScroll = lockBodyScroll();
		window.setTimeout(() => inputRef.current?.focus(), 0);

		return unlockBodyScroll;
	}, [isOpen]);

	useEffect(() => {
		if (outputRef.current) {
			outputRef.current.scrollTop = outputRef.current.scrollHeight;
		}
	}, [lines, isOpen]);

	const runTerminalCommand = async (rawCommand) => {
		const command = rawCommand.trim().toLowerCase();

		if (!command) {
			return;
		}

		if (command === "clear") {
			setLines([]);
			return;
		}

		const commandConfig = commands[command];
		const promptLine = createLine(`$ ${rawCommand}`, "prompt");

		if (!commandConfig) {
			setLines((currentLines) => [
				...currentLines,
				promptLine,
				createLine(`command not found: ${rawCommand}`, "error"),
				createLine("try `help`", "muted"),
			]);
			return;
		}

		const resultLines = await commandConfig.run();
		setLines((currentLines) => [
			...currentLines,
			promptLine,
			...resultLines,
		]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const command = inputValue;
		setInputValue("");
		await runTerminalCommand(command);
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className="terminal-overlay-layer">
			<button
				className="terminal-overlay-backdrop"
				type="button"
				aria-label="Close terminal overlay"
				onClick={() => setIsOpen(false)}
			/>
			<section
				className="terminal-overlay"
				role="dialog"
				aria-modal="true"
				aria-labelledby="terminal-overlay-title"
			>
				<div className="terminal-overlay-topbar">
					<div className="terminal-overlay-title-group">
						<span className="terminal-overlay-icon">
							<FontAwesomeIcon
								icon={faTerminal}
								aria-hidden="true"
							/>
						</span>
						<div>
							<p>Developer terminal</p>
							<h2 id="terminal-overlay-title">ssh@192.16.5.33</h2>
						</div>
					</div>
					<button
						className="terminal-overlay-close"
						type="button"
						aria-label="Close terminal overlay"
						onClick={() => setIsOpen(false)}
					>
						<FontAwesomeIcon icon={faXmark} aria-hidden="true" />
					</button>
				</div>

				<div
					className="terminal-overlay-output"
					ref={outputRef}
					aria-live="polite"
					aria-label="Terminal output"
				>
					{lines.map((line) => (
						<div
							className={`terminal-overlay-line terminal-overlay-line-${line.tone}`}
							key={line.id}
						>
							<code>{line.text}</code>
						</div>
					))}
				</div>

				<form
					className="terminal-overlay-prompt"
					onSubmit={handleSubmit}
				>
					<label htmlFor="terminal-overlay-command">$</label>
					<input
						id="terminal-overlay-command"
						ref={inputRef}
						type="text"
						value={inputValue}
						autoComplete="off"
						spellCheck="false"
						placeholder="help"
						onChange={(event) => setInputValue(event.target.value)}
					/>
					<button type="submit">Run</button>
				</form>
			</section>
		</div>
	);
};

export default TerminalOverlay;
