

let Note = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <pre>{props.note}</pre>
            <p>{props.date}</p>
        </div>
    );
}

export default Note;