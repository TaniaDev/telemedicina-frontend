import React, { useState, useMemo, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/pt-br';
// import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from '../../services/api'

// https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props--events
// https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props-full-prop-list--page
// https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props--cal-views

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState([]);
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
      getAppointments()
  },[])

  async function getAppointments(){
    const response = await api.get(`/consultas/getMyAppointments/all`)
    setAppointments(response.data)
    const items = response.data
    const aux = []
    items.map(item => {
      aux.push({
        id: item.id,
        start: moment(`${item.dt_hr_consulta}`)._d ,
        end: moment(`${item.dt_hr_consulta}`).add(1, 'h')._d,
        title: `Consulta ${item.id}`
      })
    })
    setEventsData(aux)
  }

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

  // const handleSelect = ({ start, end }) => {
  //   const title = window.prompt("New Event name");
  //   if (title)
  //     setEventsData([
  //       ...eventsData,
  //       {
  //         start,
  //         end,
  //         title
  //       }
  //     ]);
  // };

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
        // onSelectSlot={handleSelect}
      />
    </div>
  );
}
