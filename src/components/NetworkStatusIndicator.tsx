import React from "react";
import {Detector} from "react-detect-offline";


const CheckConnection = props =>
    {
        return(
            <Detector
                render={({ online }) => (
                    <div>
                        {online ? (
                            <div className="online">You are online</div>
                        ) : (
                            <div className="offline">You are offline</div>
                        )}
                    </div>
                )}
            />
        );
    }

export default CheckConnection;