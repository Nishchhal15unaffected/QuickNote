import React from "react";
import { Alert } from "react-bootstrap";
interface Props {
  variant: string;
  children: React.ReactNode;
}
const ErrorMessage: React.FC<Props> = ({ variant = "info", children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 20 }}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default ErrorMessage;
