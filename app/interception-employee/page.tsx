"use client";

export interface Employee {
    id: number,
    name: string,
    role: string,
    avatar: ImageData
}

import React, { Suspense, use, useState } from 'react';

export default function EmployeeList() {
    const emps = use(fetch("https://api.escuelajs.co/api/v1/users").then(res=> res.json()));
    
  return (
    <>
    <table className=" container mx-auto mt-10 divide-y divide-gray-500 shadow-lg shadow-gray-500 rounded-lg overflow-hidden">
    <thead className="bg-gray-50">
        <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
            </th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
            {emps.map((e: Employee) => {
            return (
                <tr  key={e.id} className="hover:bg-gray-50 transition-colors duration-200 pointer">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {e.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <img 
                            className='w-12 h-12 rounded-full object-cover border-2 border-gray-100' 
                            src={e.avatar} 
                            alt={e.name}
                        />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {e.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {e.role}
                        </span>
                    </td>
                </tr>
            )
        })}
    </tbody>
</table>
    </>
  )
}