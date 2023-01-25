import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import weekdayPlugin from "dayjs/plugin/weekday";
import objectPlugin from "dayjs/plugin/toObject";
import isTodayPlugin from "dayjs/plugin/isToday";
import DayOfWeek from "dayjs/plugin/weekOfYear";

const Calendar2 = () => {
  dayjs.extend(weekdayPlugin);
  dayjs.extend(objectPlugin);
  dayjs.extend(isTodayPlugin);
  dayjs.extend(DayOfWeek);
  const current = dayjs();
  const [currentMonth, setCurrentMonth] = useState(current);
  const [selected, setSelected] = useState();
  //dayjs()에서 add로 저번달, 다음달 month정보를 받아와 setState해주기
  const prevMonth = () => {
    const prev = currentMonth.add(-1, "month");
    setCurrentMonth(prev);
  };
  const nextMonth = () => {
    const next = currentMonth.add(1, "month");
    setCurrentMonth(next);
  };
  const goToday = () => {
    setCurrentMonth(current);
  };

  const getMonth = () => {
    const dateFormat = "M";
    const yearFormat = "YYYY";
    return (
      <Month>
        <button onClick={prevMonth}> 이전 </button>
        {currentMonth.format(yearFormat)}년{currentMonth.format(dateFormat)}월
        <button onClick={nextMonth}> 다음 </button>
      </Month>
    );
  };
  const getWeek = () => {
    const dayFormat = "ddd";
    const date = [];
    const dateComponent = [];
    //dayjs()의 .day()는 요일을 리턴해준다
    for (let i = 0; i < 7; i++) {
      date.push(currentMonth.day(i).format(dayFormat));
    }
    date.map((item, index) => {
      if (index === 0) {
        dateComponent.push(
          <Week key={index} className="sun">
            {item}
          </Week>
        );
      } else if (index === 6) {
        dateComponent.push(
          <Week key={index} className="sat">
            {item}
          </Week>
        );
      } else {
        dateComponent.push(<Week key={index}>{item}</Week>);
      }
    });
    return <WeekRow>{dateComponent}</WeekRow>;
  };
  const onClickSelect = ({ item }) => {
    console.log(item.format("D"));
  };
  const onClickNextDisabled = () => {
    setCurrentMonth(current.add(1, "month"));
  };
  const onClickPrevDisabled = () => {
    setCurrentMonth(current.add(-1, "month"));
  };
  let preDayRow = [];
  let currentDayRow = [];
  let nextDayRow = [];

  const getDay = () => {
    //20230101형식
    const allFormat = "YYYYMMDD";
    //요일
    const dateFormat = "d";
    //해당 월의 시작 요일
    const startDateOfCurrent = Number(
      currentMonth.startOf("month").format(dateFormat)
    );

    const formattedCurrentDay = currentMonth.startOf("month");

    //해당 월의 마지막 요일
    const endDateOfCurrent = Number(
      currentMonth.endOf("month").format(dateFormat)
    );
    //저번 달 마지막 요일
    const lastDateOfPrev = Number(
      currentMonth.endOf("month").add(-1, "month").format(dateFormat)
    );

    //날짜
    const dayFormat = "D";

    //해당 월의 마지막 날짜
    const endDayOfCurrent = Number(
      currentMonth.endOf("month").format(dayFormat)
    );

    //저번 달 마지막 날짜
    const lastDayOfPrev = Number(
      currentMonth.add(-1, "month").endOf("month").format(dayFormat)
    );

    //저번달 날짜 배열
    if (startDateOfCurrent !== 0) {
      for (let i = 0; i < startDateOfCurrent; i++) {
        preDayRow.unshift(lastDayOfPrev - i);
      }
    }
    //해당월 날짜 배열
    for (let i = 0; i < endDayOfCurrent; i++) {
      currentDayRow.push(formattedCurrentDay.add(i, "day"));
    }

    //다음달 날짜 배열
    if (endDateOfCurrent !== 6) {
      for (let i = 1; i < 7 - endDateOfCurrent; i++) {
        nextDayRow.push(i);
      }
    }
    const prevComponent = preDayRow.map((item, index) => (
      <EmptyDay onClick={onClickPrevDisabled} key={index}>
        {item}
      </EmptyDay>
    ));
    const currentComponent = currentDayRow.map((item, index) => (
      <Day onClick={() => onClickSelect({ item })} key={index}>
        {item.isToday() ? (
          <Today className="">{item.format(dayFormat)}</Today>
        ) : (
          item.format(dayFormat)
        )}
      </Day>
    ));
    const nextComponent = nextDayRow.map((item, index) => (
      <EmptyDay onClick={onClickNextDisabled} key={index}>
        {item}
      </EmptyDay>
    ));
    return (
      <Date>
        {prevComponent}
        {currentComponent}
        {nextComponent}
      </Date>
    );
    // return preDayRow, currentDayRow, nextDayRow;
  };

  useEffect(() => {
    getDay();
  }, [currentMonth]);

  return (
    <CalendarContainer>
      <GoToday onClick={goToday}>현재달로</GoToday>
      {getMonth()}
      {getWeek()}
      {getDay()}
    </CalendarContainer>
  );
};

export default Calendar2;

const CalendarContainer = styled.div`
  padding: 50px;
  width: 100%;
`;

const GoToday = styled.button`
  border: none;
  border-radius: 100%;
  font-size: 12px;
  color: gray;
  height: 25px;
  cursor: pointer;
`;
const Month = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 800;
  color: #5585b5;
  button {
    border: none;
    border-radius: 100%;
    width: 30px;
    line-height: 0.3;
    height: 30px;
    color: white;
    font-size: 10px;
    cursor: pointer;
    background: #79c2d0;
  }
`;
const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid #79c2d0;
  padding: 3px;
  place-items: center;
`;
const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  .sun {
    color: red;
  }
  .sat {
    color: blue;
  }
`;
const Day = styled.div`
  height: 100px;
  border: 1px solid #53a8b6;
  cursor: pointer;
`;

const EmptyDay = styled(Day)`
  background-color: #ede7e7;
  color: #a8a8a8;
`;
const Today = styled(Day)`
  background-color: #ffa8b7;
`;
const Date = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;