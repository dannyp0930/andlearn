import { useParams, useNavigate } from "react-router-dom";
import { Comments } from "../Comments/Comments";
import { Update } from "../Update/Update"
import * as S from "./Style";
import { MyButton } from "styles/Button";
import { Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { apiInstance } from "api";
import { API_BASE_URL } from "constants";
import { DateFormat } from 'Util/DateFormat';

export function Detail() {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [me, setMe] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    apiInstance().get(API_BASE_URL + '/users/me')
      .then((response) => setMe(response.data.nickname))
  }, [me])

  useEffect(() => {
    apiInstance().get(API_BASE_URL + `/community/${articleId}`)
    .then(resposne => setArticle(resposne.data))
    // .then(console.log(article))/
  }, [articleId])

  const handleClick = () => {
    apiInstance().delete(API_BASE_URL + `/community/${articleId}`)
      .then(navigate('/community'))
      .then(navigate(0))
  }

  return (
    <S.Article>
      <S.Header>
        <S.Title xs={10}>{article.title}</S.Title>
        <S.Created>{DateFormat(article.createdAt)}</S.Created>
        <S.Created>{DateFormat(article.updatedAt)}</S.Created>
      </S.Header>
      <S.SubHeader>
        <S.User>{article.nickname}</S.User>
        {article.nickname === me && 
          <>
            <Col xs={7}/>
            <Col>
              <MyButton
                color="red"
                size="sm"
                onClick={handleClick}
              >
                삭제
              </MyButton>
            </Col>
            <Update title={article.title} content={article.content}/>
          </>
        }
      </S.SubHeader>
      <S.Body>{article.content}</S.Body>
      <Comments></Comments>
    </S.Article>
  )
};
