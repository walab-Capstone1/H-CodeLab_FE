import type React from "react";
import type { TaMessage } from "../types";
import * as S from "./styles";

interface TaMessageBubbleProps {
	message: TaMessage;
	theme: "light" | "dark";
	onSelectSuggestedQuestion?: (question: string) => void;
	disabled?: boolean;
}

const TaMessageBubble: React.FC<TaMessageBubbleProps> = ({
	message,
	theme,
	onSelectSuggestedQuestion,
	disabled,
}) => {
	if (message.role === "user") {
		return <S.UserBubble>{message.content}</S.UserBubble>;
	}

	return (
		<div>
			<S.AssistantBubble $theme={theme}>{message.content}</S.AssistantBubble>
			{message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
				<S.SuggestedQuestions>
					{message.suggestedQuestions.map((question) => (
						<S.SuggestedQuestionButton
							key={question}
							type="button"
							$theme={theme}
							disabled={disabled}
							onClick={() => onSelectSuggestedQuestion?.(question)}
						>
							{question}
						</S.SuggestedQuestionButton>
					))}
				</S.SuggestedQuestions>
			)}
		</div>
	);
};

export default TaMessageBubble;
