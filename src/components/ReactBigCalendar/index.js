import React, { useState, useMemo, useEffect } from "react";
import ReactDOM from 'react-dom'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/pt-br';
// import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from '../../services/api'
import CardConsulta from '../CardConsulta'

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
        id_especialidade: item.id_especialidade,
        id_medico: item.id_medico,
        id_paciente: item.id_paciente,
        status: item.status,
        dt_hr_consulta: item.dt_hr_consulta,
        url_consulta: item.url_consulta,
        start: moment(`${item.dt_hr_consulta}`)._d ,
        end: moment(`${item.dt_hr_consulta}`).add(1, 'h')._d,
        title: `Consulta ${item.nome}`
      })
    })
    setEventsData(aux)
  }

  setInterval(getAppointments, 60000)

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

  function openModal(e){
    ReactDOM.render(
      <React.StrictMode>
        <div>
          <CardConsulta id_consulta={e.id} id_especialidade={e.id_especialidade} id_medico={e.id_medico} id_paciente={e.id_paciente} status={e.status} data={e.dt_hr_consulta} url_consulta={e.url_consulta} />
        </div>
      </React.StrictMode>
    )
  }

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
        onSelectEvent={(event) => openModal(event)}
        // onSelectSlot={handleSelect}
      />


      {/* CardConsulta({id_consulta, id_especialidade, id_medico, id_paciente, status, data, url_consulta}) */}
      {/* <CardConsulta 
        style={{minWidth: '200px'}}
        key={appointment.id} 
        id_consulta={appointment.id} 
        status={appointment.status} 
        id_especialidade={appointment.id_especialidade} 
        id_medico={appointment.id_medico} 
        id_paciente={appointment.id_paciente} 
        data={appointment.dt_hr_consulta}
        url_consulta={appointment.url_consulta}
      /> */}
    </div>
  );
}
