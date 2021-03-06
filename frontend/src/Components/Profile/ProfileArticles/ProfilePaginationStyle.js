import { Button, ButtonGroup, Form } from "react-bootstrap";
import styled from "styled-components";

export const PageContainer = styled(ButtonGroup)`
  padding: 1rem;
`;

export const PageItem = styled(Button)`
  border: solid 1px #58C063;
  background-color: ${props => props.current === 1 ? "#58C063" : "white"};
  color:  ${props => props.current === 1 ? "white" : "#58C063"};
  active: true;
  width: 2rem;

  &:focus {
    background-color: #58C063;
    border: solid 1px #58C063;
    box-shadow: none;
  }

  &:hover {
    background-color: #58C063;
    border: solid 1px #58C063;
  }

  &:disabled {
    background-color: white;
    color: #58C063;
    border: solid 1px #58C063;
  }
  
  &:active {
    box-shadow: none !important;
  }

  @media ( min-width: 768px ) {
    width: auto;
  }
`;


export const FormControl = styled(Form.Control)`

  &:focus {
    border: solid 1px #58C063;
    box-shadow: none;
  }
`;

export const PageButton = styled(Button)`
  background-color: #58C063;
  border: solid 1px #58C063;

  &:hover {
    background-color: white;
    color: #58C063;
    border: solid 1px #58C063;
  }

  &:focus {
    background-color: #58C063;
    border: solid 1px #58C063;
    color: white;
    box-shadow: none;
  }
  
  &:active {
    box-shadow: none !important;
  }
`;