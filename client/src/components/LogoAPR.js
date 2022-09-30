import { BsDropletHalf } from "react-icons/bs";
import { IconContext } from "react-icons/lib";




const LogoAPR = (props) => {
    return (
        <IconContext.Provider
            value={{ 
                size: "5em", 
                color: "#1BAFFF", 
                className: "global-class-name" }}>
            <span style={{display: 'flex', margin: '5px 20px 0px 20px', 
                        padding: '5px 10px 0px 10px'}}>
                <BsDropletHalf
                    style={{marginTop: '0'}}
                />
                <h3 style={{
                        marginLeft: '10px', 
                        fontSize: '2.8em',
                        marginTop: '0em',
                        lineHeight: '0.6em',
                    }}
                >
                    Tu   
                    <span style={{color: '#1BAFFF'}}> A </span> 
                    <span style={{color: '#2667FF'}}> P </span>
                    <span style={{color: '#0040D5'}}> R</span>
                </h3>
            </span>
        </IconContext.Provider>

    )
}


export default LogoAPR;