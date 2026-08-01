import React from "react";

const mediumArticleUrl =
	"https://medium.com/@abhijnanacharya11/building-a-quorum-based-replication-system-in-java-a-deep-dive-d4bb88b690b2";

function quorumReplicationArticle() {
	return {
		date: "Oct 4, 2025",
		title:
			"Quorum Replication in Java",
		description:
			"A hands-on Java simulation of quorum writes, replica coordination, timeouts, concurrent writes, and consistency tradeoffs.",
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
						A practical walkthrough of quorum-based replication in
						Java, covering write quorums, timeouts, replica failures,
						and concurrent writes.
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
