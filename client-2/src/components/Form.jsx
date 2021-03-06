import React, { useState,useContext } from "react";
import Saly from "../assets/Saly1.png";
import PageHeader from "./PageHeader";
import { FcUpload } from "react-icons/fc";
import { FaTrash } from "react-icons/fa";
import { NFTContext } from "../context/NFTContext";
import Loader from "./Loader";
import Modal from "./Modal";
import { motion } from "framer-motion";

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
  const [imagePreview, setImagePreview] = useState("");
  const [value, setValue] = useState({
    power: "",
    stamina: "",
    cuteness: "",
    name: "",
    desc: "",

  });
  const [showModal,setShowModal]=useState(false)

  const ntx=useContext(NFTContext)

  const inputHandler = (e) => {
    setValue((p) => ({ ...p, [e.target.name]: e.target.value }));
    console.log(value);
  };
  const inputs = [
    {
      title: "Name",
      name: "name",
      placeHolder: "Enter the name of the nft",
      type: "text",
    },
    {
      title: "Description",
      name: "desc",
      placeHolder: "Give any description of your NFT",
      type: "text",
    },
    {
      title: "Cutness",
      name: "cuteness",
      placeHolder: "Enter Cuteness Value",
      type: "number",
    },
    {
      title: "Stamina",
      name: "stamina",
      placeHolder: "Enter Stamina Value",
      type: "number",
    },
    {
      title: "Power",
      name: "power",
      placeHolder: "Enter Power Value",
      type: "number",
    },
  ];

  const captureFile = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(e.target.files[0]);
    const src = URL.createObjectURL(e.target.files[0]);
    setImagePreview(src);
  };
  const deletePhoto = () => {
    setImage("");
    setImagePreview("");
  };
  let success=null
  const mint= async()=>{
    console.log(value)
    const data={
      name:value.name,
      desc:value.desc,
      cuteness:value.cuteness,
      power:value.power,
      stamina:value.stamina,
      image:image
    }
   await ntx.mintNFT(data)
   if(!ntx.success || ntx.success){
     setShowModal(true)
   }
  }
  return (
    <>
    {!ntx.success && <Modal active={showModal} success={ntx.success} onClose={()=>setShowModal(false)}/>}
    {ntx.success && <Modal active={showModal} success={ntx.success} onClose={()=>setShowModal(false)}/>}
    <motion.div className="mt-10" initial={{x:50}} animate={{x:0}} exit={{x:50}}>
      <PageHeader title="Mint Your Crazy NFT" />
      <div className="w-full flex justify-center items-center md:flex-nowrap flex-wrap ">
        <div className="flex flex-col w-full justify-center items-center md:m-10 m-3 rounded-md p-4 bg-[rgba(94,90,90,0.35)]">
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
          <div className="flex flex-col">
            <div>
              {!imagePreview && (
                <label className="cursor-pointer m-2 bg-[black] p-2 rounded-lg text-white flex w-full">
                  <input
                    type="file"
                    onChange={captureFile}
                    className="hidden"
                  />
                  <FcUpload size={25} className="mr-3" />
                  Upload Your NFT Content
                </label>
              )}
            </div>
            {imagePreview && (
              <div
                className="bg-[#d11a2a] cursor-pointer my-2 p-2 text-white rounded-md flex w-full cursor-pointer"
                onClick={deletePhoto}
              >
                <FaTrash size={25} className="mr-3 text-white" />
                Delete Photo
              </div>
            )}

            <img src={imagePreview} className="w-[300px]" alt="" srcset="" />
          </div>
          <button className="bg-[#24a0ed] py-3 md:w-[80%] w-full rounded-md text-white font-semibold" onClick={mint}>
            {!ntx.isLoading && <p>Mint</p>}
            {ntx.isLoading && <Loader/>}
          </button>
        </div>
        <div className="w-full flex justify-center items-center">
          <img src={Saly} alt="Logo" className="w-[600px] animate-bounce" />
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Form;
