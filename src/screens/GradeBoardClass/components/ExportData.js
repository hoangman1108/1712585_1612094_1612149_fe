import React from 'react';
import ReactExport from 'react-export-excel';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { BsFileEarmarkText } from "react-icons/bs";

export default function ExportData({
  rows,
  lstKeysRemove = [],
  fileName = `list_transactions_${moment().format('DDMMYYYYHHmmss')}`
}) {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const { t: translate } = useTranslation();
  const camelCase = str => {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  };

  const filterColumns = data => {
    if (data.length === 0) {
      return data;
    }
    const columns = Object.keys(data[0]);
    const filterColsByKey = columns.filter(c => !lstKeysRemove.includes(c));
    return filterColsByKey;
  };

  return (
    <Button variant="outline-secondary">
      <ExcelFile
        filename={fileName}
        element={
            <div className='d-flex align-items-center'>
                <BsFileEarmarkText style={{ marginRight: '10px', fontSize: '20px' }} />
                <span>{translate('Export')}</span> 
            </div>
        }
      >
        <ExcelSheet data={rows} name="Sheet 1">
          {filterColumns(rows).map((col, index) => {
            return <ExcelColumn label={camelCase(col)} value={col} key={index} />;
          })}
        </ExcelSheet>
      </ExcelFile>
    </Button>
  );
}