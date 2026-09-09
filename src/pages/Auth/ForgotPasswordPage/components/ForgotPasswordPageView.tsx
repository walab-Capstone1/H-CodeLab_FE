import { FaEnvelope, FaArrowLeft, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { ForgotPasswordPageHookReturn } from "../hooks/useForgotPasswordPage";
import * as S from "../styles";

export default function ForgotPasswordPageView(d: ForgotPasswordPageHookReturn) {
	if (d.step === "sent") {
		return (
			<S.Container>
				<S.Card>
					<S.LogoArea>
						<S.LogoLink as={Link} to="/index">H-CodeLab</S.LogoLink>
					</S.LogoArea>

					<S.SuccessIcon>
						<FaCheckCircle />
					</S.SuccessIcon>

					<S.Title>이메일을 확인해주세요!</S.Title>
					<S.Subtitle>
						<strong>{d.email}</strong>으로 비밀번호 재설정 링크를 보냈습니다.
						<br />
						15분 이내에 이메일을 확인해주세요.
					</S.Subtitle>

					<S.InfoBox>
						<S.InfoItem>📥 스팸 폴더도 확인해보세요</S.InfoItem>
						<S.InfoItem>⏰ 링크는 15분 후 만료됩니다</S.InfoItem>
					</S.InfoBox>

					{d.errorMessage && <S.ErrorMessage>{d.errorMessage}</S.ErrorMessage>}

					<S.ResendButton
						type="button"
						onClick={d.handleResend}
						disabled={d.isLoading}
					>
						{d.isLoading ? "발송 중..." : "이메일 재발송"}
					</S.ResendButton>

					<S.BackLink onClick={d.handleBackToLogin}>
						<FaArrowLeft />
						<span>로그인으로 돌아가기</span>
					</S.BackLink>
				</S.Card>
			</S.Container>
		);
	}

	return (
		<S.Container>
			<S.Card>
				<S.LogoArea>
					<S.LogoLink as={Link} to="/index">H-CodeLab</S.LogoLink>
				</S.LogoArea>

				<S.IconWrap>
					<FaPaperPlane />
				</S.IconWrap>

				<S.Title>비밀번호 찾기</S.Title>
				<S.Subtitle>
					가입 시 사용한 이메일 주소를 입력하시면
					<br />
					비밀번호 재설정 링크를 보내드립니다.
				</S.Subtitle>

				<S.Form onSubmit={d.handleSubmit}>
					<S.InputGroup>
						<S.InputIcon>
							<FaEnvelope />
						</S.InputIcon>
						<S.Input
							id="forgot-email"
							type="email"
							placeholder="이메일을 입력해 주세요"
							value={d.email}
							onChange={d.handleEmailChange}
							required
							autoFocus
						/>
					</S.InputGroup>

					{d.errorMessage && <S.ErrorMessage>{d.errorMessage}</S.ErrorMessage>}

					<S.SubmitButton type="submit" disabled={d.isLoading || !d.email.trim()}>
						{d.isLoading ? "발송 중..." : "재설정 링크 보내기"}
					</S.SubmitButton>
				</S.Form>

				<S.BackLink onClick={d.handleBackToLogin}>
					<FaArrowLeft />
					<span>로그인으로 돌아가기</span>
				</S.BackLink>
			</S.Card>
		</S.Container>
	);
}
