import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work and Internship"
				body={
					<div className="works-body">
						<div className="work">
							<img
								src="../skill-lync.png"
								alt="skill-lync"
								className="work-image"
							/>
							<div className="work-title">Skill-Lync</div>
							<div className="work-subtitle">
								Full-Stack Software Engineer
							</div>
							<div className="work-duration">2022 - 2023</div>
						</div>

						<div className="work">
							<img
								src="https://assets-global.website-files.com/626fcecbc824dd1c670451ba/6270fa6368d39cdf2366f5e7_logo-grey.svg"
								alt="Nova-Benefits"
								className="work-image"
							/>
							<div className="work-title">Nova-Benefits</div>
							<div className="work-subtitle">
								Software Engineer
							</div>
							<div className="work-duration">2021 - 2022</div>
						</div>

						<div className="work">
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png"
								alt="amazn"
								className="work-image"
							/>
							<div className="work-title">Amazon</div>
							<div className="work-subtitle">
								Machine Learning Intern
							</div>
							<div className="work-duration">
								Jan 2022 - Jul 2022
							</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
