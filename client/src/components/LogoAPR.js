import { BsDropletHalf } from "react-icons/bs";
import { IconContext } from "react-icons/lib";




const LogoAPR = (props) => {
    return (
        <IconContext.Provider
            value={{ 
                size: "5rem", 
                color: "#1BAFFF", 
                className: "global-class-name" }}>
            <span style={{display: 'flex', margin: '5px 20px 0px 20px', 
                        padding: '5px 10px 0px 10px'}}>
                <BsDropletHalf
                    style={{marginTop: '0', height: '4rem'}}
                />
                <h3 style={{
                        marginLeft: '10px', 
                        fontSize: '2.8rem',
                        marginTop: '0em',
                        lineHeight: '0.6em',
                    }}
                >
                    Tu   
                    <span style={{color: '#1BAFFF', fontSize: '2.8rem'}}> A </span> 
                    <span style={{color: '#2667FF', fontSize: '2.8rem'}}> P </span>
                    <span style={{color: '#0040D5', fontSize: '2.8rem'}}> R</span>
                </h3>
            </span>
        </IconContext.Provider>

    )
}


export default LogoAPR;