

export default function Settings(props) {

    if (!props.render) {
        return null;
    }

    return (
        <div className="fullWidth" style={{ paddingBottom: props.bottomPadding }}>
            <h1>Settings</h1>
        </div>
    )
}