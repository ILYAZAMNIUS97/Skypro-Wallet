import styled from "styled-components";
import { media, spacing } from "../../utils/breakpoints";

export const TableContainer = styled.div`
  padding: ${spacing.mobile.element};
  height: auto;
  min-height: 400px;
  position: relative;

  ${media.tablet} {
    padding: 24px;
    min-height: 500px;
  }

  ${media.laptop} {
    padding: 32px;
    height: 618px;
    min-height: 618px;
  }
`;

export const TableTitle = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.219em;
  color: #000000;
  margin: 0 0 16px 0;

  ${media.tablet} {
    font-size: 20px;
    margin: 0 0 20px 0;
  }

  ${media.laptop} {
    font-size: 24px;
    margin: 0 0 24px 0;
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  ${media.laptop} {
    overflow-x: visible;
  }

  /* Стили полосы прокрутки для мобильных */
  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 10px;
  border-bottom: 0.5px solid #999999;
  margin-bottom: 10px;
  min-width: 500px;

  ${media.tablet} {
    gap: 24px;
    padding-bottom: 12px;
    margin-bottom: 12px;
    min-width: 600px;
  }

  ${media.laptop} {
    gap: 32px;
    padding-bottom: 14px;
    margin-bottom: 14px;
    min-width: auto;
  }
`;

export const TableHeaderCell = styled.div`
  width: ${(props) => props.width};
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 1.219em;
  color: #999999;
  flex-shrink: 0;

  ${media.tablet} {
    font-size: 11px;
  }

  ${media.laptop} {
    font-size: 12px;
  }
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 4px;

  ${media.tablet} {
    gap: 12px;
    max-height: 360px;
    padding-right: 6px;
  }

  ${media.laptop} {
    gap: 14px;
    max-height: 440px;
    padding-right: 8px;
  }

  /* Стили полосы прокрутки */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

export const TableRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 500px;

  ${media.tablet} {
    gap: 24px;
    min-width: 600px;
  }

  ${media.laptop} {
    gap: 32px;
    min-width: auto;
  }
`;

export const TableCell = styled.div`
  width: ${(props) => props.width};
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 1.219em;
  color: #000000;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  ${media.tablet} {
    font-size: 11px;
  }

  ${media.laptop} {
    font-size: 12px;
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 10px;
  color: #999999;
  padding: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${media.tablet} {
    font-size: 11px;
    width: 18px;
    height: 18px;
    padding: 2px;
  }

  ${media.laptop} {
    font-size: 12px;
    width: 12px;
    height: 12px;
    padding: 0;
  }

  &:hover {
    color: #000000;
  }
`;

export const DeleteIcon = styled.img`
  width: 12px;
  height: 12px;
  object-fit: contain;

  ${media.tablet} {
    width: 14px;
    height: 14px;
  }

  ${media.laptop} {
    width: 12px;
    height: 12px;
  }
`;
