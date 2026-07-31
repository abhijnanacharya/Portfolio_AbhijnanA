import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";

import NavBar from "../../components/common/navBar";
import Footer from "../../components/common/footer";
import Logo from "../../components/common/logo";

import INFO from "../../data/user";
import myArticles from "../../data/articles";


let ArticleStyle = styled.div``;

const ReadArticle = ({ slug }) => {
	const router = useRouter();
	const article = myArticles[slug - 1];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [article]);

	ArticleStyle = styled.div`
		${article ? article().style : ""}
	`;

	if (!article) {
		return null;
	}

	return (
		<React.Fragment>
			<Head>
				<title>{`${article().title} | ${INFO.main.title}`}</title>
				<meta name="description" content={article().description} />
				<meta name="keywords" content={article().keywords.join(", ")} />
			</Head>

			<div className="page-content">
				<NavBar />

				<div className="content-wrapper">
					<div className="read-article-logo-container">
						<div className="read-article-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="read-article-container">
						<div className="read-article-back">
							<img
								src="/back-button.png"
								alt="back"
								className="read-article-back-button"
								onClick={() => router.back()}
							/>
						</div>

						<div className="read-article-wrapper">
							<div className="read-article-date-container">
								<div className="read-article-date">
									{article().date}
								</div>
							</div>

							<div className="title read-article-title">
								{article().title}
							</div>

							<div className="read-article-body">
								<ArticleStyle>{article().body}</ArticleStyle>
							</div>
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

export const getStaticPaths = () => {
	return {
		paths: myArticles.map((_, index) => ({
			params: { slug: (index + 1).toString() },
		})),
		fallback: false,
	};
};

export const getStaticProps = ({ params }) => {
	return {
		props: {
			slug: Number(params.slug),
		},
	};
};

export default ReadArticle;
