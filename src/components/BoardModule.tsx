
interface SwitchProps {
    moduleType: string;
}

const BoardModule = ({ moduleType }: SwitchProps) => {
    let colour: string = "";
    switch (moduleType) {
        case "highpass":
            colour = "#81a5d3";
            break;
        case "lowpass":
            colour = "#2f5b91";
            break;
        case "bandpass":
            colour = "#25849a";
            break;
        case "notch":
            colour = "#27b8b8";
            break;
        case "delay":
            colour = "#d33950";
            break;
        case "reverb":
            colour = "#811030";
            break;
        case "feedback":
            colour = "#c6682e";
            break;
        case "pingpong":
            colour = "#633a0f";
            break;
        case "chorus":
            colour = "#13ca78";
            break;
        case "distortion":
            colour = "#4f2385";
            break;
        case "wah":
            colour = "#c8b746";
            break;
        case "phaser":
            colour = "#804b4b";
            break;
        case "widener":
            colour = "#d1a38f";
            break;
        case "vibrato":
            colour = "#bc0bac";
            break;
        case "bitcrusher":
            colour = "#8fd1b3";
            break;
        case "chebyshev":
            colour = "#e1df7a";
            break;
    }

    const backColourStyle = {
        backgroundColor: colour,
    };


    return (
        <div className={"back-colour-board"} style={backColourStyle}>
            <div className={"outerblack"}>
                <div className="screen"></div>
                <div className="details">  </div>
            </div>
        </div>
    );
};

export default BoardModule;