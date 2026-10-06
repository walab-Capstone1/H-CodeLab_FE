import React from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import * as S from "../styles";
import type { SampleInput } from "../types";

export interface ProblemPreviewProps {
	title: string;
	description: string;
	inputFormat: string;
	outputFormat: string;
	sampleInputs: SampleInput[];
	/** true면 미리보기에 본문만 표시(입력/출력/예제는 폼에서만 보이게) */
	descriptionOnly?: boolean;
}

// react-markdown v10에서는 'inline' prop이 제거됨.
// Context를 이용해 <pre> 안에 있는 <code>인지(블록) 아닌지(인라인)를 구별합니다.
const InsidePreContext = React.createContext(false);

function MarkdownPre({ children }: { children?: React.ReactNode }) {
	return (
		<InsidePreContext.Provider value={true}>
			<S.PreviewCodeBlock>{children}</S.PreviewCodeBlock>
		</InsidePreContext.Provider>
	);
}

function MarkdownCode({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) {
	const insidePre = React.useContext(InsidePreContext);
	if (insidePre) {
		// 블록 코드 — <pre> 내부의 <code>는 그대로 렌더링 (PreviewCodeBlock이 스타일 담당)
		return <code className={className}>{children}</code>;
	}
	// 인라인 코드
	return <S.PreviewInlineCode>{children}</S.PreviewInlineCode>;
}

const NBSP = "\u00A0"; // non-breaking space

function prepareMarkdown(text: string): string {
	if (!text) return "";
	return text
		.split(/(```[\s\S]*?```)/g)
		.map((part, i) => {
			if (i % 2 === 1) return part; // 코드 블록 내부 → 그대로
			// 마크다운 테이블 행 (| ... |) 보존
			return part
				.split(/((?:^[ \t]*\|[^\n\r]*\|[ \t]*(?:\r?\n|$))+)/gm)
				.map((subPart, j) => {
					if (j % 2 === 1) return subPart; // 테이블 블록 내부 → 그대로
					return subPart
						.replace(/\n{2,}/g, (match) => {
							const extra = match.length - 2;
							if (extra === 0) return "\n\n";
							return "\n\n" + `${NBSP}\n\n`.repeat(extra);
						})
						.replace(/(?<!\n)\n(?!\n)/g, "  \n");
				})
				.join("");
		})
		.join("");
}

const mdComponents: Components = {
	pre: MarkdownPre,
	code: MarkdownCode,
	h1: ({ node: _n, ...props }) => <S.PreviewH1 {...props} />,
	h2: ({ node: _n, ...props }) => <S.PreviewH2 {...props} />,
	h3: ({ node: _n, ...props }) => <S.PreviewH3 {...props} />,
	p:  ({ node: _n, ...props }) => <S.PreviewParagraph {...props} />,
};

const ProblemPreview: React.FC<ProblemPreviewProps> = ({
	title,
	description,
	inputFormat,
	outputFormat,
	sampleInputs,
	descriptionOnly: descriptionOnlyMode = false,
}) => {
	const hasContent =
		description ||
		(!descriptionOnlyMode &&
			(inputFormat ||
				outputFormat ||
				(sampleInputs && sampleInputs.some((s) => s.input || s.output))));

	if (!hasContent) {
		return <S.PreviewEmpty>문제 설명을 입력하세요</S.PreviewEmpty>;
	}

	// 하단 전용 '입력 형식' 필드에 내용이 있을 때만 본문에서 '## 입력 형식' 이하를 분리 (데이터 유실 방지)
	const descOnly =
		inputFormat && description && description.includes("입력 형식")
			? (() => {
					const n = description.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
					const m = n.match(/(\n|^)\s*##\s*입력\s*형식\s*[\n\r]/);
					return m && m.index != null ? n.slice(0, m.index).trim() : description;
				})()
			: description || "";

	return (
		<div>
			{descOnly && (
				<S.PreviewSection>
					<ReactMarkdown
						components={mdComponents}
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeRaw]}
					>
						{prepareMarkdown(descOnly)}
					</ReactMarkdown>
				</S.PreviewSection>
			)}

			{!descriptionOnlyMode && inputFormat && (
				<S.PreviewSection>
					<S.PreviewH2>입력 형식</S.PreviewH2>
					<ReactMarkdown
						components={mdComponents}
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeRaw]}
					>
						{prepareMarkdown(inputFormat)}
					</ReactMarkdown>
				</S.PreviewSection>
			)}

			{!descriptionOnlyMode && outputFormat && (
				<S.PreviewSection>
					<S.PreviewH2>출력 형식</S.PreviewH2>
					<ReactMarkdown
						components={mdComponents}
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeRaw]}
					>
						{prepareMarkdown(outputFormat)}
					</ReactMarkdown>
				</S.PreviewSection>
			)}

			{!descriptionOnlyMode && sampleInputs && sampleInputs.some((s) => s.input || s.output) && (
				<S.PreviewSection>
					<S.PreviewH2>예제</S.PreviewH2>
					{sampleInputs.map((sample, index) => {
						if (!sample.input && !sample.output) return null;
						return (
							<div key={index}>
								{sample.input && (
									<div>
										<S.PreviewH3>예제 입력 {index + 1}</S.PreviewH3>
										<S.PreviewCodeBlock>
											<code>{sample.input}</code>
										</S.PreviewCodeBlock>
									</div>
								)}
								{sample.output && (
									<div>
										<S.PreviewH3>예제 출력 {index + 1}</S.PreviewH3>
										<S.PreviewCodeBlock>
											<code>{sample.output}</code>
										</S.PreviewCodeBlock>
									</div>
								)}
							</div>
						);
					})}
				</S.PreviewSection>
			)}
		</div>
	);
};

export default ProblemPreview;
