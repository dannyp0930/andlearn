import { Form } from "react-bootstrap"
import { useState } from "react"
import { Link } from "react-router-dom"
import { MyButton } from "styles/Button"
import axios from "axios"
import styled from "styled-components"
import { apiInstance } from "api"
import { API_BASE_URL, ACCESS_TOKEN } from "constants"

const myToken = localStorage.getItem('accesstoken')

const MyForm = styled(Form)`
  @media screen and (min-width: 576px) {
    width: 50%;
  }
  width: 90%;
`

export function UserInfoEdit() {
  const [userName, setUserName] = useState('')
  const [userNameError, setUserNameError] = useState(false)
  const [dName, setDName] = useState('')
  const [checkName, setCheckName] = useState(false)
  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [imgFile, setImgFile] = useState(null);	//파일

  const api = apiInstance();

  function onChangeUserName(e) {
    setUserNameError(false)
    setUserName(e.target.value)
  }

  const handleChangeFile = (event) => {
    console.log(event.target.files)
    setImgFile(event.target.files);
    setImgBase64([]);
    
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
    // 파일 상태 업데이트
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      console.log(base64)
      if (base64) {
      //  images.push(base64.toString())
      var base64Sub = base64.toString()
        
      setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
      }
    }
  }

  function onCheckName() {
    api
      .post('/api/v1/users/duplicate-check-nickname', {
        nickname: userName,
      })
      .then((res) => {
        setDName('');
        setCheckName(true);
      })
      .catch((error) => {
        setDName('이미 존재하는 이름입니다.');
        setCheckName(false);
      })
  }

  function onSubmit() {
    // console.log(imgFile)
    console.log(userName)
    console.log(myToken)

    const data = {
      nickname: userName
    }

    // const fd = new FormData();
    // fd.append("file", imgFile);
    // fd.append("nickname", userName);

    axios
      .put(
          "https://j6c201.p.ssafy.io/api/v1/users/edit", data,
        {
          headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${myToken}`,
          },
        }
      )
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <div className="row justify-content-center">
      <MyForm>
        <Form.Group className="mb-3">
          <Form.Control
            maxLength={20}
            placeholder="Nickname"
            value={userName}
            onChange={onChangeUserName}
          />
        </Form.Group>
        <p>{dName}</p>
        {userNameError && (
          <div className="invalid-input">닉네임을 입력해주세요.</div>
        )}
        <div className="mb-3">
          {imgBase64.map((item, index) => {
            return(
              <img
                key={index}
                className="d-block w-100"
                src={item}
                alt="First slide"
                style={{width:"100%"}}
              />
            )
          })}
        </div>
        <Form.Group className="mb-3">
          <Form.Control 
            type="file" 
            id="file"
            onChange={handleChangeFile}
            placeholder="프로필 사진"
          />
        </Form.Group>
        <div className="d-grid gap-1 mb-3">
          <MyButton color="#58C063" onClick={() => {onSubmit(); onCheckName();}}>회원 정보 수정</MyButton>
        </div>
        <div>
          <Link to={`password`}>
            <MyButton color="#58C063">비밀번호 수정</MyButton>
          </Link>
        </div>
      </MyForm>
    </div>
  )
}