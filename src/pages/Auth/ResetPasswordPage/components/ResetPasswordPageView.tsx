import {
	FaLock,
	FaEye,
	FaEyeSlash,
	FaCheckCircle,
	FaExclamationTriangle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import type { ResetPasswordPageHookReturn } from "../hooks/useResetPasswordPage";
import * as S from "../styles";

export default function ResetPasswordPageView(d: ResetPasswordPageHookReturn) {
	// 토큰 없는 잘못된 접근
	if (d.step === "invalid") {
		return (
			<S.Container>
				<S.Card>
					<S.LogoArea>
						<S.LogoLink as={Link} to="/index">H-CodeLab</S.LogoLink>
					</S.LogoArea>
					<S.WarningIcon>
						<FaExclamationTriangle />
					</S.WarningIcon>
					<S.Title>유효하지 않은 링크</S.Title>
					<S.Subtitle>
						비밀번호 재설정 링크가 올바르지 않거나 만료되었습니다.
						<br />
						다시 요청해주세요.
					</S.Subtitle>
					<S.PrimaryButton type="button" onClick={d.handleGoToForgotPassword}>
						비밀번호 재설정 다시 요청
					</S.PrimaryButton>
					<S.BackLink onClick={d.handleGoToLogin}>
						로그인으로 돌아가기
					</S.BackLink>
				</S.Card>
			</S.Container>
		);
	}

	// 변경 성공
	if (d.step === "success") {
		return (
			<S.Container>
				<S.Card>
					<S.LogoArea>
						<S.LogoLink as={Link} to="/index">H-CodeLab</S.LogoLink>
					</S.LogoArea>
					<S.SuccessIcon>
						<FaCheckCircle />
					</S.SuccessIcon>
					<S.Title>비밀번호 변경 완료!</S.Title>
					<S.Subtitle>
						새로운 비밀번호로 성공적으로 변경되었습니다.
						<br />
						변경된 비밀번호로 로그인해주세요.
					</S.Subtitle>
					<S.PrimaryButton type="button" onClick={d.handleGoToLogin}>
						로그인하러 가기
					</S.PrimaryButton>
				</S.Card>
			</S.Container>
		);
	}

	// 비밀번호 입력 폼
	return (
		<S.Container>
			<S.Card>
				<S.LogoArea>
					<S.LogoLink as={Link} to="/index">H-CodeLab</S.LogoLink>
				</S.LogoArea>

				<S.IconWrap>
					<FaLock />
				</S.IconWrap>

				<S.Title>새 비밀번호 설정</S.Title>
				<S.Subtitle>
					사용할 새로운 비밀번호를 입력해주세요.
					<br />
					최소 8자 이상이어야 합니다.
				</S.Subtitle>

				<S.Form onSubmit={d.handleSubmit}>
					{/* 새 비밀번호 */}
					<S.FieldLabel>새 비밀번호</S.FieldLabel>
					<S.InputGroup>
						<S.InputIcon>
							<FaLock />
						</S.InputIcon>
						<S.Input
							id="new-password"
							type={d.showPassword ? "text" : "password"}
							placeholder="새 비밀번호 (8자 이상)"
							value={d.newPassword}
							onChange={d.handleNewPasswordChange}
							required
							autoFocus
						/>
						<S.ToggleButton
							type="button"
							onClick={() => d.setShowPassword(!d.showPassword)}
						>
							{d.showPassword ? <FaEyeSlash /> : <FaEye />}
						</S.ToggleButton>
					</S.InputGroup>

					{/* 비밀번호 확인 */}
					<S.FieldLabel>비밀번호 확인</S.FieldLabel>
					<S.InputGroup>
						<S.InputIcon>
							<FaLock />
						</S.InputIcon>
						<S.Input
							id="password-confirm"
							type={d.showConfirm ? "text" : "password"}
							placeholder="비밀번호를 한 번 더 입력"
							value={d.passwordConfirm}
							onChange={d.handlePasswordConfirmChange}
							required
						/>
						<S.ToggleButton
							type="button"
							onClick={() => d.setShowConfirm(!d.showConfirm)}
						>
							{d.showConfirm ? <FaEyeSlash /> : <FaEye />}
						</S.ToggleButton>
					</S.InputGroup>

					{/* 유효성 에러 */}
					{d.passwordError && (
						<S.ErrorMessage>{d.passwordError}</S.ErrorMessage>
					)}

					{/* API 에러 */}
					{d.errorMessage && (
						<S.ErrorMessage>{d.errorMessage}</S.ErrorMessage>
					)}

					<S.PrimaryButton
						type="submit"
						disabled={d.isLoading || !d.isFormValid}
					>
						{d.isLoading ? "변경 중..." : "비밀번호 변경하기"}
					</S.PrimaryButton>
				</S.Form>

				<S.BackLink onClick={d.handleGoToLogin}>
					로그인으로 돌아가기
				</S.BackLink>
			</S.Card>
		</S.Container>
	);
}
