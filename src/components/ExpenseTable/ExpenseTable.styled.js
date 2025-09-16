import styled from "styled-components";

export const TableContainer = styled.div`
  padding: 32px;
  height: 618px;
  position: relative;
`;

export const TableTitle = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.219em;
  color: #000000;
  margin: 0 0 24px 0;
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  padding-bottom: 14px;
  border-bottom: 0.5px solid #999999;
  margin-bottom: 14px;
`;

export const TableHeaderCell = styled.div`
  width: ${(props) => props.width};
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.219em;
  color: #999999;
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: 440px;
  overflow-y: auto;
  padding-right: 8px;

  /* Стили полосы прокрутки как в календаре */
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
  gap: 32px;
`;

export const TableCell = styled.div`
  width: ${(props) => props.width};
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.219em;
  color: #000000;
  display: flex;
  align-items: center;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #999999;
  padding: 0;
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #000000;
  }
`;

export const DeleteIcon = styled.img`
  width: 12px;
  height: 12px;
  object-fit: contain;
`;
