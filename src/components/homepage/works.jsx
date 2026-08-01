import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work and Internship"
				body={
					<div className="works-body">
						<div className="work work-wide-logo">
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/960px-Microsoft_logo.svg.png?_=20210729021049"
								alt="MSFT"
								className="work-image work-image-wide"
							/>
							<div className="work-title">Microsoft XBOX</div>
							<div className="work-subtitle">
								Software Engineer
							</div>
							<div className="work-duration">2026 - Present</div>
						</div>

						<div className="work work-wide-logo">
							<img
								src="https://gosachi.com/wp-content/uploads/2024/06/sachi_logo.svg"
								alt="GoSachi"
								className="work-image work-image-wide work-image-gosachi"
							/>
							<div className="work-title">Sachi</div>
							<div className="work-subtitle">
								Founding Software Engineer
							</div>
							<div className="work-duration">2025 - 2026</div>
						</div>

						<div className="work">
							<img
								src="https://sapphirestudios.co/wp-content/uploads/2023/09/cropped-favicon-270x270.png"
								alt="Sapphire Apps"
								className="work-image"
							/>
							<div className="work-title">Sapphire Apps</div>
							<div className="work-subtitle">
								Software Engineer Intern
							</div>
							<div className="work-duration">2024</div>
						</div>

						<div className="work">
							<img
								src="/skill-lync.png"
								alt="skill-lync"
								className="work-image"
							/>
							<div className="work-title">Skill-Lync</div>
							<div className="work-subtitle">
								Full-Stack Software Engineer
							</div>
							<div className="work-duration">2021 - 2023</div>
						</div>

						<div className="work">
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png"
								alt="amazn"
								className="work-image"
							/>
							<div className="work-title">Amazon</div>
							<div className="work-subtitle">
								Software Engineer Intern (C-Ops)
							</div>
							<div className="work-duration">2021</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
