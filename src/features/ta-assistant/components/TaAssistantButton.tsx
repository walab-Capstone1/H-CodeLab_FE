import type React from "react";
import * as S from "./styles";

interface TaAssistantButtonProps {
	onClick: () => void;
	compact?: boolean;
}

const TaAssistantButton: React.FC<TaAssistantButtonProps> = ({
	onClick,
	compact = false,
}) => (
	<S.AssistantButton type="button" $compact={compact} onClick={onClick}>
		<span aria-hidden="true">✨</span>
		AI 튜터
	</S.AssistantButton>
);

export default TaAssistantButton;
