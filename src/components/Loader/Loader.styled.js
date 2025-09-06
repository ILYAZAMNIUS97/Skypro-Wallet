import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const LoaderContainer = styled.div`
  width: 100%;
  padding: 25px 0;
`;

export const LoaderContent = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const LoaderColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background-color: #f8fafd;
  border-radius: 10px;
  padding: 15px;
  min-height: 400px;

  @media screen and (max-width: 768px) {
    padding: 12px;
    min-height: 300px;
  }
`;

export const LoaderColumnTitle = styled.div`
  width: 100%;
  height: 25px;
  background: linear-gradient(90deg, #f4f6f8 25%, #e5e8ed 50%, #f4f6f8 75%);
  background-size: 200px 100%;
  border-radius: 4px;
  animation: ${shimmer} 2s infinite linear;
  color: transparent;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.003em;
  padding: 0 15px;
  display: flex;
  align-items: center;
  position: relative;

  /* Показываем текст поверх скелетона для лучшего UX */
  &::after {
    content: attr(children);
    color: #94a6be;
    position: absolute;
    left: 15px;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
  }
`;

export const LoaderCard = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  padding: 15px 13px 19px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0px 4px 8px 0px rgba(148, 166, 190, 0.4);

  @media screen and (max-width: 768px) {
    padding: 10px 8px 14px;
    gap: 8px;
  }
`;

export const LoaderCardLine = styled.div`
  width: 100%;
  height: 16px;
  background: linear-gradient(90deg, #f4f6f8 25%, #e5e8ed 50%, #f4f6f8 75%);
  background-size: 200px 100%;
  border-radius: 3px;
  animation: ${shimmer} 2s infinite linear;

  &:first-child {
    width: 90%;
  }

  &:nth-child(2) {
    width: 75%;
  }

  @media screen and (max-width: 768px) {
    height: 14px;
  }
`;

export const LoaderCardShortLine = styled.div`
  width: 50%;
  height: 14px;
  background: linear-gradient(90deg, #f4f6f8 25%, #e5e8ed 50%, #f4f6f8 75%);
  background-size: 200px 100%;
  border-radius: 3px;
  animation: ${shimmer} 2s infinite linear;

  @media screen and (max-width: 768px) {
    height: 12px;
  }
`;
