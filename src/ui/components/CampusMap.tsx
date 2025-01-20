const CampusMap = () => {
    return (
        <div>
        <iframe
            className="h-screen w-screen"
            src="https://www.openstreetmap.org/export/embed.html?bbox=79.56560611724855%2C13.701237426461857%2C79.60980892181398%2C13.721916812271687&amp;layer=mapnik"
            style={{border: "1px solid black"}}>
        </iframe>
        
        <br/>
        </div>
    )
}

export default CampusMap;