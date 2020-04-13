/**
 * Page for /networks
 */
import React, { createRef, useState } from 'react';
import styled from "styled-components";
import NetworkFragment from "./child/NetworkFragment";

const ShowElement = styled.div`
    display: ${props => props.display};
`;

export default function Networks(){
    const networks = ["CBC", "citytv", "much"];
    const [cbcExpanded, setCbcExpanded] = useState(false);
    const [citytvExpanded, setCitytvExpanded] = useState(false);
    const [muchExpanded, setMuchExpanded] = useState(false);


    const networkExpandList = {
        "CBC": [cbcExpanded, setCbcExpanded],
        "citytv": [citytvExpanded, setCitytvExpanded],
        "much": [muchExpanded, setMuchExpanded]
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
                <div className="col-0 order-2 pl-5 ml-5 py-5 d-flex bd-sidebar" id="sticky-sidebar">
                    <div className="position-fixed text-left px-4">
                        <div className="sidebar-header" style={{paddingTop:30}}>
                            <h4>Networks</h4>
                        </div>
                        <ul className="list-unstyled components">
                            {networks.map(network =>
                                <li key={network}><button type="button" className="btn btn-link" onClick={() => handleClick(network)}>{network}</button></li>)}
                        </ul>
                    </div>
                </div>{/* Side bar*/}
                <div className="col" id="main" style={{paddingTop: 90}}>

                    {networks.map((network, index) =>
                        <div className="network-element" key={network+index}>
                            <div className="row">
                                <div className="display-3 network-header text-left col-11" ref={networkRefs[network]}>{network}</div>
                                <button type="button" ref={expandRefs[network]} onClick={() => handleExpand(network)}
                                        className="mt-5 col-1 align-text-bottom text-black-50 btn btn-link">{networkExpandList[network][0] ? "Collapse" : "Expand"}</button>
                            </div>
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