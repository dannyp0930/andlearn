import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useParams } from "react-router-dom"
import * as S from "./ProfileStatsStyle";

export function ProfileStats() {
  const { userId } = useParams();
  const [myLearns, setMyLearns] = useState([]);
  const [myLearnCounts, setMyLearnCounts] = useState(Array.from({length: 368}, () => 0));
  const [dailyBoxs, setDailyBoxs] = useState();
  const [myNowDate, setMyNowDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
  const [myLastDate, setMyLastDate] = useState(new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate() - 1));
  const [period, setPeriod] = useState('');
  const [streakDays, setStreakDays] = useState(0);
  const [streakPeriod, setStreakPeriod] = useState('');

  // 임시 러닝 목록
  useEffect(() => {
    setMyLearns([
      { id: 0, created_at: '2021-03-23 11:14:00'},
      { id: 1, created_at: '2021-09-23 11:14:00'},
      { id: 2, created_at: '2022-03-21 11:14:00'},
      { id: 3, created_at: '2022-03-22 11:14:00'},
      { id: 4, created_at: '2022-03-23 11:14:00'},
      { id: 5, created_at: '2022-03-24 11:14:00'},
      { id: 6, created_at: '2012-03-24 11:14:00'},
      { id: 7, created_at: '2022-03-20 11:14:00'},
      { id: 8, created_at: '2022-03-28 11:14:00'},
    ]);
  }, [])

  // 러닝 목록에서 날짜를 추출한 뒤, 해당 날짜에 몇 번 공부했는지 카운트
  useEffect(() => {
    const newDate = new Date();
    const lastDate = new Date(newDate.getFullYear() - 1, newDate.getMonth(), newDate.getDate() - 1);

    for (let j = 0; j < myLearns.length; j++) {
      const checkBoxDate = new Date(myLearns[j].created_at);
      const diffMSec = checkBoxDate.getTime() - lastDate.getTime();
      const diffDays = parseInt(diffMSec / 1000 / 60 / 60 / 24);

      if (diffDays >= 0) {
        myLearnCounts[diffDays] += 1;
      }      
    }
  }, [myLearns])

  // 1년 동안 공부한 내용을 바탕으로 잔디 색칠
  useEffect(() => {
    const myStats = () => {
      const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const backgroundColors = ['gray', 'crimson']
      // 색깔 범위? 0개 gray, 1~3개 옅게
      
      const newDate = new Date();
      const nowDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())
      const lastDate = new Date(newDate.getFullYear() - 1, newDate.getMonth(), newDate.getDate() - 1)
      const elapsedMSec = nowDate.getTime() - lastDate.getTime();
      const elapsedDay = elapsedMSec / 1000 / 60 / 60 / 24;
      const result = []
      var checkMonth = lastDate.getMonth() - 1;
  
      for (let i = 0; i < elapsedDay + 1; i++) {
        // 요일을 표시할 박스 선택
        if (i === 1 || i === 3 || i === 5) {
          const weekDate = new Date(newDate.getFullYear() - 1, newDate.getMonth(), newDate.getDate() - 1 + i)
          const weekNum = weekDate.getDay()
          result.push(
            <S.DailyBox key={i} style={{ position: 'relative', backgroundColor: `${backgroundColors[myLearnCounts[i]]}` }}>
              <S.WeekText>{week[weekNum]}</S.WeekText>
            </S.DailyBox>
          )
        } else if (i % 7 === 0) {
          const checkMonthDate = new Date(newDate.getFullYear() - 1, newDate.getMonth(), newDate.getDate() - 1 + i)
          const checkNextMonthDate = new Date(newDate.getFullYear() - 1, newDate.getMonth(), newDate.getDate() - 1 + i + 7)
          // 이전 세로줄에서 달이 바뀌었다면 위에 표시
          if (checkMonth !== checkMonthDate.getMonth()) {
            checkMonth = (checkMonth + 1) % 12
            result.push(
              <S.DailyBox key={i} style={{ position: 'relative', backgroundColor: `${backgroundColors[myLearnCounts[i]]}` }}>
                <S.MonthText>{month[checkMonth]}</S.MonthText>
              </S.DailyBox>
            )
          } else {
            result.push(
              <S.DailyBox key={i} style={{ backgroundColor: `${backgroundColors[myLearnCounts[i]]}` }}></S.DailyBox>
            );
          }
        } else {
          result.push(
            <S.DailyBox key={i} style={{ backgroundColor: `${backgroundColors[myLearnCounts[i]]}` }}></S.DailyBox>
          );
        }
      }
      return result;
    }

    setDailyBoxs(myStats());
  }, [myLearns])

  // 총 학습량 계산
  const totalLearnNum = () => {
    var result = 0;

    for (let i = 0; i < myLearnCounts.length; i++) {
      if (myLearnCounts[i] > 0) {
        result += myLearnCounts[i]
      }
    }

    return result;
  }

  // 1년 주기 문자로 표시
  useEffect(() => {
    const yearLearnPeriod = () => {
      const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
      const result = `${month[myLastDate.getMonth()]} ${myLastDate.getDate()}, ${myLastDate.getFullYear()}
                      - ${month[myNowDate.getMonth()]} ${myNowDate.getDate()}, ${myNowDate.getFullYear()}
                    `
      return result
    };

    setPeriod(yearLearnPeriod());
  }, [])

  // 최근 연속 학습일 계산
  useEffect(() => {
    var days = 0;
    var dateNums = []; // endDay, startDay

    for (let i = myLearnCounts.length - 1; i >= 0; i--) {
      if (dateNums.length === 0) {
        if (myLearnCounts[i] > 0) {
          dateNums.push(i)
        }
      }      
      if (dateNums.length === 1) {
        if (myLearnCounts[i] === 0) {
          dateNums.push(i + 1)
        }
      }
      if (dateNums.length === 2) {
        break;
      }
    };

    days = dateNums[0] - dateNums[1] + 1;
    const startDate = new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate() - 1 + dateNums[1])
    const endDate = new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate() - 1 + dateNums[0])
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
    const result = `${month[startDate.getMonth()]} ${startDate.getDate()}
                    - ${month[endDate.getMonth()]} ${endDate.getDate()}
                  `

    setStreakDays(days);
    setStreakPeriod(result)
  }, [myLearns])

  return(
    <div>
      <S.CalendarBox className="d-flex flex-column justify-content-end align-items-end overflow-hidden mx-auto pt-2">
        <S.Calendar className="d-flex flex-column flex-wrap overflow-hidden ps-4 pt-3">
          {dailyBoxs}
        </S.Calendar>
      </S.CalendarBox>
      
      <S.StatsRow className="mx-auto">
        <Col style={{ border: '1px solid gray', borderRight: 'none', borderBottomLeftRadius: '6px'}} >
          <S.StatsText className="mb-0">1년간 총 학습량</S.StatsText>
          <S.StatsNum>{totalLearnNum().toLocaleString()} total</S.StatsNum>
          <S.StatsText className="mt-0">{period}</S.StatsText>
        </Col>
        <Col style={{ border: '1px solid gray', borderBottomRightRadius: '6px'}} >
          <S.StatsText className="mb-0">최근 연속 학습일</S.StatsText>
          <S.StatsNum>{streakDays} days</S.StatsNum>
          <S.StatsText className="mt-0">{streakPeriod}</S.StatsText>
        </Col>
      </S.StatsRow>
    </div>
  )
}