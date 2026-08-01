import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import NavBar from "../components/common/navBar";
import CTAButton from "../components/common/CTAButton";

import INFO from "../data/user";

const Notfound = () => {
	const router = useRouter();
	const requestedPath = router.asPath || "unresolved-url";
	const terminalLines = useMemo(
		() => [
			{ tone: "muted", text: "$ npm run resolve-route" },
			{ tone: "ok", text: "boot: loading static route manifest" },
			{ tone: "ok", text: "scan: / /about /projects /contact /articles" },
			{ tone: "warn", text: `request: GET ${requestedPath}` },
			{ tone: "error", text: "error: ROUTE_NOT_FOUND" },
			{
				tone: "trace",
				text: "at RouteResolver.match(static-export/routes)",
			},
			{ tone: "trace", text: "at PortfolioRuntime.rollback(/404)" },
			{ tone: "ok", text: "fallback: render debugger" },
			{ tone: "muted", text: "status: ready for rollback" },
		],
		[requestedPath],
	);
	const [visibleLineCount, setVisibleLineCount] = useState(0);

	useEffect(() => {
		document.title = `404 | ${INFO.main.title}`;
	}, []);

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (prefersReducedMotion) {
			setVisibleLineCount(terminalLines.length);
			return undefined;
		}

		setVisibleLineCount(0);
		const interval = window.setInterval(() => {
			setVisibleLineCount((currentCount) => {
				if (currentCount >= terminalLines.length) {
					window.clearInterval(interval);
					return currentCount;
				}

				return currentCount + 1;
			});
		}, 420);

		return () => window.clearInterval(interval);
	}, [terminalLines]);

	const visibleLines = terminalLines.slice(0, visibleLineCount);
	const isRollbackReady = visibleLineCount >= terminalLines.length;
	const suggestedRoutes = [
		{ label: "Home", to: "/" },
		{ label: "Projects", to: "/projects" },
		{ label: "About", to: "/about" },
		{ label: "Contact", to: "/contact" },
	];

	return (
		<React.Fragment>
			<Head>
				<title>{`404 | ${INFO.main.title}`}</title>
			</Head>
			<div className="not-found page-content">
				<NavBar />
				<main className="notfound-container content-wrapper">
					<section
						className="notfound-terminal"
						aria-labelledby="notfound-title"
					>
						<div
							className="notfound-terminal-topbar"
							aria-hidden="true"
						>
							<span className="terminal-control terminal-control-coral" />
							<span className="terminal-control terminal-control-yellow" />
							<span className="terminal-control terminal-control-purple" />
							<span className="terminal-window-label">
								portfolio-runtime.log
							</span>
						</div>

						<div className="notfound-terminal-body">
							<div className="notfound-kicker">
								Static export debugger
							</div>
							<h1 id="notfound-title" className="notfound-title">
								<span>404</span>
								<span className="notfound-title-badge">
									ROUTE_NOT_FOUND
								</span>
							</h1>
							<p className="not-found-message">
								This URL missed the route manifest. The build is
								stable, but this path needs a rollback to a
								known page.
							</p>

							<div
								className="terminal-output"
								aria-live="polite"
								aria-label="Route debugger output"
							>
								{visibleLines.map((line, index) => (
									<div
										className={`terminal-line terminal-line-${line.tone}`}
										key={`${line.text}-${index}`}
									>
										<span className="terminal-line-number">
											{String(index + 1).padStart(2, "0")}
										</span>
										<code>{line.text}</code>
									</div>
								))}
								{!isRollbackReady && (
									<div className="terminal-line terminal-line-cursor">
										<span className="terminal-line-number">
											{String(
												visibleLineCount + 1,
											).padStart(2, "0")}
										</span>
										<code>resolving...</code>
									</div>
								)}
							</div>

							<div
								className="notfound-suggestions"
								aria-label="Suggested routes"
							>
								<span className="notfound-suggestions-label">
									try:
								</span>
								{suggestedRoutes.map((route) => (
									<Link
										href={route.to}
										className="notfound-route-chip"
										key={route.to}
									>
										{route.label}
									</Link>
								))}
							</div>

							<div
								className={
									isRollbackReady
										? "notfound-actions is-visible"
										: "notfound-actions"
								}
								aria-hidden={!isRollbackReady}
							>
								<CTAButton
									to="/"
									className="not-found-link"
									tabIndex={isRollbackReady ? 0 : -1}
								>
									Roll Back To Home
								</CTAButton>
							</div>
						</div>
					</section>
				</main>
			</div>
		</React.Fragment>
	);
};

export default Notfound;
