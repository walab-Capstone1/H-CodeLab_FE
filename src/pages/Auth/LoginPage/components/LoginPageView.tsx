import { Link } from "react-router-dom";
import {
	FaEnvelope,
	FaLock,
	FaEye,
	FaEyeSlash,
	FaGoogle,
	FaGithub,
} from "react-icons/fa";
import { SiKakaotalk } from "react-icons/si";
import type { LoginPageHookReturn } from "../hooks/useLoginPage";
import * as S from "../styles";

export default function LoginPageView(d: LoginPageHookReturn) {
	return (
		<S.OnboardingContainer>
			<S.Header>
				<S.Logo as={Link} to="/index">
					<S.LogoImage
						src={`${process.env.PUBLIC_URL || ""}/logo.svg`}
						alt="H-CodeLab"
					/>
					<span>H-CodeLab</span>
				</S.Logo>
				<S.EnterpriseLink>기업서비스</S.EnterpriseLink>
			</S.Header>

			<S.MainContent>
				<S.LeftSection>
					<S.WelcomeText>
						반가워요, 개발자의 성장을 돕는 H-CodeLab입니다.
					</S.WelcomeText>
					<S.Illustrations>
						<S.IllustrationItem>
							<S.CodeIcon>&lt;/&gt;</S.CodeIcon>
						</S.IllustrationItem>
						<S.IllustrationItem>
							<S.DatabaseIcon>DB</S.DatabaseIcon>
						</S.IllustrationItem>
						<S.IllustrationItem>
							<S.CloudIcon>☁</S.CloudIcon>
						</S.IllustrationItem>
						<S.IllustrationItem>
							<S.BrowserIcon>🌐</S.BrowserIcon>
						</S.IllustrationItem>
						<S.IllustrationItem>
							<S.ChartIcon>📊</S.ChartIcon>
						</S.IllustrationItem>
					</S.Illustrations>
				</S.LeftSection>

				<S.RightSection>
					<S.LoginCard>
						<S.LoginTitle>H-CodeLab 로그인</S.LoginTitle>
						{(d.loginMessage || d.pendingEnrollmentCode) && (
							<S.LoginMessage>
								{d.loginMessage || "수업 참가를 위해 로그인이 필요합니다."}
							</S.LoginMessage>
						)}
						<S.LoginForm onSubmit={d.handleSubmit}>
							<S.InputGroup>
								<S.InputIcon>
									<FaEnvelope />
								</S.InputIcon>
								<S.Input
									type="email"
									name="email"
									placeholder="이메일을 입력해 주세요"
									value={d.formData.email}
									onChange={d.handleInputChange}
									required
								/>
							</S.InputGroup>

							<S.InputGroup>
								<S.InputIcon>
									<FaLock />
								</S.InputIcon>
								<S.Input
									type={d.showPassword ? "text" : "password"}
									name="password"
									placeholder="비밀번호를 입력해 주세요"
									value={d.formData.password}
									onChange={d.handleInputChange}
									required
								/>
								<S.PasswordToggle
									type="button"
									onClick={d.setShowPasswordToggle}
								>
									{d.showPassword ? <FaEyeSlash /> : <FaEye />}
								</S.PasswordToggle>
							</S.InputGroup>

							<S.LoginButton type="submit">로그인하기</S.LoginButton>

							<S.SignupButton type="button" onClick={d.handleSignup}>
								회원가입
							</S.SignupButton>

							<S.PasswordResetLink as={Link} to="/forgot-password">
								비밀번호 재설정
							</S.PasswordResetLink>
						</S.LoginForm>

						<S.SocialLoginSection>
							<S.SocialLoginTitle>
								SNS 계정으로 간편하게 시작하기
							</S.SocialLoginTitle>
							<S.SocialLoginButtons>
								<S.SocialButton
									onClick={() => d.handleSocialLogin("google")}
									color="#4285F4"
								>
									<FaGoogle />
									<span>Google</span>
								</S.SocialButton>

								<S.SocialButton
									onClick={() => d.handleSocialLogin("kakao")}
									color="#FEE500"
								>
									<SiKakaotalk />
									<span>Kakao</span>
								</S.SocialButton>

								<S.SocialButton
									onClick={() => d.handleSocialLogin("github")}
									color="#24292E"
								>
									<FaGithub />
									<span>GitHub</span>
								</S.SocialButton>

								<S.SocialButton
									onClick={() => d.handleSocialLogin("hisnet")}
									color="#1E3A8A"
								>
									<S.HisNetIcon>H</S.HisNetIcon>
									<span>HisNet</span>
								</S.SocialButton>
							</S.SocialLoginButtons>
						</S.SocialLoginSection>

						<S.FooterLinks>
							<S.FooterLink href="#">이용약관</S.FooterLink>
							<S.FooterDivider>|</S.FooterDivider>
							<S.FooterLink href="#">개인정보 처리방침</S.FooterLink>
							<S.FooterDivider>|</S.FooterDivider>
							<S.FooterLink href="#">FAQ/문의</S.FooterLink>
						</S.FooterLinks>
					</S.LoginCard>
				</S.RightSection>
			</S.MainContent>
		</S.OnboardingContainer>
	);
}
