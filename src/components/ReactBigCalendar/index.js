import React, { useState, useMemo  } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/pt-br';
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);

  const { defaultDate, formats } = useMemo(
    () => ({
      defaultDate: new Date(),
      formats: {
        weekdayFormat: (date, culture, localizer) =>
          localizer.format(date, 'dddd', culture),
      },
    }),
    []
  )

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      setEventsData([
        ...eventsData,
        {
          start,
          end,
          title
        }
      ]);
  };
  return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView="month"
        events={eventsData}
        formats={formats}
        style={{ height: "70vh", width: "100%" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}
