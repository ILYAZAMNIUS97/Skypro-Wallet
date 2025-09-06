import styled from "styled-components";

export const PopBrowseContainer = styled.div`
  display: ${({ $visible }) => ($visible ? "block" : "none")};
  width: 100%;
  height: 100%;
  min-width: 375px;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 7;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

export const PopBrowseInner = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);

  @media screen and (max-width: 660px) {
    padding: 0;
    justify-content: flex-start;
  }
`;

export const PopBrowseBlock = styled.div`
  display: block;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.modalBackground};
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid ${({ theme }) => theme.colors.border};
  position: relative;
  transform: ${({ $visible }) => ($visible ? "scale(1)" : "scale(0.9)")};
  transition: transform 0.3s ease;

  @media screen and (max-width: 660px) {
    border-radius: 0;
  }

  @media screen and (max-width: 495px) {
    padding: 20px 16px 32px;
  }
`;

export const PopBrowseContent = styled.div`
  display: block;
  text-align: left;
`;

export const PopBrowseTopBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const PopBrowseTitle = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  flex: 1;
  margin-right: 20px;

  input {
    border: none !important;
    outline: none !important;
    background: transparent !important;
    width: 100% !important;
    border-bottom: 1px solid ${({ theme }) => theme.colors.textSecondary} !important;
    padding-bottom: 2px;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 20px;
    font-weight: 600;
    transition: border-bottom-color 0.2s ease;

    &:focus {
      border-bottom: 2px solid ${({ theme }) => theme.colors.textSecondary} !important;
    }
  }
`;

export const PopBrowseWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media screen and (max-width: 660px) {
    display: block;
  }
`;

export const PopBrowseForm = styled.form`
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;

  @media screen and (max-width: 495px) {
    max-width: 100%;
  }
`;

export const FormBrowseBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormBrowseTextarea = styled.textarea`
  max-width: 370px;
  width: 100%;
  outline: none;
  padding: 14px;
  background: ${({ $readOnly, theme }) =>
    $readOnly ? theme.colors.background : theme.colors.inputBackground};
  border: 0.7px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
  margin-top: 14px;
  height: 200px;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: ${({ $readOnly }) => ($readOnly ? "default" : "text")};
  resize: none;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 1px;
    color: ${({ theme }) => theme.colors.placeholder};
    letter-spacing: -0.14px;
  }

  &:not([readonly]) {
    background-color: ${({ theme }) => theme.colors.inputBackground} !important;
    border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  }

  @media screen and (max-width: 495px) {
    max-width: 100%;
    height: 37px;
  }
`;

export const StatusContainer = styled.div`
  margin-bottom: 11px;
`;

export const StatusTitle = styled.p`
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

export const StatusThemes = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const StatusTheme = styled.div`
  border-radius: 24px;
  border: 0.7px solid ${({ theme }) => theme.colors.border};
  color: ${({ $selected, theme }) =>
    $selected ? "#ffffff" : theme.colors.textSecondary};
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.colors.textSecondary : "transparent"};
  padding: 11px 14px 10px;
  margin-right: 7px;
  margin-bottom: 7px;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  transition: all 0.2s ease;
  box-shadow: ${({ $selected }) =>
    $selected ? "0 2px 4px rgba(148, 166, 190, 0.3)" : "none"};

  &:hover:not([data-disabled="true"]) {
    border-color: ${({ theme }) => theme.colors.textSecondary};
    transform: translateY(-1px);
  }

  p {
    font-size: 14px;
    line-height: 1;
    letter-spacing: -0.14px;
    color: inherit;
  }

  @media screen and (max-width: 660px) {
    margin-bottom: 5px;
  }
`;

export const SubTitle = styled.label`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

export const CategoriesContainer = styled.div`
  margin-bottom: 20px;

  @media screen and (max-width: 495px) {
    &.theme-down {
      display: block;
      margin-bottom: 20px;
    }

    &.theme-top {
      display: none;
    }
  }

  &.theme-top {
    display: block;
  }

  &.theme-down {
    display: none;
  }
`;

export const CategoriesTitle = styled.p`
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

export const CategoryTheme = styled.div`
  display: inline-block;
  width: auto;
  height: 30px;
  padding: 8px 20px;
  border-radius: 24px;
  margin-right: 7px;
  opacity: 1;

  p {
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    white-space: nowrap;
  }

  &._orange {
    background-color: #ffe4c2;
    color: #ff6d00;
  }

  &._green {
    background-color: #b4fdd1;
    color: #06b16e;
  }

  &._purple {
    background-color: #e9d4ff;
    color: #9a48f1;
  }

  &._gray {
    background: #94a6be;
    color: #ffffff;
  }
`;

export const ButtonContainer = styled.div`
  display: ${({ $visible }) => ($visible ? "flex" : "none")};
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 495px) {
    width: 100%;
  }
`;

export const Button = styled.button`
  height: 30px;
  margin-bottom: 10px;
  padding: 0 14px;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  transition: all 0.2s ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  ${ButtonGroup} & {
    margin-right: 8px;

    @media screen and (max-width: 495px) {
      margin-right: 0px;
      width: 100%;
      height: 40px;
    }
  }

  &.btn-primary {
    background: ${({ theme }) => theme.colors.button};
    border: none;
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.buttonHover};
    }
  }

  &.btn-secondary {
    border: 0.7px solid ${({ theme }) => theme.colors.button};
    background: transparent;
    color: ${({ theme }) => theme.colors.button};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.buttonHover};
      color: #ffffff;
    }
  }

  @media screen and (max-width: 495px) {
    width: 100%;
    height: 40px;
  }

  @media screen and (max-width: 660px) {
    font-size: 14px;
    padding: 0 12px;
  }
`;

export const ErrorContainer = styled.div`
  background-color: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 10px;
  text-align: center;
  color: #e53e3e;
`;

export const PopBrowseCalendar = styled.div`
  @media screen and (max-width: 495px) {
    width: 100%;
  }
`;
