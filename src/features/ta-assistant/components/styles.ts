import styled from "styled-components";

export const PanelOverlay = styled.div`
	position: fixed;
	inset: 0;
	background: rgba(15, 23, 42, 0.35);
	z-index: 1200;
	display: flex;
	justify-content: flex-end;
`;

export const Panel = styled.aside<{ $theme: "light" | "dark"; $width: number }>`
	position: relative;
	width: ${({ $width }) => $width}px;
	max-width: 100vw;
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	background: ${({ $theme }) => ($theme === "dark" ? "#0f172a" : "#ffffff")};
	color: ${({ $theme }) => ($theme === "dark" ? "#e2e8f0" : "#1e293b")};
	box-shadow: -8px 0 24px rgba(15, 23, 42, 0.18);
`;

export const ResizeHandle = styled.div<{ $theme: "light" | "dark" }>`
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	width: 6px;
	cursor: col-resize;
	z-index: 2;
	touch-action: none;

	&::after {
		content: "";
		position: absolute;
		left: 2px;
		top: 50%;
		transform: translateY(-50%);
		width: 2px;
		height: 48px;
		border-radius: 999px;
		background: ${({ $theme }) =>
			$theme === "dark" ? "rgba(148, 163, 184, 0.45)" : "rgba(100, 116, 139, 0.35)"};
	}

	&:hover::after,
	&:active::after {
		background: #6366f1;
	}
`;

export const PanelHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16px 18px;
	border-bottom: 1px solid rgba(148, 163, 184, 0.25);
`;

export const PanelTitle = styled.h2`
	margin: 0;
	font-size: 1rem;
	font-weight: 700;
`;

export const CloseButton = styled.button`
	border: none;
	background: transparent;
	color: inherit;
	font-size: 1.25rem;
	cursor: pointer;
	padding: 4px 8px;
	border-radius: 6px;

	&:hover {
		background: rgba(148, 163, 184, 0.15);
	}
`;

export const MessageList = styled.div`
	flex: 1;
	overflow-y: auto;
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const InputArea = styled.div`
	padding: 14px 16px 18px;
	border-top: 1px solid rgba(148, 163, 184, 0.25);
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const PromptInput = styled.textarea<{ $theme: "light" | "dark" }>`
	width: 100%;
	min-height: 72px;
	resize: vertical;
	border-radius: 10px;
	border: 1px solid rgba(148, 163, 184, 0.35);
	padding: 10px 12px;
	font-size: 0.9rem;
	font-family: inherit;
	background: ${({ $theme }) => ($theme === "dark" ? "#111827" : "#f8fafc")};
	color: inherit;

	&:focus {
		outline: none;
		border-color: #6366f1;
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
	}
`;

export const SendButton = styled.button`
	align-self: flex-end;
	border: none;
	border-radius: 8px;
	padding: 8px 14px;
	font-size: 0.875rem;
	font-weight: 600;
	cursor: pointer;
	color: #ffffff;
	background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);

	&:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}
`;

export const ErrorBanner = styled.div`
	margin: 0 16px;
	padding: 10px 12px;
	border-radius: 8px;
	background: rgba(220, 38, 38, 0.12);
	color: #b91c1c;
	font-size: 0.85rem;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const RetryButton = styled.button`
	align-self: flex-start;
	border: 1px solid rgba(185, 28, 28, 0.35);
	background: #ffffff;
	color: #b91c1c;
	border-radius: 6px;
	padding: 4px 10px;
	font-size: 0.8rem;
	font-weight: 600;
	cursor: pointer;

	&:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}
`;

export const UserBubble = styled.div`
	align-self: flex-end;
	max-width: 92%;
	padding: 10px 12px;
	border-radius: 14px 14px 4px 14px;
	background: #4f46e5;
	color: #ffffff;
	font-size: 0.9rem;
	line-height: 1.5;
	white-space: pre-wrap;
`;

export const AssistantBubble = styled.div<{ $theme: "light" | "dark" }>`
	align-self: flex-start;
	max-width: 92%;
	padding: 10px 12px;
	border-radius: 14px 14px 14px 4px;
	background: ${({ $theme }) =>
		$theme === "dark" ? "#1e293b" : "#f1f5f9"};
	font-size: 0.9rem;
	line-height: 1.55;
	white-space: pre-wrap;
`;

export const SuggestedQuestions = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-top: 8px;
`;

export const SuggestedQuestionButton = styled.button<{ $theme: "light" | "dark" }>`
	border: 1px solid rgba(99, 102, 241, 0.35);
	background: ${({ $theme }) =>
		$theme === "dark" ? "rgba(99, 102, 241, 0.12)" : "#eef2ff"};
	color: inherit;
	border-radius: 999px;
	padding: 6px 10px;
	font-size: 0.78rem;
	cursor: pointer;
	text-align: left;

	&:hover {
		border-color: #6366f1;
	}
`;

export const LoadingRow = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 0.85rem;
	color: #64748b;
`;

export const AssistantButton = styled.button<{ $compact?: boolean }>`
	display: inline-flex;
	align-items: center;
	gap: 6px;
	margin-top: ${({ $compact }) => ($compact ? "0" : "8px")};
	padding: ${({ $compact }) => ($compact ? "6px 10px" : "8px 12px")};
	border: none;
	border-radius: 8px;
	font-size: ${({ $compact }) => ($compact ? "0.8rem" : "0.85rem")};
	font-weight: 600;
	cursor: pointer;
	color: #ffffff;
	background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
	box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
	white-space: nowrap;

	&:hover {
		filter: brightness(1.05);
	}
`;
