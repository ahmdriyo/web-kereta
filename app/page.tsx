'use client'
import React from "react";
import keretahome from "./asset/kereta-home.jpg";
import { signOut, useSession } from "next-auth/react";

export default function Home(){  
  const { data: session, status } = useSession({
    required: false,
  });
  const user = session?.user as {
    nama?: string;
    email?: string;
    alamat?: string;
    noTelpon?: string;
    peran?: string;
  };
  console.log(session)
  return (
    <div
      className="h-[90.5vh] w-screen-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${keretahome.src})` }}
    >
      <div className="flex items-center justify-center h-full xl:w-[65%] p-10">
        <div className="text-start text-white">
        {/* <div className='text-white'>{user?.nama }</div>
        <div className='text-white'>{user?.email }</div>
        <div className='text-white'>{user?.alamat }</div>
        <div className='text-white'>{user?.noTelpon }</div>
        <button className='text-white' onClick={() => signOut()}>Logout</button> */}
          <p className="xl:text-[30px] font-bold xl:mb-[30px] mb-2 text-[20px]">
            Selamat datang di platform kami yang menyediakan informasi lengkap
            mengenai rute perjalanan, stasiun, dan kereta api cepat.
          </p>
          <p className="xl:text-xl font-bold xl:w-[80%] text-white text-sm pb-2 border-b-4">
            Temukan dengan mudah dan cepat destinasi favorit Anda, serta nikmati
            pengalaman perjalanan yang efisien dan terhubung di seluruh negeri.
          </p>
          <p className="xl:text-lg text:sm text-white">
            Temukan Rute Terbaik, Nikmati Perjalanan Tanpa Batas!
          </p>
          <p>NOTE*</p>
          <p className="text-sm font-light text-[#ffffff]">
            Silahkan login sebagai Penumpang atau admin terlebih dahulu untuk akses web secara penuh!
          </p>
        </div>
      </div>
    </div>
  );
};
Home.requireAuth = true
