'use client'
import { ComponentProps, useState, useEffect, useRef } from "react";
import axios from "axios";

const baseAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
interface iShopInfo {
  shopname?: string,
  callnum1?: string,
  callnum2?: string,
  callnum3?: string,
  address1?: string,
  address2?: string,
  category?: string,
}

const AddShop = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preShopInfo, setPreShopInfo] = useState<iShopInfo|null>(null);
  let shopInfo = {};

  /*
  useEffect(()=>{
    if(file){
      console.log(filename)
      console.log(file.size)
    }
  },[file])
  **/

  useEffect(()=>{
    console.log(preShopInfo)
  },[preShopInfo])

  const handleAddFile : ComponentProps<'input'>['onChange'] = (e) => {
    if(e.target.files){
      setFile(e.target.files[0])
      setFilename(e.target.files[0].name)
    }
  }
  const handleLinkFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  const handleValueChange : ComponentProps<'input'>['onChange'] = (e) => {
    setPreShopInfo({...preShopInfo, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(preShopInfo){
      shopInfo = {
        name: preShopInfo.shopname,
        callNumber: `${preShopInfo.callnum1}${preShopInfo.callnum2}${preShopInfo.callnum3}`,
        address: `${preShopInfo.address1}${preShopInfo.address2}`,
        latitude: 10,
        longitude: 10,
        categories: ['치킨'],
      }
    }
    console.log(shopInfo);

    if(file){
      const addShopFormData = new FormData();
      addShopFormData.append('icon', file, filename)
      addShopFormData.append('banner', file, filename)
      //addShopFormData.append('shopData', JSON.stringify(shopInfo))
      const jsonBlob = new Blob([JSON.stringify(shopInfo)], { type: 'application/json' });
      addShopFormData.append('shopData', jsonBlob, 'jsonData');

      try {
        const res = await baseAxiosInstance.post('/owner/shop/register', addShopFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return(
    <div className="w-100%">
      <p className="p-4 font-semibold">가게정보</p>
      <form onSubmit={handleSubmit} className="py-4 text-sm leading-8">
        <div className="flex border-t border-slate-300">
          <div className="p-4 w-[25%] text-center bg-slate-200">가게 이름</div>
          <div className="p-4 flex-1 bg-white">
            <input type="text" id="shopname" onChange={handleValueChange} className="px-2 border border-slate-400 w-[12rem]"/>
          </div>
        </div>
        <div className="flex border-t border-slate-300">
          <div className="p-4 w-[25%] text-center bg-slate-200">가게 전화번호</div>
          <div className="p-4 flex-1 bg-white">
            <input type="text" id="callnum1" onChange={handleValueChange} className="px-2 border border-slate-400 w-[4rem]"/>
            <span> - </span>
            <input type="text" id="callnum2" onChange={handleValueChange} className="px-2 border border-slate-400 w-[4rem]"/>
            <span> - </span>
            <input type="text" id="callnum3" onChange={handleValueChange} className="px-2 border border-slate-400 w-[4rem]"/>
          </div>
        </div>
        <div className="flex border-t border-slate-300">
          <div className="p-4 w-[25%] text-center bg-slate-200">가게 주소</div>
          <div className="p-4 flex-1 bg-white">
            <div className="flex pb-2">
              <input type="text" id="address1" onChange={handleValueChange} className="px-2 border border-slate-400 w-[23rem]"/>
              <div className="pr-2 pl-2 ml-2 border border-slate-400">주소 검색</div>
            </div>
            <input type="text" id="address2" onChange={handleValueChange} className="px-2 border border-slate-400 w-[23rem]"/>
          </div>
        </div>
        <div className="flex border-t border-slate-300">
          <div className="p-4 w-[25%] text-center bg-slate-200">업종 카테고리</div>
          <div className="p-4 flex-1 bg-white">
            <input type="text" id="category" onChange={handleValueChange} className="px-2 border border-slate-400 w-[8rem]"/>
          </div>
        </div>
        <div className="flex border-t border-slate-300">
          <div className="p-4 w-[25%] text-center bg-slate-200">전단지 등록</div>
          <div className="flex p-4 flex-1 bg-white">
            <input type="file" ref={fileInputRef} onChange={handleAddFile} className="hidden px-2"/>
            <input type="text" value={filename} className="px-2 border border-slate-400 w-[17rem]" readOnly/>
            <div className="pr-2 pl-2 ml-2 border border-slate-400" onClick={handleLinkFileInput}>파일찾기</div>
          </div>
        </div>
        <div className="flex pt-8 border-t border-slate-300">
          <div className="flex-1"></div>
          <button type="submit" className="px-8 py-4 bg-pink-500 text-white font-bold">입점 신청 완료</button>
          <div className="flex-1"></div>
        </div>
      </form>
    </div>
  )
}

export default AddShop;