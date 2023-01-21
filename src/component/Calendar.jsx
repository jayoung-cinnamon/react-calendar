import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import weekdayPlugin from "dayjs/plugin/weekday";
import objectPlugin from "dayjs/plugin/toObject";
import isTodayPlugin from "dayjs/plugin/isToday";
import DayOfWeek from "dayjs/plugin/weekOfYear";
const Calendar = () => {
  const current = dayjs().locale({});
  // const weekday = require("dayjs/plugin/weekday");
  // const isoWeek = require("dayjs/plugin/isoWeek");
  // const weekOfYear = require("dayjs/plugin/weekOfYear");
  dayjs.extend(weekdayPlugin);
  dayjs.extend(objectPlugin);
  dayjs.extend(isTodayPlugin);
  dayjs.extend(DayOfWeek);

  const [currentMonth, setCurrentMonth] = useState(current);
  const [arrayOfDays, setArrayOfDays] = useState([]);
  const [selectDate, setSelectDate] = useState(dayjs());
  const prevMonth = () => {
    const prev = currentMonth.subtract(1, "month");
    setCurrentMonth(prev);
  };
  const nextMonth = () => {
    const next = currentMonth.add(1, "month");
    setCurrentMonth(next);
  };

  //월,연도 구하기
  const getMonth = () => {
    const dateFormat = "M";
    const yearFormat = "YYYY";
    return (
      <Month>
        <button onClick={prevMonth}>←</button>
        {currentMonth.format(yearFormat)}년 {currentMonth.format(dateFormat)}월
        <button onClick={nextMonth}>→</button>
      </Month>
    );
  };

  const getWeek = () => {
    const dateFormat = "ddd";
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(
        <Week className="week" key={i}>
          {current.weekday(i).format(dateFormat)}
        </Week>
      );
    }
    return <WeekRow>{days}</WeekRow>;
  };
  // monthStart : 현재 달의 시작요일 (0:일요일 )
  // monthEnd : 현재달의 마지막일
  // startCalendar : monthStart가 속한 주의 첫 시작일
  // endCalendar: monthEnd가 속한 주의 마지막일
  // rows : 1주일 * 4 ~ 5 주
  // days : 1주일
  // const thisWeek = current.startOf("month").weekday(0).format();
  // const lastWeek = current.endOf("month").week();
  // //이전 월의 마지막날짜
  // const prevMonth = current.endOf("month").add(-1, "month").format("D");
  // //다음 월의 마지막 날짜
  // const nextMonth = current.startOf("month").add(+1, "month").format("ddd");

  // getDays();

  const [allDays, setAllDays] = useState([]);
  const [today, setToday] = useState(dayjs().get("D"));
  const getDays = () => {
    //시작요일 부터 마지막날짜까지
    const startDate = currentMonth.startOf("month").format("d");
    const endDate = currentMonth.endOf("month").format("D");
    const endDateIndex = currentMonth.endOf("month").format("d");
    console.log(dayjs(), "isToday??");
    // const startDate = currentMonth.startOf("month").weekday(0);
    // const endDate = currentMonth.endOf("month").format("D");
    // const lastMonth = [];
    // const currentMonth = [];
    const dateRow = [];
    for (let i = 0; i < startDate; i++) {
      dateRow.push("");
    }
    for (let i = 1; i <= endDate; i++) {
      dateRow.push(i);
    }

    for (let i = endDateIndex; i < 6; i++) {
      dateRow.push("");
    }

    setAllDays(dateRow);
  };

  useEffect(() => {
    getDays();
  }, [currentMonth]);
  let allDayRow = [];

  const onClickToday = (item) => {
    if (item === today) {
      alert("today!");
    }
  };

  const renderDays = () => {
    allDays.map((item, index) => {
      item === ""
        ? allDayRow.push(<EmptyDay key={index}></EmptyDay>)
        : allDayRow.push(
            <Day onClick={() => onClickToday(item)} key={index}>
              {item === today ? `${item}+today!` : item}
            </Day>
          );
    });
    return <Date>{allDayRow}</Date>;
  };
  // getDays();
  return (
    <CalendarContainer>
      {getMonth()}
      {getWeek()}
      {renderDays()}
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  padding: 50px;
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
    font-size: 18px;
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
`;
const Day = styled.div`
  height: 100px;
  border: 1px solid #53a8b6;
  cursor: pointer;
`;

const EmptyDay = styled(Day)`
  background-color: #d1d1d1;
`;
const Date = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
