import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.97);
  border-radius: 20px;
  box-shadow: 0 24px 60px rgba(102, 126, 234, 0.25);
  width: 100%;
  max-width: 440px;
  padding: 44px 40px 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

export const LogoArea = styled.div`
  margin-bottom: 24px;
`;

export const LogoLink = styled.a`
  font-size: 22px;
  font-weight: 800;
  color: #667eea;
  text-decoration: none;
  letter-spacing: -0.5px;

  &:hover {
    color: #764ba2;
  }
`;

export const IconWrap = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 26px;
  margin-bottom: 20px;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.35);
`;

export const SuccessIcon = styled.div`
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  margin-bottom: 20px;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.35);
  animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  @keyframes scaleIn {
    from { transform: scale(0); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }
`;

export const WarningIcon = styled.div`
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  margin-bottom: 20px;
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.35);
`;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 10px;
  text-align: center;
  letter-spacing: -0.3px;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  line-height: 1.7;
  margin: 0 0 28px;
`;

export const Form = styled.form`
  width: 100%;
`;

export const FieldLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

export const InputGroup = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  z-index: 1;
  font-size: 14px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px 46px 15px 46px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.2s;
  box-sizing: border-box;
  background: #fafafa;
  color: #1a1a2e;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const ToggleButton = styled.button`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  font-size: 15px;
  transition: color 0.2s;

  &:hover {
    color: #667eea;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 13px;
  color: #ef4444;
  margin: -6px 0 14px;
  text-align: center;
  background: rgba(239, 68, 68, 0.06);
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.15);
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.35);
  margin-bottom: 4px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.45);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }
`;

export const BackLink = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 13px;
  cursor: pointer;
  padding: 10px 0;
  margin-top: 4px;
  transition: color 0.2s;

  &:hover {
    color: #667eea;
  }
`;
