import React from "react";

const mediumArticleUrl =
	"https://medium.com/@abhijnanacharya11/building-a-quorum-based-replication-system-in-java-a-deep-dive-d4bb88b690b2";

function quorumReplicationArticle() {
	return {
		date: "Oct 4, 2025",
		title:
			"Building a Quorum-Based Replication System in Java: A Hands-On Simulation",
		description:
			"A practical deep dive into quorum writes, replica coordination, timeouts, concurrent writes, and consistency tradeoffs in a Java key-value store simulation.",
		link: mediumArticleUrl,
		external: true,
		keywords: [
			"Quorum Based Replication",
			"Distributed Systems",
			"Java",
			"Consistency",
			"Abhijnan Acharya",
		],
		style: `
			.article-content {
				display: flex;
				flex-direction: column;
				gap: 18px;
			}

			.article-content a {
				color: var(--link-color);
				font-weight: 700;
				text-decoration: none;
			}
		`,
		body: (
			<React.Fragment>
				<div className="article-content">
					<div className="paragraph">
						This article is published on Medium. It walks through a
						Java simulation of quorum-based replication, including
						write quorum behavior, timeout handling, replica
						failures, and concurrent write execution.
					</div>
					<a
						href={mediumArticleUrl}
						target="_blank"
						rel="noreferrer"
					>
						Read the full article on Medium
					</a>
				</div>
			</React.Fragment>
		),
	};
}

const myArticles = [quorumReplicationArticle];

export default myArticles;
