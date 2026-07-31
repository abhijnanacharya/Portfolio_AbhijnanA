import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import AchievementToast from "../components/common/AchievementToast";
import AllProjects from "../components/projects/allProjects";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/projects.css";

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
			<Helmet>
				<title>{`Projects | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

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
							Crafting ripples in the cosmos, here are the
							artifacts of my journey.
						</div>

						<div className="subtitle projects-subtitle">
							Venturing into a vibrant mix of projects has been an
							exhilarating ride, and I'm beaming with pride at the
							strides we've made. Among the many adventures,
							there's a collection of open-source gems, inviting
							curious minds to dive in and contribute their flair.
							Your creativity and ideas for spicing things up are
							not just welcomed but eagerly encouraged. Let's
							embark on this collaborative journey of perpetual
							learning and growth together. It's not just about
							the code; it's about building something awesome and
							having a blast while doing it. Join the fun, and
							let's create something extraordinary!
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
