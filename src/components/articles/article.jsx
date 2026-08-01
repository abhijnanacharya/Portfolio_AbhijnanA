import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";


const Article = (props) => {
	const { date, title, description, link, external } = props;

	const articleContent = (
		<div className="article-right-side">
			<div className="article-title">{title}</div>
			<div className="article-description">{description}</div>
			<div className="article-link">
				{external ? "Read on Medium" : "Read Article"}{" "}
				<FontAwesomeIcon
					style={{ fontSize: "10px" }}
					icon={faChevronRight}
				/>
			</div>
		</div>
	);

	return (
		<React.Fragment>
			<div className="article">
				<div className="article-left-side">
					<div className="article-date">{date}</div>
				</div>

				{external ? (
					<a href={link} target="_blank" rel="noreferrer">
						{articleContent}
					</a>
				) : (
					<Link href={link}>{articleContent}</Link>
				)}
			</div>
		</React.Fragment>
	);
};

export default Article;
