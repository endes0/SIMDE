import * as React from 'react';

import { translate } from 'react-i18next';
import { t } from 'i18next';

export function TableComponent(props) {

    return(
        <div className="smd-table_component panel panel-default">
            <div className="panel-heading">{t(props.title)}</div>
            <div className="smd-table_component-body panel-body">
                <div className="smd-table">
                    <div className="smd-table-header">
                        <div className="smd-table_row">
                        {props.header &&
                            props.header.map((header, i) => (
                                <div className="smd-table_cell smd-table_cell--title"> 
                                        { t(header.translateKey) + header.extraValue } 
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="smd-table-body">
                        {props.data &&
                            props.data.map((row, i) => (
                                <div
                                    className="smd-table_row"
                                    key={`${props.title + i}`}
                                >
                                    <div className="smd-table_cell"> 
                                            { i } 
                                    </div>
                                    {row.map( (col) => (
                                        <div className="smd-table_cell"> 
                                            { col } 
                                        </div>
                                    ))}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableComponent;


/* 
                        <div className="smd-table-header_title id-colum">#</div>
                        <div className="smd-table-header_title">Entera0</div>
                        <div className="smd-table-header_title">Entera1</div>  */