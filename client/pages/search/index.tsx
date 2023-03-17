import { WrappedData, ElementKind, ArticleData } from "../../types/types";
import { Header } from "../../components/Header";
import ArticleElement from "../../components/ArticleElement";
import { GetServerSideProps } from "next";
import { searchArticles } from "../api/search";
import Stack from "@mui/material/Stack";
import { footerImage } from "../../components/Footer";
import { PageInfo } from "../../components/PageInfo";

type Data = {
	query: string | string[];
	data: ArticleData[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const q = context.query.q!;
	const result = await searchArticles(q);
	return { props: { query: q, data: result } };
};

export default function Searched(props: Data) {
	const wrapped: WrappedData[] = props.data.map((x) => ({
		visible: true,
		data: x,
	}))!;

	return (
		<>
			<Header />
			<Stack className="articles-list" spacing={5}>
				{PageInfo(`QUERY: ${props.query} | RESULTS: ${props.data.length}`)}
				{wrapped.map((e, index) => {
					return (
						<ArticleElement
							key={`searched-element${{ index }}`}
							element={e}
							kind={ElementKind.Searched}
						/>
					);
				})}
				<footer>{footerImage()}</footer>
			</Stack>
		</>
	);
}
