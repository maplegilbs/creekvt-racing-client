

export default function CourseDetails({details}) {
    return (
        <>
        <br/>
        <div dangerouslySetInnerHTML={{__html: details}} />
        </>
    );
}

