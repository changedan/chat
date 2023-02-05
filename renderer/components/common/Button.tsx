import styled from "@emotion/styled";

interface ButtonTypes {
  type: "button" | "submit";
  title: string;
  color?: string;
  buttonColor?: {
    border?: string;
    background?: string;
  };
  onClick?: () => void;
}

const Button = ({ type, title, color, buttonColor, onClick }: ButtonTypes) => {
  return (
    <StyledButton
      type={type}
      color={color}
      buttonColor={buttonColor}
      onClick={onClick}
    >
      {title}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<Pick<ButtonTypes, "buttonColor">>`
  border: 1px solid ${({ buttonColor }) => buttonColor?.border};
  background-color: ${({ buttonColor }) => buttonColor?.background};
  color: ${({ color }) => color};
  padding: 15px 0 15px;
  margin: 10px 0 9px;
  width: 460px;
  cursor: pointer;
`;

Button.defaultProps = {
  color: "#dadada",
  buttonColor: {
    border: "#585858",
    background: "#585858",
  },
};
