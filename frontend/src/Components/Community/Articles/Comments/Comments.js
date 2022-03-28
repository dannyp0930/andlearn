import { Create } from "./Create/Create";
import { Col } from "react-bootstrap";
import { DateFormat } from "../../module/module";
import * as S from "./Style";

const nowTime = new Date();
const userId = 1;
const comments = [
  {id: 1, userId: 1, body: "안녕하세요", created_at: "2022. 03. 14 11:10"},
  {id: 2, userId: 2, body: "반갑습니다", created_at: "2022. 03. 15 11:10"},
  {id: 3, userId: 3, body: "안녕히 계세요", created_at: "2022. 03. 16 11:10"},
  {id: 4, userId: 4, body: "수고하세요", created_at: "2022. 03. 21 11:10"},
];

export function Comments() {
  return (
    <S.Comments>
      <S.Header>댓글 {comments.length}개</S.Header>
      {comments.map((comment) => (
        <S.Comment key={comment.id} >
          <S.User xs={2}>{comment.userId}</S.User>
          <S.Body xs={7}>{comment.body}</S.Body>
          <Col xs={1}>
            {(userId === comment.userId) && <S.Button>삭제</S.Button>}
          </Col>
          <S.Created xs={2}>{DateFormat(nowTime, comment.created_at)}</S.Created>
        </S.Comment>
      ))}
      <Create />
    </S.Comments>
  )
};