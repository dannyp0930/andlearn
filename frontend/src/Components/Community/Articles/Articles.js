import { DateFormat } from '../module/module';
import * as S from './Style';

const nowTime = new Date();

export default function Articles({ notices, articles, offset, limit, currentUser }) {
  const NoSearchItems = () => {
    return (
      <div style={{margin: "5rem"}}>
        <h3>
          검색결과가 없습니다.
        </h3>
      </div>
    )
  }
  return (
    <S.Table>
      <S.TableHead>
        <S.ColumnName xs={1}>#</S.ColumnName>
        <S.ColumnName xs={7}>제목</S.ColumnName>
        <S.ColumnName xs={2}>작성자</S.ColumnName>
        <S.ColumnName xs={2}>날짜</S.ColumnName>
      </S.TableHead>
      {notices.map((notice) => (
        <S.TableNoticeRow key={notice.id}>
          <S.Column xs={1}>공지</S.Column>
          <S.Column xs={7}>
            <S.DetailLink
              to={`${notice.id}`}
            >
              {notice.title}
            </S.DetailLink>
          </S.Column>
          <S.Column xs={2}>{notice.userId}</S.Column>
          <S.Column xs={2}>
            {DateFormat(nowTime, notice.createdAt)}
          </S.Column>
        </S.TableNoticeRow>
      ))}
      {articles.slice(offset, offset + limit).map((article) => (
        <S.TableRow key={article.id}>
          <S.Column xs={1}>{article.id}</S.Column>
          <S.Column xs={7}>
            <S.DetailLink
              to={`${article.id}`}
            >
              {article.title}
            </S.DetailLink>
          </S.Column>
          <S.Column xs={2}>{article.userId}</S.Column>
          <S.Column xs={2}>{DateFormat(nowTime, article.createdAt)}</S.Column>
        </S.TableRow>
      ))}
      {(articles.length === 0) && (<NoSearchItems />)}
    </S.Table>
  )
};
