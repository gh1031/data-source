import React, { ChangeEvent, FormEvent, useState } from 'react';
import './index.scss';


function Organization() {
  const [form, setForm] = useState({
    companyName: '',
    departmentName: '',
    departmentNo: 1,
  })

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(state => ({ ...state, [name]: value }));
  }


  function handleSubmit(e: FormEvent<HTMLFormElement>) {

  }

  return (
    <div className="page-center">
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="companyName">
            <span>公司名称：</span>
            <input
              type="text"
              name="companyName"
              id="companyName"
              value={form.companyName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-item">
          <label htmlFor="departmentName">
            <span>部门名称：</span>
            <input
              type="text"
              name="departmentName"
              id="departmentName"
              value={form.departmentName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-item">
          <label htmlFor="departmentNo">
            <span>部门编号：</span>
            <select
              name="departmentNo"
              id="departmentNo"
              value={form.departmentNo}
              onChange={handleChange}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </label>
        </div>
      </form>
    </div>
  )
}

export default Organization;
