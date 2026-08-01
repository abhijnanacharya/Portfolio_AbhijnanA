import { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import { TRACKING_ID } from "../data/tracking";
import MobileQuickActions from "../components/common/MobileQuickActions";

const CommandPalette = dynamic(
	() => import("../components/common/CommandPalette"),
	{ ssr: false },
);
const SecretConsoleMessage = dynamic(
	() => import("../components/common/SecretConsoleMessage"),
	{ ssr: false },
);
const TerminalOverlay = dynamic(
	() => import("../components/common/TerminalOverlay"),
	{ ssr: false },
);

import "../index.css";
import "../app.css";
import "./styles/about.css";
import "./styles/articles.css";
import "./styles/contact.css";
import "./styles/homepage.css";
import "./styles/projects.css";
import "./styles/readArticle.css";
import "./styles/404.css";
import "../components/about/styles/socials.css";
import "../components/articles/style/article.css";
import "../components/common/styles/achievementToast.css";
import "../components/common/styles/card.css";
import "../components/common/styles/commandPalette.css";
import "../components/common/styles/ctaButton.css";
import "../components/common/styles/featureCard.css";
import "../components/common/styles/footer.css";
import "../components/common/styles/logo.css";
import "../components/common/styles/mobileQuickActions.css";
import "../components/common/styles/navBar.css";
import "../components/common/styles/statusTicker.css";
import "../components/common/styles/sticker.css";
import "../components/common/styles/terminalOverlay.css";
import "../components/homepage/styles/article.css";
import "../components/homepage/styles/hero.css";
import "../components/homepage/styles/works.css";
import "../components/projects/styles/allProjects.css";
import "../components/projects/styles/project.css";

const App = ({ Component, pageProps }) => {
	useEffect(() => {
		if (TRACKING_ID !== "") {
			import("react-ga4").then(({ default: ReactGA }) => {
				ReactGA.initialize(TRACKING_ID);
			});
		}

		if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
			import("posthog-js").then(({ default: posthog }) => {
				posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
					api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
					autocapture: true,
					capture_pageview: true,
				});
			});
		}
	}, []);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<CommandPalette />
			<SecretConsoleMessage />
			<TerminalOverlay />
			<MobileQuickActions />
			<Component {...pageProps} />
		</>
	);
};

export default App;
