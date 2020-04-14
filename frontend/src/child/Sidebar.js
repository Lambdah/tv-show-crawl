import React from 'react';
import styled from "styled-components";

const Vertical = styled.div`

    padding-top: 100px;
    
    .position-fixed{
        border-left: 1px solid rgba(0,0,0,0.1);
    }
`;



export default class Sidebar extends React.Component{
    render(){
        const uniqueTitle = this.props.subscription.reduce((acc, cV) => [...new Set([...acc, cV.title])], []);
        return(
          <div className="col-1 order-2 pl-5 ml-5 py-5 d-flex bd-sidebar" id="sticky-sidebar">
              <Vertical>
              <div className="position-fixed text-left px-4">

                  <div className="sidebar-header">
                      <h4>Subscriptions</h4>
                  </div>
                  <ul className="list-unstyled components">
                      {uniqueTitle.map((tv, index) =>
                          <li key={tv + index + new Date().getTime()}>
                              <a href={`/show/${tv}`}>{tv}</a>
                          </li>
                      )}

                  </ul>
              </div>
              </Vertical>
          </div>

        );
    }


}