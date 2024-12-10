"use client";
import React, { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import axios from 'axios';

const Register = ({
  handleHiddenRegister,
}: {
  handleHiddenRegister: () => void;
}) => {
  const [formData, setFormData] = useState({
    rentalArea: "",
    ownerName: "",
    phoneNumber: "",
    rentalCar: "",
    drivingLicenses: [], // Mảng chứa thông tin bằng lái xe (tên loại và ảnh)
  });

  const districts = [
    "Hải Châu",
    "Thanh Khê",
    "Sơn Trà",
    "Ngũ Hành Sơn",
    "Liên Chiểu",
    "Cẩm Lệ",
    "Hòa Vang",
    "Hoàng Sa",
  ];

  const licenseTypes = ["A1", "A2", "B1", "B2", "C", "D", "E", "F"];

  const handleRemoveSignIn = () => {
    handleHiddenRegister();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLicenseFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files) {
      setFormData((prev) => {
        const updatedLicenses = [...prev.drivingLicenses];
        updatedLicenses[index] = {
          ...updatedLicenses[index],
          files: Array.from(e.target.files), // Lưu nhiều ảnh cho mỗi bằng lái
        };
        return { ...prev, drivingLicenses: updatedLicenses };
      });
    }
  };

  const handleLicenseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedLicenses = [...prev.drivingLicenses];
      updatedLicenses[index] = { ...updatedLicenses[index], type: value };
      return { ...prev, drivingLicenses: updatedLicenses };
    });
  };

  const addLicenseField = () => {
    setFormData((prev) => ({
      ...prev,
      drivingLicenses: [...prev.drivingLicenses, { type: "", files: [] }],
    }));
  };

  const removeLicenseField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      drivingLicenses: prev.drivingLicenses.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("rentalArea", formData.rentalArea);
    formDataToSend.append("ownerName", formData.ownerName);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("rentalCar", formData.rentalCar);
  
   
    axios.post('http://localhost:8080/api/carOwnerRequest/submit', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log("Success:", response.data);
    })
    .catch(error => {
      console.log("Error:", error);
    });
    
  };

  return (
    <div className="opacity-95 fixed top-0 left-0 w-full h-full z-[1000] bg-black/50">
      <div className="w-[95%] mt-3 mx-auto lg:mt-10 lg:w-[555px] lg:mx-auto bg-white rounded-xl pt-[16px] px-[24px] pb-[32px] motion-preset-pop motion-duration-700">
        <CiCircleRemove
          onClick={handleRemoveSignIn}
          className="ml-auto font-bold text-[1.25rem] cursor-pointer"
        />
        <div className="header-title flex flex-col gap-3">
          <h5 className="text-center text-blue-500 font-bold text-[1.2rem]">
            Đăng ký xe cho thuê
          </h5>
          <span className="text-[0.8rem] text-slate-400 text-center">
            Bạn vui lòng điền đầy đủ thông tin, MIOTO sẽ liên hệ với bạn trong
            vòng một ngày làm việc.
          </span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-2">
            <label
              className="text-[#767676] font-semibold"
              htmlFor="rentalArea"
            >
              Khu vực cho thuê ở Đà Nẵng
            </label>
            <select
              className="px-2 text-slate-600 py-[10px] outline-none cursor-pointer border border-slate-300 rounded-xl"
              name="rentalArea"
              id="rentalArea"
              value={formData.rentalArea}
              onChange={handleChange}
            >
              <option value="">Chọn khu vực</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <label className="text-[#767676] font-semibold" htmlFor="ownerName">
                Tên chủ xe*
              </label>
              <input
                type="text"
                className="px-2 text-slate-600 py-[10px] outline-none cursor-pointer border border-slate-300 rounded-xl"
                name="ownerName"
                id="ownerName"
                placeholder="Tên của bạn"
                value={formData.ownerName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#767676] font-semibold" htmlFor="phoneNumber">
                Số di động*
              </label>
              <input
                type="text"
                className="px-2 text-slate-600 py-[10px] outline-none cursor-pointer border border-slate-300 rounded-xl"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Số của bạn"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#767676] font-semibold" htmlFor="rentalCar">
              Xe cho thuê
            </label>
            <input
              type="text"
              className="px-2 text-slate-600 py-[10px] outline-none cursor-pointer border border-slate-300 rounded-xl"
              name="rentalCar"
              id="rentalCar"
              placeholder="Loại xe của bạn"
              value={formData.rentalCar}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#767676] font-semibold">
              Bằng lái xe
            </label>
            {formData.drivingLicenses.map((license, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-2 items-center">
                <select
                  className="px-2 py-[10px] border border-slate-300 rounded-xl flex-1"
                  value={license.type}
                  onChange={(e) => handleLicenseTypeChange(e, index)}
                >
                  <option value="">Chọn loại bằng</option>
                  {licenseTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <input
                  type="file"
                  multiple
                  className="flex-1"
                  onChange={(e) => handleLicenseFileChange(e, index)}
                />
                <button
                  type="button"
                  onClick={() => removeLicenseField(index)}
                  className="text-red-500 font-bold"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLicenseField}
              className="bg-green-300 hover:bg-green-500 text-white font-bold rounded-xl py-2 px-4 mt-2"
            >
              Thêm bằng lái
            </button>
          </div>
          <div className="submit-rental mt-3">
            <button
              type="submit"
              className="bg-blue-300 w-full hover:bg-blue-500/80 hover:text-white transition-all text-blue-600 font-bold rounded-xl p-[12px] cursor-pointer"
            >
              Gửi đến chúng tôi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
