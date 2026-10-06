import React, { createContext, useContext } from "react";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
	ProblemPreviewWrapper,
	ProblemPreviewEmpty,
	ProblemPreviewTitle,
	ProblemPreviewDescription,
	ProblemPreviewSection,
	ProblemPreviewH2,
	ProblemPreviewH3,
	ProblemPreviewParagraph,
	ProblemPreviewCodeBlock,
	ProblemPreviewInlineCode,
} from "./problemCreateStyles";

export interface SampleInput {
	input?: string;
	output?: string;
}

interface ProblemPreviewProps {
	title?: string;
	description?: string;
	inputFormat?: string;
	outputFormat?: string;
	sampleInputs?: SampleInput[];
}

const InsidePreContext = createContext(false);

function MarkdownPre({ children }: { children?: ReactNode }) {
	return (
		<InsidePreContext.Provider value={true}>
			<ProblemPreviewCodeBlock>{children}</ProblemPreviewCodeBlock>
		</InsidePreContext.Provider>
	);
}

function MarkdownCode({
	children,
	className,
}: {
	children?: ReactNode;
	className?: string;
}) {
	const insidePre = useContext(InsidePreContext);
	if (insidePre) {
		return <code className={className}>{children}</code>;
	}
	return <ProblemPreviewInlineCode>{children}</ProblemPreviewInlineCode>;
}

const NBSP = "\u00A0";

function prepareMarkdown(text: string): string {
	if (!text) return "";
	return text
		.split(/(```[\s\S]*?```)/g)
		.map((part, i) => {
			if (i % 2 === 1) return part;
			return part
				.split(/((?:^[ \t]*\|[^\n\r]*\|[ \t]*(?:\r?\n|$))+)/gm)
				.map((subPart, j) => {
					if (j % 2 === 1) return subPart;
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

const ProblemPreview: React.FC<ProblemPreviewProps> = ({
	title,
	description,
	inputFormat,
	outputFormat,
	sampleInputs,
}) => {
	const hasContent =
		description ||
		inputFormat ||
		outputFormat ||
		sampleInputs?.some((s) => s.input || s.output);

	if (!hasContent) {
		return <ProblemPreviewEmpty>문제 설명을 입력하세요</ProblemPreviewEmpty>;
	}

	return (
		<ProblemPreviewWrapper>
			{title && <ProblemPreviewTitle>{title}</ProblemPreviewTitle>}
			{description && (
				<ProblemPreviewDescription>
					<ReactMarkdown
						components={{
							pre: MarkdownPre,
							code: MarkdownCode,
							h1: ({ node: _n, children, ...props }) => (
								<h1 className="problem-preview-h1" {...props}>{children}</h1>
							),
							h2: ({ node: _n, children, ...props }) => <ProblemPreviewH2 {...props}>{children}</ProblemPreviewH2>,
							h3: ({ node: _n, children, ...props }) => <ProblemPreviewH3 {...props}>{children}</ProblemPreviewH3>,
							p: ({ node: _n, children, ...props }) => <ProblemPreviewParagraph {...props}>{children}</ProblemPreviewParagraph>,
						}}
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeRaw]}
					>
						{prepareMarkdown(description)}
					</ReactMarkdown>
				</ProblemPreviewDescription>
			)}
			{inputFormat && (
				<ProblemPreviewSection>
					<ProblemPreviewH2>입력 형식</ProblemPreviewH2>
					<ReactMarkdown
						components={{
							pre: MarkdownPre,
							code: MarkdownCode,
							p: ({ node: _n, ...props }) => <ProblemPreviewParagraph {...props} />,
						}}
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeRaw]}
					>
						{prepareMarkdown(inputFormat)}
					</ReactMarkdown>
				</ProblemPreviewSection>
			)}
			{outputFormat && (
				<ProblemPreviewSection>
					<ProblemPreviewH2>출력 형식</ProblemPreviewH2>
					<ReactMarkdown
						components={{
							pre: MarkdownPre,
							code: MarkdownCode,
							p: ({ node: _n, ...props }) => <ProblemPreviewParagraph {...props} />,
						}}
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[rehypeRaw]}
					>
						{prepareMarkdown(outputFormat)}
					</ReactMarkdown>
				</ProblemPreviewSection>
			)}
			{sampleInputs?.some((s) => s.input || s.output) &&
				sampleInputs.map((sample, idx) => {
					if (!sample.input && !sample.output) return null;
					return (
						<ProblemPreviewSection
							key={`sample-${idx}-${sample.input?.slice(0, 10) ?? ""}-${sample.output?.slice(0, 10) ?? ""}`}
						>
							<ProblemPreviewH3>예제 입력 {idx + 1}</ProblemPreviewH3>
							<ProblemPreviewCodeBlock>
								<code>{sample.input ?? ""}</code>
							</ProblemPreviewCodeBlock>
							<ProblemPreviewH3>예제 출력 {idx + 1}</ProblemPreviewH3>
							<ProblemPreviewCodeBlock>
								<code>{sample.output ?? ""}</code>
							</ProblemPreviewCodeBlock>
						</ProblemPreviewSection>
					);
				})}
		</ProblemPreviewWrapper>
	);
};

export default ProblemPreview;
