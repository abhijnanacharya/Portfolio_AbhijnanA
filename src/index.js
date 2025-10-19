import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

posthog.init(process.env.REACT_APP_POSTHOG_KEY, {
	api_host: process.env.REACT_APP_POSTHOG_HOST,
	autocapture: true,
	capture_pageview: true,
	// persistence: 'localStorage', // 'cookie' | 'memory'
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<PostHogProvider client={posthog}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</PostHogProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
