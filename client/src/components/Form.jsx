import React, { useState } from "react";
import Saly from "../assets/Saly1.png";

export const Input = ({ name, type, value, placeHolder, handleChange }) => {
  return (
    <input
      placeholder={placeHolder}
      name={name}
      type={type}
      value={value}
      onChange={handleChange}
      className="md:w-[80%] w-full rounded-md p-2 m-2 outline-none bg-[#F7F8FA] text-sm"
    />
  );
};

const Form = () => {
  const [image, setImage] = useState("");
  const [value, setValue] = useState({
    symbol: "",
    name: "",
    desc: "",
  });

  const inputHandler = (e) => {
    setValue((p) => ({ ...p, [e.target.name]: e.target.value }));
    console.log(value)
  };
  const inputs = [
    {
      title: "Name",
      name: "name",
      placeHolder: "Enter the name of the nft",
      type: "text",
    },
    {
      title: "Symbol",
      name: "symbol",
      placeHolder: "Enter symbol like BTC, ETH etc",
      type: "text",
    },
    {
      title: "Description",
      name: "desc",
      placeHolder: "Give any description of your NFT",
      type: "text",
    },
  ];

  const captureFile= async (e)=>{
    e.preventDefault()
    const file = e.target.files[0]
    console.log(file)
    const reader = new FileReader()

    reader.readAsArrayBuffer(file)
    console.log(reader)
    reader.onloadend = () => {
      setImage({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      })

    }
    console.log(image)
  }

  return (
    <div className="w-full flex justify-center items-center mt-[5rem] md:flex-nowrap flex-wrap">
      <div className="flex flex-col w-full justify-center items-center m-10 rounded-md p-4">
        {" "}
        {inputs.map((item, i) => (
          <Input
            key={`${item.name}-${i}`}
            name={item.name}
            placeHolder={item.placeHolder}
            handleChange={inputHandler}
            type={item.type}
            // value={`${value}.${item.name}`}
          />
        ))}
        <input type="file" onChange={captureFile}></input>
        <img src={image?.buffer} alt="" srcset="" />
      </div>
      <div className="w-full flex justify-center items-center">
        <img src={Saly} alt="Logo" className="w-[600px]" />
      </div>
    </div>
  );
};

export default Form;
