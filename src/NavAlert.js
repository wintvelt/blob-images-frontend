import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { useState } from 'react';

const message = {
    title: "Foto uploads tijdelijk ff niet mogelijk",
    content: "We doen aan de achterkant wat onderhoud. "
        + "Waarschijnlijk kan je later vanavond alweer los gaan."
}

const alertStyle = {
    position: 'absolute', width: "60%", top: '8px', left: '20%'
}

export default function Announcement(props) {
    const [open, setOpen] = useState(true)
    return (message.title && open) ?
        <Alert style={alertStyle} severity="info" onClose={() => { setOpen(false) }}>
            <AlertTitle>{message.title}</AlertTitle>
            {message.content}
        </Alert>
        : <></>
}