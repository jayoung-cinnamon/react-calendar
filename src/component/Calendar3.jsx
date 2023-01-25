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
  const [selected, setSelected] = useState(false);
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
    setSelected(current.format("YYYYMMDD"));
  };

  const getMonth = () => {
    const yearFormat = "YYYY";
    const dateFormat = "MMMM";
    return (
      <Month>
        <MonthWrapper>
          <span className="month">
            {currentMonth.format(dateFormat)}
            <button onClick={prevMonth} className="prev"></button>
            <button onClick={nextMonth} className="next"></button>
          </span>
          <span className="year">{currentMonth.format(yearFormat)}</span>
        </MonthWrapper>
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
  const onClickSelect = (item) => {
    let result = item.format("YYYYMMDD");
    setSelected(result);
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
      <EmptyDay onClick={prevMonth} key={index}>
        {item}
      </EmptyDay>
    ));
    const currentComponent = currentDayRow.map((item, index) => (
      <div
        className={selected === item.format("YYYYMMDD") ? "selectDay" : ""}
        onClick={() => onClickSelect(item)}
        key={index}
      >
        <Day>
          {item.isToday() ? (
            <span className="today">{item.format(dayFormat)}</span>
          ) : (
            <span>{item.format(dayFormat)}</span>
          )}
        </Day>
      </div>
    ));
    const nextComponent = nextDayRow.map((item, index) => (
      <EmptyDay onClick={nextMonth} key={index}>
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
  };

  useEffect(() => {
    getDay();
  }, [currentMonth]);

  return (
    <CalendarContainer>
      <GoToday onClick={goToday}>Today</GoToday>
      {getMonth()}
      {getWeek()}
      {getDay()}
    </CalendarContainer>
  );
};

export default Calendar2;

const CalendarContainer = styled.div`
  padding: 50px;
  min-width: 700px;
  max-width: 1024px;
  position: relative;
  .selectDay {
    background-color: #146aad;
    color: white;
  }
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
  border-bottom: 4px solid black;
  color: black;
`;
const MonthWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .month {
    width: 100%;
    font-size: 100px;
    letter-spacing: 5px;
    font-weight: 900;
  }

  .year {
    font-size: 20px;
    font-weight: 900;
  }
  .prev,
  .next {
    position: relative;
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: transparent;
    box-shadow: none;
    cursor: pointer;
  }

  .prev::after {
    position: absolute;
    left: -10;
    top: 1;
    content: "";
    width: 10px; /* 사이즈 */
    height: 10px; /* 사이즈 */
    border-top: 2px solid #000; /* 선 두께 */
    border-right: 2px solid #000; /* 선 두께 */
    transform: rotate(225deg); /* 각도 */
  }
  .next::after {
    position: absolute;
    right: 0;
    top: 1;
    content: "";
    width: 10px; /* 사이즈 */
    height: 10px; /* 사이즈 */
    border-top: 2px solid #000; /* 선 두께 */
    border-right: 2px solid #000; /* 선 두께 */
    transform: rotate(45deg); /* 각도 */
  }
`;
const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 20px;
  place-items: center;
  font-size: 15px;
  font-weight: 900;
  letter-spacing: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  .sun {
    color: #ee1f1fac;
  }
  .sat {
    color: #2828f6;
  }
`;
const Day = styled.div`
  height: 100px;
  border: 1px solid #e1dfdf;
  height: 80px;
  font-size: 20px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  position: relative;
  cursor: pointer;
  .today::after {
    content: "❣️";
    position: absolute;
    top: 10px;
  }
`;

const EmptyDay = styled(Day)`
  background-color: #efefef;
  color: #ffffff;
`;

const Date = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
