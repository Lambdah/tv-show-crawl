/**
 * Page for /networks
 */
import React, { createRef, useState } from 'react';
import styled from "styled-components";
import NetworkFragment from "./child/NetworkFragment";

const ShowElement = styled.div`
    display: ${props => props.display};
`;

const HeaderElement = styled.div`
    
    @media (max-width: 991px){
        .network-header {
            font-size: 4.2em;
        }
        
        button {
            font-size: 1em;
            padding-left: 40em;
        }
    }
    
    @media (max-width: 767px){
        .network-header {
            font-size: 3em;
        }
        
        button {
            font-size: 0.8em;
            padding-left: 20em;
        }
    }
`

const NetworkSidebar = styled.div`
    @media (max-width: 991px){
        #network-sidebar{
            display: none;
        }
    }
`



export default function Networks(){
    const networks = ["CBC", "citytv", "much", "ctv", "global"];
    const [cbcExpanded, setCbcExpanded] = useState(false);
    const [citytvExpanded, setCitytvExpanded] = useState(false);
    const [muchExpanded, setMuchExpanded] = useState(false);
    const [ctvExpanded, setCtvExpanded] = useState(false);
    const [globalExpanded, setGlobalExpanded] = useState(false);


    const networkExpandList = {
        "CBC": [cbcExpanded, setCbcExpanded],
        "citytv": [citytvExpanded, setCitytvExpanded],
        "much": [muchExpanded, setMuchExpanded],
        "ctv": [ctvExpanded, setCtvExpanded],
        "global": [globalExpanded, setGlobalExpanded]
    };


    const expandRefs = networks.reduce((acc, value) => {
        acc[value] = createRef();
        return acc;
    }, {});

    const networkRefs = networks.reduce((acc, value) =>{
        acc[value] = createRef();
        return acc;
    }, {});

    const handleClick = id =>{
        networkRefs[id].current.scrollIntoView({
            behavior:'smooth',
            block: 'center'
        });
        handleExpand(id);
    };


    const handleExpand = id => {
        for (let key in networkExpandList) {
            if (key !== id && networkExpandList.hasOwnProperty(key)){
                const setExpand = networkExpandList[key][1];
                setExpand(false);
            }
        }
        const setter = networkExpandList[id][1];
        const result = networkExpandList[id][0];
        setter(!result);
    };

    return(
        <div className="container">
            <div className="row py-2">
                <NetworkSidebar className="col-0 order-2 pl-5 ml-5 d-flex px-4 bd-sidebar" id="sticky-sidebar">
                    <div id="network-sidebar" className="position-fixed text-left py-5">
                        <div className="sidebar-header" style={{paddingTop:100}}>
                            <h4>Networks</h4>
                        </div>
                        <ul className="list-unstyled components">
                            {networks.map(network =>
                                <li key={network}><button type="button" className="btn btn-link" onClick={() => handleClick(network)}>{network}</button></li>)}
                        </ul>
                    </div>
                </NetworkSidebar>{/* Side bar*/}
                <div className="col" id="main" style={{paddingTop: 90}}>

                    {networks.map((network, index) =>
                        <div className="network-element" key={network+index}>
                            <HeaderElement className="row">
                                <div className="display-3 network-header text-left col-lg-11 col-sm-0" ref={networkRefs[network]}>{network}</div>
                                <button type="button" ref={expandRefs[network]} onClick={() => handleExpand(network)}
                                        className="mt-lg-5 col-lg-1 col-sm-0 align-text-bottom text-right text-black-50 btn btn-link">{networkExpandList[network][0] ? "Collapse" : "Expand"}</button>
                            </HeaderElement>
                            <hr style={{marginTop: 0}}/>
                            <ShowElement display={networkExpandList[network][0] ? "block" : "none"}>
                                <NetworkFragment network={network}/>
                            </ShowElement>
                        </div>

                    )}
                </div>
            </div>

        </div>

    )

}