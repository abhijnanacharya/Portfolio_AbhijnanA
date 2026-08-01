import React, { useEffect, useState } from "react";
import Head from "next/head";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import AchievementToast from "../components/common/AchievementToast";
import AllProjects from "../components/projects/allProjects";

import INFO from "../data/user";
import SEO from "../data/seo";


const PROJECTS_ACHIEVEMENT_KEY = "portfolio-projects-achievement-seen";

const Projects = () => {
	const [showAchievement, setShowAchievement] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (localStorage.getItem(PROJECTS_ACHIEVEMENT_KEY) === "true") {
			return;
		}

		localStorage.setItem(PROJECTS_ACHIEVEMENT_KEY, "true");
		setShowAchievement(true);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "projects");

	return (
		<React.Fragment>
			<Head>
				<title>{`Projects | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Head>

			<div className="page-content">
				<NavBar active="projects" />
				{showAchievement && (
					<AchievementToast
						title="Achievement unlocked"
						message="Inspected the build log"
						onDismiss={() => setShowAchievement(false)}
					/>
				)}
				<div className="content-wrapper">
					<div className="projects-logo-container">
						<div className="projects-logo">
							<Logo width={46} />
						</div>
					</div>
					<div className="projects-container">
						<div className="section-label">Build Log</div>
						<div className="title projects-title">
							Proof of build.
						</div>

						<div className="subtitle projects-subtitle">
							A focused set of systems, AI tools, backend services,
							and algorithmic projects. Each one tests architecture,
							execution, and product judgment.
						</div>

						<div className="projects-list">
							<AllProjects />
						</div>
					</div>
					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Projects;
