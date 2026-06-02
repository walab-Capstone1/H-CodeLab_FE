import type React from "react";
import { useCallback, useState } from "react";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import type { TaMessage } from "../types";
import TaMessageBubble from "./TaMessageBubble";
import * as S from "./styles";

const PANEL_WIDTH_KEY = "ta-assistant-panel-width";
const MIN_PANEL_WIDTH = 320;
const MAX_PANEL_WIDTH = 720;
const DEFAULT_PANEL_WIDTH = 420;

function getMaxPanelWidth(): number {
	if (typeof window === "undefined") return MAX_PANEL_WIDTH;
	return Math.min(MAX_PANEL_WIDTH, Math.floor(window.innerWidth * 0.85));
}

function clampPanelWidth(width: number): number {
	return Math.min(getMaxPanelWidth(), Math.max(MIN_PANEL_WIDTH, width));
}

function readStoredPanelWidth(): number {
	if (typeof window === "undefined") return DEFAULT_PANEL_WIDTH;
	const saved = localStorage.getItem(PANEL_WIDTH_KEY);
	if (!saved) return DEFAULT_PANEL_WIDTH;
	const parsed = Number.parseInt(saved, 10);
	if (Number.isNaN(parsed)) return DEFAULT_PANEL_WIDTH;
	return clampPanelWidth(parsed);
}

interface TaAssistantPanelProps {
	isOpen: boolean;
	theme: "light" | "dark";
	messages: TaMessage[];
	isLoading: boolean;
	error: string | null;
	onClose: () => void;
	onSendMessage: (prompt: string) => Promise<void>;
	onRetry?: () => void;
}

const TaAssistantPanel: React.FC<TaAssistantPanelProps> = ({
	isOpen,
	theme,
	messages,
	isLoading,
	error,
	onClose,
	onSendMessage,
	onRetry,
}) => {
	const [draft, setDraft] = useState("");
	const [panelWidth, setPanelWidth] = useState(readStoredPanelWidth);

	const handleResizeStart = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			event.preventDefault();
			const startX = event.clientX;
			const startWidth = panelWidth;

			const onMove = (moveEvent: MouseEvent) => {
				const nextWidth = clampPanelWidth(
					startWidth + (startX - moveEvent.clientX),
				);
				setPanelWidth(nextWidth);
			};

			const onUp = () => {
				window.removeEventListener("mousemove", onMove);
				window.removeEventListener("mouseup", onUp);
				setPanelWidth((currentWidth) => {
					localStorage.setItem(PANEL_WIDTH_KEY, String(currentWidth));
					return currentWidth;
				});
			};

			window.addEventListener("mousemove", onMove);
			window.addEventListener("mouseup", onUp);
		},
		[panelWidth],
	);

	if (!isOpen) return null;

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const trimmed = draft.trim();
		if (!trimmed || isLoading) return;
		setDraft("");
		await onSendMessage(trimmed);
	};

	return (
		<S.PanelOverlay>
			<S.Panel
				$theme={theme}
				$width={panelWidth}
				onClick={(event) => event.stopPropagation()}
			>
				<S.ResizeHandle
					$theme={theme}
					onMouseDown={handleResizeStart}
					aria-label="패널 너비 조절"
					title="드래그하여 패널 너비 조절"
				/>
				<S.PanelHeader>
					<S.PanelTitle>AI 튜터</S.PanelTitle>
					<S.CloseButton type="button" onClick={onClose} aria-label="닫기">
						×
					</S.CloseButton>
				</S.PanelHeader>

				{error && (
					<S.ErrorBanner>
						<span>{error}</span>
						{onRetry && (
							<S.RetryButton
								type="button"
								disabled={isLoading}
								onClick={onRetry}
							>
								다시 시도
							</S.RetryButton>
						)}
					</S.ErrorBanner>
				)}

				<S.MessageList>
					{messages.map((message) => (
						<TaMessageBubble
							key={message.id}
							message={message}
							theme={theme}
							disabled={isLoading}
							onSelectSuggestedQuestion={(question) => {
								void onSendMessage(question);
							}}
						/>
					))}
					{isLoading && (
						<S.LoadingRow>
							<LoadingSpinner size="sm" />
							<span>AI 튜터가 답변을 준비하고 있습니다...</span>
						</S.LoadingRow>
					)}
				</S.MessageList>

				<S.InputArea as="form" onSubmit={handleSubmit}>
					<S.PromptInput
						$theme={theme}
						value={draft}
						onChange={(event) => setDraft(event.target.value)}
						placeholder="추가로 궁금한 점을 입력하세요"
						disabled={isLoading}
					/>
					<S.SendButton type="submit" disabled={isLoading || !draft.trim()}>
						보내기
					</S.SendButton>
				</S.InputArea>
			</S.Panel>
		</S.PanelOverlay>
	);
};

export default TaAssistantPanel;
