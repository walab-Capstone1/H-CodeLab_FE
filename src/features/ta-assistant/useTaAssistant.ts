import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import taAssistantService from "../../services/taAssistantService";
import { buildTaAnalyzePayload } from "./buildTaAnalyzePayload";
import { getAssistantAvailability } from "./getAssistantAvailability";
import { shouldShowTaAssistant } from "./shouldShowTaAssistant";
import type { TaContext, TaMessage } from "./types";

function createMessageId(): string {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function formatTaError(err: unknown): string {
	const raw =
		err instanceof Error
			? err.message
			: "AI 튜터 응답을 가져오지 못했습니다.";

	if (raw.includes("429") || /quota/i.test(raw)) {
		return "AI 할당량이 초과되었습니다. 잠시 후 다시 시도하거나 API 키·요금제를 확인해 주세요.";
	}

	if (raw.length > 240) {
		return `${raw.slice(0, 240)}...`;
	}

	return raw;
}

export function useTaAssistant(context: TaContext, isSubmitting: boolean) {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<TaMessage[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const sessionIdRef = useRef<string>(
		`ta-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
	);
	const lastContextKeyRef = useRef<string>("");
	const initialAnalysisAttemptedRef = useRef(false);
	const isLoadingRef = useRef(false);

	const contextKey = useMemo(
		() =>
			[
				context.problemId ?? "unknown",
				context.submissionResult?.result ?? "none",
				context.submissionResult?.submittedAt ?? "",
				context.submissionResult?.type ?? "",
			].join(":"),
		[
			context.problemId,
			context.submissionResult?.result,
			context.submissionResult?.submittedAt,
			context.submissionResult?.type,
		],
	);

	const canUseAssistant = shouldShowTaAssistant(
		context.submissionResult,
		isSubmitting,
	);

	useEffect(() => {
		if (contextKey === lastContextKeyRef.current) return;
		lastContextKeyRef.current = contextKey;
		setMessages([]);
		setError(null);
		setIsOpen(false);
		initialAnalysisAttemptedRef.current = false;
		sessionIdRef.current = `ta-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
	}, [contextKey]);

	const sendMessage = useCallback(
		async (studentPrompt?: string) => {
			if (!canUseAssistant || isLoadingRef.current) return;

			const payload = buildTaAnalyzePayload(context, {
				studentPrompt,
				sessionId: sessionIdRef.current,
			});

			if (!payload) {
				setError(
					"AI 튜터에 전달할 제출 결과가 없습니다. 먼저 테스트를 실행해 주세요.",
				);
				return;
			}

			const trimmedPrompt = studentPrompt?.trim();
			if (trimmedPrompt) {
				setMessages((prev) => [
					...prev,
					{
						id: createMessageId(),
						role: "user",
						content: trimmedPrompt,
					},
				]);
			}

			isLoadingRef.current = true;
			setIsLoading(true);
			setError(null);

			try {
				const response = await taAssistantService.analyze(payload);
				setMessages((prev) => [
					...prev,
					{
						id: createMessageId(),
						role: "assistant",
						content: response.answer,
						suggestedQuestions: response.suggested_questions ?? [],
					},
				]);
			} catch (err) {
				setError(formatTaError(err));
			} finally {
				isLoadingRef.current = false;
				setIsLoading(false);
			}
		},
		[canUseAssistant, context],
	);

	const runInitialAnalysis = useCallback(() => {
		if (initialAnalysisAttemptedRef.current || isLoadingRef.current) return;
		initialAnalysisAttemptedRef.current = true;
		void sendMessage();
	}, [sendMessage]);

	const openAssistant = useCallback(() => {
		const { canOpen, message } = getAssistantAvailability(
			context.submissionResult,
			isSubmitting,
		);
		if (!canOpen) {
			if (message) alert(message);
			return;
		}
		setIsOpen(true);
	}, [context.submissionResult, isSubmitting]);

	const closeAssistant = useCallback(() => {
		setIsOpen(false);
	}, []);

	const retryAnalysis = useCallback(() => {
		if (isLoadingRef.current) return;
		initialAnalysisAttemptedRef.current = false;
		setError(null);
		runInitialAnalysis();
	}, [runInitialAnalysis]);

	useEffect(() => {
		if (!isOpen || !canUseAssistant) return;
		runInitialAnalysis();
	}, [canUseAssistant, isOpen, runInitialAnalysis]);

	return {
		isOpen,
		openAssistant,
		closeAssistant,
		messages,
		isLoading,
		error,
		canUseAssistant,
		sendMessage,
		retryAnalysis,
	};
}
