import { useState } from "react"
import { Alert, Form } from "react-bootstrap"
import { MyButton } from "styles/Button";
import { apiInstance } from "api";
import { useNavigate } from "react-router-dom";
import { Input } from "styles/Input";
import styled from "styled-components";

const MyForm = styled(Form)`
  margin-top: 2rem;
  width: 80%;

  @media screen and (min-width: 768px) {
    width: 40%;
  }

  @media screen and (min-width: 1200px) {
    width: 30%;
  }
`

export function PasswordEdit() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const navigate = useNavigate();
  const api = apiInstance();

  function onChangePassword(e) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,}$/
    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false)
    else setPasswordError(true)

    if (!confirmPassword || e.target.value === confirmPassword)
      setConfirmPasswordError(false)
    else setConfirmPasswordError(true)
    setPassword(e.target.value)
  }

  function onChangeConfirmPassword(e) {
    if (password === e.target.value) setConfirmPasswordError(false)
    else setConfirmPasswordError(true)
    setConfirmPassword(e.target.value)
  }

  function onSubmit() {
    if (password) {
      api
        .put('/users/edit-password', { password: password })
        .then(setTimeout(() => {
          navigate(-1)
        }, 500))
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <div className="row justify-content-center">
      <MyForm>
        <Form.Group className="mb-4">
          <Input
            maxLength={20}
            style={{
              width: "100%",
              margin: 0
            }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
          />
          {passwordError && (
            <Alert variant="warning" style={{ marginTop: "1rem"}} className="invalid-input">
              ?????? 8??????, ??????, ??????, ???????????? ?????? ??????????????????.
            </Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-4">
          <Input
            maxLength={20}
            style={{
              width: "100%",
              margin: 0
            }}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />
          {confirmPasswordError && (
            <Alert variant="warning" style={{ marginTop: "1rem"}} className="invalid-input">
              ??????????????? ???????????? ????????????.
            </Alert>
          )}
          { !password && (
            <Alert variant="warning" style={{ marginTop: "1rem"}} className="invalid-input">
              ??????????????? ???????????????.
            </Alert>
          )}
        </Form.Group>
        <MyButton
          style={{
            width: "100%",
            marginBottom: "1.5rem"
          }}
          onClick={onSubmit}
          
        >
          ???????????? ??????
        </MyButton>
        <MyButton
          style={{width: "100%"}}
          onClick={() => {navigate(-1)}}
        >
          ????????????
        </MyButton>
      </MyForm>
    </div>
  )
}