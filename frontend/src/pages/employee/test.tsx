import React, { useEffect, useState } from 'react'
import employee from '@/pages/api/employee'

export default function testt() {
    const [hEmployee,setEmployee] = useState<any[]>([])
    useEffect(() => {
        employee.getEmployee().then(
            data => {
                setEmployee(data)
            }
        )
    })
  return (
    <div>
      <h2>List Employee</h2>
      <table>
        <thead>
            <tr>
                <th>Employee ID</th>
                <th>National ID</th>
                <th>FullName</th>
                <th>BirthDate</th>
                <th>HireDate</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {
                Employee && Employee.map(item => {
                    return (
                        <>
                        <tr>
                            <th>{item.empEntityId}</th>
                            <td>{item.empNationalId}</td>
                            <td>{item.empEntity.userFirstName}</td>
                            <td>{item.empBirthDate}</td>
                            <td>{item.empHireDate}</td>
                            <td>{item.employeeClientContracts.eccoStatus}</td>
                        </tr>
                        </>
                    )
                })
            }
        </tbody>
      </table>
    </div>
  )
}