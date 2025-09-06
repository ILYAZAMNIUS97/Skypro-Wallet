import styled from "styled-components";

export const CardPageContainer = styled.div`
  padding: 25px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const CardHeader = styled.div`
  margin-bottom: 30px;
`;

export const CardBackButton = styled.button`
  background: none;
  border: none;
  color: #565eef;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

export const CardContent = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
`;

export const CardTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 30px;
  color: #000;
`;

export const CardInfo = styled.div`
  margin-bottom: 30px;

  h3 {
    font-size: 18px;
    margin-bottom: 20px;
    color: #000;
  }

  p {
    margin-bottom: 10px;
    font-size: 14px;
    color: #000;
  }
`;

export const CardDescription = styled.div`
  h4 {
    font-size: 16px;
    margin-bottom: 15px;
    color: #000;
  }

  p {
    font-size: 14px;
    line-height: 1.6;
    color: #000;
  }
`;
