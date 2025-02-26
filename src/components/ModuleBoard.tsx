// import React from "react";
import Switch from "./Switch";

const ModuleBoard = () => {
    return (
        <div id={"module-board-container"}>
            <div id={"module-board"}>
                <div className={"module-line"}>
                    <div className={"checkbox-container"}>
                        <Switch />
                    </div>
                    <div className={"module-container"}>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"module-space"}></div>
                    </div>
                </div>
                <div className={"separator"}></div>
                <div className={"module-line"}>
                    <div className={"checkbox-container"}>
                        <Switch />
                    </div>
                    <div className={"module-container"}>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"module-space"}></div>
                    </div>
                </div>
                <div className={"separator"}></div>
                <div className={"module-line"}>
                    <div className={"checkbox-container"}>
                        <Switch />
                    </div>
                    <div className={"module-container"}>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"module-space"}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleBoard;