import React, {useState} from 'react';

const Table = () => {
    const tableInitialData = [
          {
            "id": "electronics",
            "label": "Electronics",
            "value": 1400, //this value needs to be calculated from the children values (800+700)
            "children": [
              {
                "id": "phones",
                "label": "Phones",
                "value": 800,
              },
              {
                "id": "laptops",
                "label": "Laptops",
                "value": 700,
              }
            ]
          },
          {
            "id": "furniture",
            "label": "Furniture",
            "value": 1000, //this need to be calculated from the children values (300+700)
            "children": [
              {
                "id": "tables",
                "label": "Tables",
                "value": 300
              },
              {
                "id": "chairs",
                "label": "Chairs",
                "value": 700
              }
            ]
          }
        ]

        const [tableData, setTableData] = useState(tableInitialData);

        // Updating Value by Percentage function
        const updatePercentage = (id, data)=> {
          const updateTableData = (items) => {
            items.map((item)=> {
              if(item.id === id) {
                return {
                  ... item,
                  varaiance : data?.inputValue > 0 ? (Math.ceil((Number(data?.inputValue * data?.value) / 100))) : data.value,
                  value: data?.value + (Math.ceil((Number(data?.inputValue * data?.value) / 100)))
                }
              }
  
              if(item.children) {
                return {
                  ...item,
                  children: updateTableData(item.children)
                }
              }
            })
            return items;
          }
          setTableData(updateTableData(data))
        }

        // Updating Direct Value function
        const updateDirectValue = (id, data)=> {
          const updateTableData = (items) => {
            items.map((item)=> {
              if(item.id === id) {
                return {
                  ...item,
                  iputValue: data?.value + Number(data?.inputValue)
                }
              }
  
              if(item.children) {
                return {
                  ...item,
                  children: updateTableData(item.children)
                }
              }
            })
            return items;
          }
          setTableData(updateTableData(data))
        }

        // Value & Input Value handle change function
        const handleChange = (e, id, data, name) => {
          const value = e.target.value;
          // updateParentOnly
          const updateParentOnly = data.map((parentData)=> {
            if(parentData?.id === id) {
              return {
                ...parentData,
                name: value
              }
            } else {
              return parentData
            }
          })

          // Update Parent & Child
          const updateTableData = (items) => {
            items.forEach((item)=> {
              if(item.id === id) {
                return {
                  ...item,
                  name: value
                }
              }
  
              if(item.children) {
                return {
                  ...item,
                  children: updateTableData(item.children)
                }
              }
            })
            return items;
          }
          const newData = updateTableData(data)
          setTableData(newData)
        }

        const Nodes = ({data}) => {
            return (
                <>
                  <tr key={data?.id}>
                        <td>{data?.label}</td>
                        <td>
                            <input value={data?.value} name="value" onChange={(e)=> handleChange(e, data?.id, tableData, "value")}/>
                        </td>
                        <td>
                            <input type='number' value={data?.inputValue} name="inputValue" onChange={(e)=> handleChange(e, data?.id, tableData, "inputValue")}/>
                        </td>
                        <td>
                            <button className="btn" onClick={ () => 
                              updatePercentage(data?.id, tableData)
                            }>Percentage</button>
                        </td>

                        <td>
                            <button className='btn' onClick={() => 
                              updateDirectValue(data?.id, tableData)
                            } >Update Value</button>
                        </td>                       
                        <td>{`${data?.varaiance ? data?.varaiance : 0}%`}</td>
                        <td></td>
                  </tr>
                  {
                    data?.children && (
                      data?.children.map((child) => (
                        <Nodes data = {child}/>
                      ))
                    )
                  }
                </>
            )
        }


    return (
        <div className='table-style'>
        {
            tableData?.length > 0 ? 
            (<>
            <table border={1} cellSpacing={0} cellPadding={3}>
                <thead>
                    <th>Lable</th>
                    <th>Value</th>
                    <th>Input</th>
                    <th>Allocation %</th>
                    <th>Allocation Val</th>
                    <th>Variance %</th>
                </thead>
                <tbody>
                    {
                      tableData?.map((tableNode) => (
                          <>
                            <Nodes data = {tableNode}/>
                          </>
                      ))
                    }
                </tbody>
            </table>
            </>) : 
            (<>
            <p>No Data found</p>
            </>)
        }
        </div>
    )
}

export default Table