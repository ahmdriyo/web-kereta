"use client";
import React, { useState } from "react";
import admin from "../asset/admin.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore, auth } from "../../firebaseConfig"; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [namaPenumpang, setNamaPenumpang] = useState('');
  const [noTempatDuduk, setNoTempatDuduk] = useState('');
  const [kelas, setKelas] = useState('');
  const [berangkat, setBerangkat] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (email.trim() === "" || password.trim() === "" || namaPenumpang.trim() === "" || noTempatDuduk.trim() === "" || kelas.trim() === "" || berangkat.trim() === "") {
        alert("Silakan lengkapi semua data.");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, "pengguna", userCredential.user.uid), {
        email,
        namaPenumpang,
        noTempatDuduk,
        kelas,
        berangkat,
        id_penumpang: userCredential.user.uid,
      });
      alert("Pendaftaran Berhasil, Silakan Login");
      router.push("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Pendaftaran Gagal, Silakan Coba Lagi");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="h-[90.5vh] w-screen-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${admin.src})` }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="w-[430px] h-[630px] bg-[#000000] text-white m-2 bg-opacity-30 backdrop-filter backdrop-blur-sm p-6 rounded-2xl shadow-md">
          <div className="flex items-center justify-center">
            <h3 className="text-2xl font-bold mb-4">Register Penumpang</h3>
          </div>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Masukkan email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="relative">
                <input
                  className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="namaPenumpang" className="block text-sm font-medium text-white">
                Nama Penumpang
              </label>
              <input
                id="namaPenumpang"
                name="namaPenumpang"
                type="text"
                onChange={(e) => setNamaPenumpang(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Masukkan nama penumpang"
              />
            </div>
            <div>
              <label htmlFor="noTempatDuduk" className="block text-sm font-medium text-white">
                Nomer Tempat Duduk
              </label>
              <input
                id="noTempatDuduk"
                name="noTempatDuduk"
                type="text"
                onChange={(e) => setNoTempatDuduk(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Masukkan nomor tempat duduk"
              />
            </div>
            <div>
              <label htmlFor="kelas" className="block text-sm font-medium text-white">
                Kelas
              </label>
              <input
                id="kelas"
                name="kelas"
                type="text"
                onChange={(e) => setKelas(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Masukkan kelas"
              />
            </div>
            <div>
              <label htmlFor="berangkat" className="block text-sm font-medium text-white">
                Berangkat
              </label>
              <input
                id="berangkat"
                name="berangkat"
                type="text"
                onChange={(e) => setBerangkat(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Masukkan waktu berangkat"
              />
            </div>
            <button
              type="submit"
              className="bg-[#5f4545] text-white px-4 py-2 rounded-md hover:bg-[#332525] focus:outline-none focus:bg-[#382828] w-full"
            >
              Daftar
            </button>
            <div className="flex items-center justify-center mt-4">
              <Link href="/loginPenumpang" className="text-sm text-white hover:underline cursor-pointer">
                Sudah punya akun? Login di sini
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
